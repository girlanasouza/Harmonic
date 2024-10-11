export type User = {
  id: string;
  name: string;
  email: string;
  birth: Date;
  url_img_profile: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Login = {
  email: string;
  password: string;
};

export type Signup = {
  name: string;
  email: string;
  birth: Date;
  url_img_profile: string;
  password: string;
};
