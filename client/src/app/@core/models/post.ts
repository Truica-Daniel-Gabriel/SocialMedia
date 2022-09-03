export interface CreatePostRequest {
  imageUrl: string | ArrayBuffer | null;
  location: string | null;
  description: string | null;
}

export interface Post {
  imageUrl: string;
  location: string;
  description: string;
  _id: string;
  userId: string;
  likes: string[];
}

export interface PostResponse {
  message: string;
  post: Post;
}

export interface PostsResponse {
  message: string;
  posts: Post[];
}

export interface SetLikeResponse {
  like:boolean,
  userId:string,
  message:string
}
