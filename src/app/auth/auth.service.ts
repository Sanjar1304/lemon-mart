import { Injectable } from '@angular/core'

import { Role } from './auth.enum'
import { IAuthStatus } from './interfaces/IAuthStatus'

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

@Injectable()
export class AuthService {
  constructor() {}
}
