import { IPostTemplate } from 'src/interfaces/post-template.interface';

export const postTemplates: IPostTemplate[] = [
  {
    providerId: 'facebook',
    title: true,
    attachements: {
      img: true,
      video: true,
    },
    body: {
      html: false,
      text: true,
    },
  },
  {
    providerId: 'medium',
    title: true,
    attachements: {
      img: true,
      video: false,
    },
    body: {
      html: true,
      text: false,
    },
  },
  {
    providerId: 'linkedin',
    title: true,
    attachements: {
      img: true,
      video: false,
    },
    body: {
      html: false,
      text: true,
    },
  },
];
