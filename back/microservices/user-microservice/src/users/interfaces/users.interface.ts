export interface IUser {
  _id?:string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timezone: string;
  avatar: string;
  avatarId: string;
  registerOk?:string;
}
