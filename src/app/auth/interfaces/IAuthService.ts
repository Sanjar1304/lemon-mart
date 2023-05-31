import { BehaviorSubject, Observable } from 'rxjs'
import { IUser } from 'src/app/user/user/IUser'

import { IAuthStatus } from './IAuthStatus'

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}
