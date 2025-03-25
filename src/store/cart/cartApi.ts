import {
  IProductApi,
  IProductDetailsApi,
  IUserCart,
  IUserWishlist,
} from "@/types";
import { api } from "../api";
import {
  setCartId,
  setCountWishlist,
  setNumOfItems,
  setProductDetails,
  setProducts,
  setUserCart,
  setUserWishlist,
  setWishList,
} from "./cartSlice";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProductApi, void>({
      query: () => ({
        url: "api/v1/products",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: productsData } = data;
          dispatch(setProducts(productsData));
        } catch (err) {
          console.log(err);
          dispatch(setProducts([]));
        }
      },
    }),

    getProductDetails: builder.query<IProductDetailsApi, string>({
      query: (productId) => ({
        url: `api/v1/products/${productId}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: productData } = data;
          dispatch(setProductDetails(productData));
        } catch (err) {
          console.log(err);
          dispatch(setProductDetails(null));
        }
      },
    }),

    getUserCart: builder.query<IUserCart, void>({
      query: () => ({
        url: "api/v1/cart",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserCart(data));
          dispatch(setNumOfItems(data.numOfCartItems));
          dispatch(setCartId(data.data._id));
        } catch (err) {
          console.log(err);
          dispatch(setUserCart(null));
          dispatch(setNumOfItems(0));
          dispatch(setCartId(null));
        }
      },

      providesTags: ["Cart"],
    }),

    getUserWishlist: builder.query<IUserWishlist, void>({
      query: () => ({
        url: "api/v1/wishlist",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserWishlist(data));
          dispatch(setCountWishlist(data.count));
        } catch (err) {
          console.log(err);
          dispatch(setUserWishlist(null));
          dispatch(setCountWishlist(0));
        }
      },

      providesTags: ["Wishlist"],
    }),

    addToCart: builder.mutation<IUserCart, { productId: string }>({
      query: (body: { productId: string }) => ({
        url: "api/v1/cart",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<IUserCart, { productId: string }>({
      query: (body: { productId: string }) => ({
        url: `api/v1/cart/${body.productId}`,
        method: "DELETE",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    clearUserCart: builder.mutation<void, void>({
      query: () => ({
        url: "api/v1/cart",
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

    updateQuantity: builder.mutation<
      IUserCart,
      { productId: string; count: number }
    >({
      query: (body: { productId: string; count: number }) => ({
        url: `api/v1/cart/${body.productId}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    addToWishlist: builder.mutation<{ data: string[] }, { productId: string }>({
      query: (body: { productId: string }) => ({
        url: "api/v1/wishlist",
        method: "POST",
        body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: wishlistData } = data;
          dispatch(setWishList(wishlistData));
        } catch (err) {
          console.log(err);
          dispatch(setWishList([]));
        }
      },

      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<
      { data: string[] },
      { productId: string }
    >({
      query: (body: { productId: string }) => ({
        url: `api/v1/wishlist/${body.productId}`,
        method: "DELETE",
        body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: wishlistData } = data;
          dispatch(setWishList(wishlistData));
        } catch (err) {
          console.log(err);
          dispatch(setWishList([]));
        }
      },

      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetUserCartQuery,
  useGetUserWishlistQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearUserCartMutation,
  useUpdateQuantityMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = cartApi;
