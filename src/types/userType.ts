export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  likedMoviesIds: string[];
};

export type RegisterUserType = {
  username: string;
  password: string;
  name: string;
};
