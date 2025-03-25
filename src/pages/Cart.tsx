import Loader from "@/components/Loader";
import {
  useClearUserCartMutation,
  useGetUserCartQuery,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems, setUserCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { useMediaQuery } from "@/utils";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { userCart } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [updateQuantity] = useUpdateQuantityMutation();

  const updateQuantityHandler = async ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }) => {
    try {
      const data = await updateQuantity({
        productId,
        count,
      }).unwrap();

      dispatch(setUserCart(data));
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to updated Product");
    }
  };

  const [removeFromCart] = useRemoveFromCartMutation();

  const removeFromCartHandler = async (productId: string) => {
    try {
      const data = await removeFromCart({ productId }).unwrap();
      dispatch(setUserCart(data));
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is removed successfully from your Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove Product from your Cart");
    }
  };

  const [clearUserCart, { isLoading: clearLoading }] =
    useClearUserCartMutation();

  const clearUserCartHandler = async () => {
    try {
      await clearUserCart();
      dispatch(setUserCart(null));
      dispatch(setNumOfItems(0));
      toast.success("Your Cart Is Cleared Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Clear your Cart");
    }
  };

  const { isError: getError, isLoading: getLoading } = useGetUserCartQuery();

  if (getLoading || clearLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <div className="flex items-center gap-2.5 mb-10 pb-10 pt-4">
        <p className="text-gray-500">Home</p>
        <span className="text-gray-500">/</span>
        <h4 className="font-medium">Cart</h4>
      </div>

      <div className="space-y-2">
        <div className="hidden sm:grid sm:place-content-between sm:grid-cols-4 sm:place-items-center sm:py-6 w-full font-semibold text-gray-700 shadow-[0_1px_13px_rgba(0,0,0,0.05)] rounded-md">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>

        {userCart?.numOfCartItems && userCart.numOfCartItems > 0 ? (
          <>
            {userCart?.data.products.map(({ _id, product, price, count }) => (
              <div
                key={_id}
                className="sm:grid sm:place-content-between sm:grid-cols-4 sm:place-items-center py-6 font-semibold text-gray-700 shadow-[0_1px_13px_rgba(0,0,0,0.05)] rounded-md px-4 sm:px-0"
              >
                {isMobile ? (
                  <div className="flex items-center justify-between w-full gap-4">
                    {/* Product */}
                    <div className="relative group flex items-center space-x-2">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-20 h-20 object-cover"
                      />

                      <button
                        onClick={() => {
                          removeFromCartHandler(product.id);
                        }}
                        className="text-white hover:bg-red-700 absolute -top-1.5 -left-1.5 group-hover:opacity-100 duration-300 transition-all opacity-0 cursor-pointer rounded-full bg-[#DB4444] px-[7px] text-sm text-center pb-0.5"
                      >
                        x
                      </button>
                      <Link
                        to={`/products/${product.id}`}
                        className="cursor-pointer"
                      >
                        <span className="text-sm sm:text-base">
                          {product.title.split(" ").slice(0, 4).join(" ")}
                        </span>
                      </Link>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      {/* Price */}
                      <div className="text-sm">${price}</div>
                      {/* Quantity */}
                      <div className="flex items-center justify-center border border-gray-400 rounded-lg gap-4 px-2 py-1">
                        <span className="text-sm">
                          {count < 10 ? `0${count}` : count}
                        </span>
                        <div>
                          <div
                            onClick={() => {
                              updateQuantityHandler({
                                productId: product.id,
                                count: count + 1,
                              });
                            }}
                            className="mb-1.5 cursor-pointer transition-all duration-300 hover:text-[#DB4444]"
                          >
                            <IoIosArrowUp size={14} />
                          </div>
                          <div
                            onClick={() => {
                              if (count <= 1) {
                                return;
                              } else {
                                updateQuantityHandler({
                                  productId: product.id,
                                  count: count - 1,
                                });
                              }
                            }}
                            className="mt-1.5 cursor-pointer transition-all duration-300 hover:text-[#DB4444]"
                          >
                            <IoIosArrowDown size={14} />
                          </div>
                        </div>
                      </div>
                      {/* Subtotal */}
                      <div className="text-sm">${price * count}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Product */}
                    <div className="relative group flex items-center space-x-4">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-14 h-14 object-cover"
                      />

                      <button
                        onClick={() => {
                          removeFromCartHandler(product.id);
                        }}
                        className="text-white hover:bg-red-700 absolute -top-1.5 -left-1.5 group-hover:opacity-100 duration-300 transition-all opacity-0 cursor-pointer rounded-full bg-[#DB4444] px-[7px] text-sm text-center pb-0.5"
                      >
                        x
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        className="cursor-pointer"
                      >
                        <span className="text-sm sm:text-base">
                          {product.title.split(" ").slice(0, 4).join(" ")}
                        </span>
                      </Link>
                    </div>
                    {/* Price */}
                    <div>${price}</div>
                    {/* Quantity */}
                    <div className="flex items-center justify-center border border-gray-400 rounded-lg gap-4 px-3 py-1">
                      <span>{count < 10 ? `0${count}` : count}</span>
                      <div>
                        <div
                          onClick={() => {
                            updateQuantityHandler({
                              productId: product.id,
                              count: count + 1,
                            });
                          }}
                          className="mb-1.5 cursor-pointer transition-all duration-300 hover:text-[#DB4444]"
                        >
                          <IoIosArrowUp size={15} />
                        </div>
                        <div
                          onClick={() => {
                            if (count <= 1) {
                              return;
                            } else {
                              updateQuantityHandler({
                                productId: product.id,
                                count: count - 1,
                              });
                            }
                          }}
                          className="mt-1.5 cursor-pointer transition-all duration-300 hover:text-[#DB4444]"
                        >
                          <IoIosArrowDown size={15} />
                        </div>
                      </div>
                    </div>
                    {/* Subtotal */}
                    <div>${price * count}</div>
                  </>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center mt-8 gap-4">
              <Link
                to="/products"
                className="hover:bg-[#DB4444] transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium hover:text-white sm:px-12 px-4 sm:py-4 py-2 rounded-sm border border-gray-400 hover:border-[#DB4444]"
              >
                Return To Shop
              </Link>
              <button
                className="hover:bg-[#DB4444] transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium hover:text-white sm:px-12 px-4 sm:py-4 py-2 rounded-sm border border-gray-400 hover:border-[#DB4444]"
                onClick={clearUserCartHandler}
              >
                Clear Cart
              </button>
            </div>

            <div className="mt-16 mb-12">
              <div className="flex gap-4 items-center justify-center lg:justify-start">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="sm:py-3 py-2 border-2 border-gray-800 sm:px-10 px-4 focus:shadow-input-focus focus:outline-none font-medium placeholder:text-gray-400 placeholder:font-normal sm:text-base text-[13px] rounded-sm"
                />
                <button className="hover:bg-red-700 transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium bg-[#DB4444] text-white sm:px-12 px-4 sm:py-3 py-2 rounded-sm text-[15px] focus:outline-none">
                  Apply Coupon
                </button>
              </div>
            </div>

            <div className="px-4 py-6 border-2 lg:ml-auto mx-auto lg:mx-0 max-w-[450px] rounded-sm mb-16">
              <h4 className="font-semibold text-[18px]">Cart Total</h4>
              <div className="flex justify-between mt-4 border-b-2 border-b-gray-400">
                <h5 className="pb-2.5">Subtotal:</h5>
                <p className="pb-2.5 font-medium">
                  $ {userCart?.data.totalCartPrice}
                </p>
              </div>
              <div className="flex justify-between mt-4 border-b-2 border-b-gray-400">
                <h5 className="pb-2.5">Shipping:</h5>
                <p className="pb-2.5 font-medium">Free</p>
              </div>
              <div className="flex justify-between my-4">
                <h5 className="pb-2.5">Total:</h5>
                <p className="pb-2.5 font-medium">
                  $ {userCart?.data.totalCartPrice}
                </p>
              </div>
              <Link
                to="/checkout"
                className="hover:bg-red-700 transition-all w-fit duration-300 cursor-pointer block sm:text-[18px] font-medium bg-[#DB4444] text-white sm:px-12 px-4 sm:py-3 py-2 rounded-sm text-[15px] mx-auto"
              >
                Procees to checkout
              </Link>
            </div>
          </>
        ) : userCart?.numOfCartItems === 0 || getError || !userCart ? (
          <div className="flex flex-col items-center justify-center gap-16 py-8 my-8">
            <p className="sm:text-5xl text-3xl font-medium">
              your Cart Is Empty
            </p>
            <Link
              to="/products"
              className="hover:bg-[#DB4444] transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium hover:text-white sm:px-12 px-4 sm:py-4 py-2 rounded-sm border border-gray-400 hover:border-[#DB4444]"
            >
              Go To Shopping
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Cart;
