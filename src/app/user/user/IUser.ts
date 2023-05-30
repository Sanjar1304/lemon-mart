import { Role } from 'src/app/auth/auth.enum'

import { IName } from './IName'
import { IPhone } from './IPhone'

export interface IUser {
  _id: string
  email: string
  name: IName
  readonly fullName?: string
  picture: string
  role: Role | string
  userStatus: boolean
  dateOfBirth: Date | null | string
  level: number
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
  }
  phones: IPhone[]
}
