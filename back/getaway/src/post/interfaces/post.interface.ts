import { IAttachementResult } from 'src/files/interfaces/attachement-result.interface';

export interface IPost {
  _id?: string;
  title: string;
  body: string;
  attachements: IAttachementResult[];
  templateId: string;
}
