import { IAttachementResult } from './attachement-result.interface';

export interface IPost {
  title: string;
  body: string;
  attachements: IAttachementResult[];
  templateId: string;
}
