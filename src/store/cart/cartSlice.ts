import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProduct, IUserCart, IUserWishlist } from "@/types";

interface CartSlice {
  products: IProduct[];
  productDetails: IProduct | null;
  numOfItems: number;
  userCart: IUserCart | null;
  cartId: string | null;
  wishlist: string[];
  userWishlist: IUserWishlist | null;
  countWishlist: number;
}

const initialState: CartSlice = {
  products: [],
  productDetails: null,
  numOfItems: 0,
  userCart: null,
  cartId: null,
  wishlist: [],
  userWishlist: null,
  countWishlist: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },

    setProductDetails: (state, action: PayloadAction<IProduct | null>) => {
      state.productDetails = action.payload;
    },

    setNumOfItems: (state, action: PayloadAction<number>) => {
      state.numOfItems = action.payload;
    },

    setUserCart: (state, action: PayloadAction<IUserCart | null>) => {
      state.userCart = action.payload;
    },

    setCartId: (state, action: PayloadAction<string | null>) => {
      state.cartId = action.payload;
    },

    setWishList: (state, action: PayloadAction<string[]>) => {
      state.wishlist = action.payload;
    },

    setUserWishlist: (state, action: PayloadAction<IUserWishlist | null>) => {
      state.userWishlist = action.payload;
    },

    setCountWishlist: (state, action: PayloadAction<number>) => {
      state.countWishlist = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const {
  setProducts,
  setProductDetails,
  setNumOfItems,
  setUserCart,
  setCartId,
  setWishList,
  setUserWishlist,
  setCountWishlist,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
