import { IAttachementResult } from 'src/files/interfaces/attachement-result.interface';

export interface IPost {
  title: string;
  body: string;
  attachements: IAttachementResult[];
  templateId: string;
}
