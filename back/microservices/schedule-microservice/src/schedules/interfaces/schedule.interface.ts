export interface ISchedule {
  _id?:string;
  providerId: string;
  postId: string;
  userId: string;
  startsAt: string;
  notify: boolean;
  status: string;
}
