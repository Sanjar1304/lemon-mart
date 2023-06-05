import { Injectable } from '@angular/core'
import * as jwt_decode from 'jwt-decode'
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  mergeMap,
  pipe,
  tap,
  throwError,
} from 'rxjs'

import { transformError } from '../common/common'
import { IUser } from '../user/user/IUser'
import { User } from '../user/user/user'
import { Role } from './auth.enum'
import { CacheService } from './cache.service'
import { IAuthService } from './interfaces/IAuthService'
import { IAuthStatus } from './interfaces/IAuthStatus'
import { IServerAuthResponse } from './interfaces/IServerAuthResponse'

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') ?? defaultAuthStatus
  )
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  private getAndUpdateUserIfAuthenticate = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    //@ts-ignore
    filter(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  )

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>
  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()
    if (jwt) {
      // @ts-ignore
      const payload = jwt_decode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }
    return true
  }
  protected getAuthStatusFromToken(): IAuthStatus {
    // @ts-ignore
    return this.transformJwtToken(jwt_decode(this.getToken()))
  }
  protected abstract transformJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
    }
    this.authStatus$.pipe(tap((authStatus) => this.setItem('authStatus', authStatus)))
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)
        // @ts-ignore
        const token = jwt_decode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap((status) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticate
    )

    loginResponse$.subscribe({
      error: (err) => {
        this.logout()
        return throwError(() => new Error(err))
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  protected clearToken() {
    this.removeItem('jwt')
  }
}
