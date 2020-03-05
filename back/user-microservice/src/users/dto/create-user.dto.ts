export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly timezone: string;
  readonly avatar: string;
  readonly avatarId: number;
}
