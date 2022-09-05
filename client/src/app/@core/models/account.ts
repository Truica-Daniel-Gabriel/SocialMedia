export interface Account {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  city: string | null;
  profilePicture: string;
  followers: string[];
  follow_ups: string[];
  posts: string[];
  isAdmin: boolean;
}

export interface ResponseAccountLogin {
  message: string;
  account: Account;
  jwtToken: string;
}

export interface RequestAccountLogin {
  email: string;
  password: string;
}

export interface RequestAccountRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  city?: string;
}

export interface ResponseAccountRegister {
  message: string;
}

export interface ResponseAccountUpdate {
  message: string;
  account: Account;
}

export interface User {
  _id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
}
export interface ResponseGetUser {
  message: string;
  user: User;
}

export interface ResponseGetAllUsers {
  users: User[];
  message: string;
}

export interface ResponseGetOtherUser {
  user:Account;
  message:string;
}
