export interface User {
  userName: string;
  role: string;
  preferredApplication: string;
}

export interface UserDatabase {
  [key: string]: User;
}
