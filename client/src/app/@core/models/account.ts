export interface Account {
  id:string;
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

export interface RequestAccountLogin {
  email: string;
  password: string;
}

export interface ResponseAccountLogin {
  message: string;
  account: Account;
  jwtToken: string;
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
  message:string;
  account:Account;
}
