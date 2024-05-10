export interface Post {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Date;
}

export type GeneratePost = Pick<Post, 'title' | 'content'> & { image: string };
export type CreatePostDto = Pick<Post, 'title' | 'content'>;
