export interface Message {
  _id:string;
  message: string;
  providerId:string;
  replays: ReplayResponse[];
}

export interface MessageResponse{
  postComment:Message[]
}

export interface ReplayMessage {
  _id:string;
  message: string;
  providerId:string;
  commentReplay:string;
}

export interface ReplayResponse {
  message:string;
  providerId:string;
  _id:string;
  commentReplay:{
    tag:string;
    commentId:string;
  }
}

export interface createCommentResponse{
  message:string,
  comments:Message[];
}
