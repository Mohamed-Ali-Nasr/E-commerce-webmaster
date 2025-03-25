export interface ILogin {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export interface IUpdateUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUpdatePassword {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface IProduct {
  id: string;
  category: { name: string };
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  description: string;
  priceAfterDiscount: number;
  images: string[];
  isNew?: boolean;
}

export interface IProductApi {
  data: IProduct[];
}

export interface IProductDetailsApi {
  data: IProduct;
}

export interface IUserCart {
  numOfCartItems: number;
  data: {
    _id: string;
    totalCartPrice: number;
    products: {
      _id: string;
      count: number;
      price: number;
      product: IProduct;
    }[];
  };
}

export interface IUserCartApi {
  data: IUserCart;
}

export interface IUserWishlist {
  count: number;
  data: IProduct[];
}

export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};

export type SigninFormValues = {
  email: string;
  password: string;
};

export type UpdateUserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPassword: string;
  password: string;
  rePassword: string;
};

export type ForgetPassFormValues = {
  email: string;
};

export type VerifyCodeFormValues = {
  resetCode: string;
};

export type ResetPassFormValues = {
  email: string;
  newPassword: string;
};
