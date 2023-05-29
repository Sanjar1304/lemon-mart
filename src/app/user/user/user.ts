import { Role } from 'src/app/auth/auth.enum'

import { IName } from './IName'
import { IPhone } from './IPhone'
import { IUser } from './IUser'

export class User implements IUser {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id = '',
    public email = '',
    public name = { first: '', middle: '', last: '' } as IName,
    public picture = '',
    public role = Role.None,
    public dateOfBirth: Date | null = null,
    public userStatus = false,
    public level = 0,
    public address = {
      line1: '',
      city: '',
      state: '',
      zip: '',
    },
    public phones: IPhone[] = []
  ) {}

  static Build(user: IUser) {
    if (!user) {
      return new User()
    }

    if (typeof user.dateOfBirth === 'string') {
      user.dateOfBirth = new Date(user.dateOfBirth)
    }

    return new User(
      user._id,
      user.email,
      user.name,
      user.picture,
      user.role as Role,
      user.dateOfBirth,
      user.userStatus,
      user.level,
      user.address,
      user.phones
    )
  }
}
