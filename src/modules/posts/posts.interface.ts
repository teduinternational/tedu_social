export interface IPost {
  _id: string;
  user: string;
  text: string;
  name: string;
  avatar: string;
  likes: ILike[];
  comments: IComment[];
  date: Date;
}

export interface ILike {
  user: string;
}

export interface IComment {
  _id: string;
  user: string;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}
