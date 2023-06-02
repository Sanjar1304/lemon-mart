import { Injectable } from '@angular/core'
import { sign } from 'fake-jwt-sign'
import { Observable, of, throwError } from 'rxjs'

import { User } from '../user/user/user'
import { Role } from './auth.enum'
import { AuthService } from './auth.service'
import { IAuthStatus } from './interfaces/IAuthStatus'
import { IServerAuthResponse } from './interfaces/IServerAuthResponse'

@Injectable()
export class InMemoryAuthService extends AuthService {
  defaultUser: any
  protected override transformJwtToken(token: unknown): IAuthStatus {
    throw new Error('Method not implemented.')
  }
  protected override getCurrentUser(): Observable<User> {
    throw new Error('Method not implemented.')
  }

  constructor() {
    super()
    console.warn(
      'You are using InMemoryAuthService. Do not use this service in production'
    )
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase()

    if (!email.endsWith('@test.com')) {
      return throwError(
        () => new Error('Failed to login. Email needs to end with @test.com.')
      )
    }

    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
        ? Role.Clerk
        : email.includes('manager')
        ? Role.Manager
        : Role.None,
    } as IAuthStatus

    this.defaultUser.role = authStatus.userRole

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse
    return of(authResponse)
  }
}
