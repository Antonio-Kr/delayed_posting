import { Injectable } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostService {
  createPost(postContent: IPost) {
    return null;
  }
}
