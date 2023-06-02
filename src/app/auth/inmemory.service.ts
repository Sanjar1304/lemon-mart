import { Injectable } from '@angular/core'
import { sign } from 'fake-jwt-sign'
import { Observable, of, throwError } from 'rxjs'

import { PhoneType } from '../user/user/EnumPhoneType'
import { User } from '../user/user/user'
import { Role } from './auth.enum'
import { AuthService } from './auth.service'
import { IAuthStatus } from './interfaces/IAuthStatus'
import { IServerAuthResponse } from './interfaces/IServerAuthResponse'

@Injectable()
export class InMemoryAuthService extends AuthService {
  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'sanjarsuyunov1304@gmail.com',
    name: { first: 'Sanjar', last: 'Suyunov' },
    picture:
      'https://media.licdn.com/dms/image/C5603AQFDBNkXAw-cgQ/profile-displayphoto-shrink_800_800/0/1632468017275?e=1691020800&v=beta&t=0atFdz2CRWOCoYE3E1Nzx8BdNQa6xLJCMIrj_fplabY',
    role: Role.Manager,
    dateOfBirth: new Date(1991, 13, 4),
    userStatus: true,
    address: {
      line1: 'Olmazor, TashGU-TashPI, 5/36',
      city: 'Tashkent',
      state: 'Olmazor district',
      zip: '100109',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '998977506980',
      },
    ],
  })

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

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token
  }

  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser)
  }
}
