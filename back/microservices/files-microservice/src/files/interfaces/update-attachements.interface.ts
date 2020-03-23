import { IAttachementResult } from 'src/files/interfaces/attachement-result.interface';

export interface IUpdateAttachements {
  attachements: IAttachementResult[];
  postId: string;
}
