export interface User {
  id: number;
  username: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}

export interface CreateUser {
  username: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}
