export interface IPost {
  title: string;
  content: string;
  author: string;
  tags: string[];
  _id: string;
  publishedDate: string;
  __v: number;
}

export type ICreatePost = Pick<IPost, "title" | "content" | "author" | "tags">;
