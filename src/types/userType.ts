export type UserType = {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type RegisterUserType = {
  username: string;
  password: string;
};
