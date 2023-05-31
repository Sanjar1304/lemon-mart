import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { IUser } from '../user/user/IUser'
import { User } from '../user/user/user'
import { Role } from './auth.enum'
import { IAuthService } from './interfaces/IAuthService'
import { IAuthStatus } from './interfaces/IAuthStatus'

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

@Injectable()
export abstract class AuthService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  constructor() {}

  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented')
  }

  logout(clearToken?: boolean | undefined): void {}

  getToken(): string {
    throw new Error('Method not implemented')
  }
}
