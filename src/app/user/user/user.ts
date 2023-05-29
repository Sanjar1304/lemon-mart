import { Role } from 'src/app/auth/auth.enum'

export interface IUser {
  _id: string
  email: string
  name: IName
  picture: string
  role: Role | string
  userStatus: boolean
  dateOfBirth: Date | null | string
  level: number
  address: {
    line1: string
    line2: string
    city: string
    state: string
    zip: string
  }
  phones: IPhone[]
}

export interface IName {
  first: string
  middle?: string
  last: string
}

export enum PhoneType {
  None = 'none',
  Mobile = 'mobile',
  Home = 'home',
  Work = 'work',
}

export interface IPhone {
  type: PhoneType
  digits: string
  id: number
}
