export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly name?: string;
}

export class UpdateUserDto {
  readonly email?: string;
  readonly password?: string;
  readonly name?: string;
}

export class FilterUserDto {
  readonly _id?: string;
  readonly username?: string;
  readonly email?: string;
  readonly name?: string;
}

export class SortUserDto {}
