export interface IUserUpdate extends Document {
    token:string;
    email: string;
    firstName?: string;
    lastName?: string;
    timezone?: string;
    password?: string;
    newPassword?:string;
    avatar?: string;
    avatarId?: string;
}
  