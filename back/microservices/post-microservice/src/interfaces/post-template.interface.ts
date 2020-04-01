export interface IPostTemplate {
  providerId: string;
  attachements: {
    img: boolean;
    video: boolean;
  };
  title: boolean;
  body: {
    text: boolean;
    html: boolean;
  };
}
