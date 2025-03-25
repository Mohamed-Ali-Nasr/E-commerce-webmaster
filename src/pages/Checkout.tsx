import Loader from "@/components/Loader";
import { useGetUserCartQuery } from "@/store/cart/cartApi";
import { payments } from "@/assets";
import { useState } from "react";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const { isLoading: getCartLoading, data } = useGetUserCartQuery();

  if (getCartLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <div className="flex items-center gap-2.5 mb-10 pb-10 pt-4 flex-wrap">
        <p className="text-gray-500">Account</p>
        <span className="text-gray-500">/</span>
        <p className="text-gray-500">My Account</p>
        <span className="text-gray-500">/</span>
        <p className="text-gray-500">Product</p>
        <span className="text-gray-500">/</span>
        <p className="text-gray-500">View Cart</p>
        <span className="text-gray-500">/</span>
        <h4 className="font-medium">CheckOut</h4>
      </div>

      <div className="mb-20">
        <h2 className="text-4xl font-medium mb-10">Billing Details</h2>

        <div className="flex justify-between flex-col lg:flex-row gap-20 lg:gap-0">
          <div className="text-gray-400">
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="first-name">
                  First Name<span className="text-red-300">*</span>
                </label>
              </div>
              <input
                type="text"
                id="first-name"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="company-name">
                  Company Name
                </label>
              </div>
              <input
                type="text"
                id="company-name"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="street-address">
                  Street Address<span className="text-red-300">*</span>
                </label>
              </div>
              <input
                type="text"
                id="street-address"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="detail-address">
                  Apartment, floor, etc. (optional)
                </label>
              </div>
              <input
                type="text"
                id="detail-address"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="area">
                  Town/City<span className="text-red-300">*</span>
                </label>
              </div>
              <input
                type="text"
                id="area"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="phone-number">
                  Phone Number<span className="text-red-300">*</span>
                </label>
              </div>
              <input
                type="text"
                id="phone-number"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="font-medium" htmlFor="email-address">
                  Email Address<span className="text-red-300">*</span>
                </label>
              </div>
              <input
                type="text"
                id="email-address"
                className="h-[45px] sm:w-md w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              />
            </div>

            <div className="flex items-center sm:space-x-4 space-x-2">
              <input
                type="checkbox"
                id="check-box"
                className="sm:h-5 sm:w-5 h-4 w-4 cursor-pointer checked:accent-[#DB4444] checked:border-[#DB4444] focus:outline-none focus:ring-0 transition-all duration-200"
              />
              <label
                htmlFor="check-box"
                className="text-black text-sm sm:text-base"
              >
                Save this information for faster check-out next time
              </label>
            </div>
          </div>

          <div className="lg:w-[40%]">
            {(data?.data.products?.length ?? 0) > 0 && (
              <div className="mb-10 xl:mr-20">
                {data?.data.products.map(({ _id, product, price, count }) => (
                  <div
                    key={_id}
                    className="flex items-center justify-between mb-8"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-15 h-15 object-cover"
                      />
                      <p className="text-sm">
                        {product.title.split(" ").slice(0, 4).join(" ")}
                      </p>
                    </div>

                    <div className="font-medium">${price * count}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-10 xl:mr-20">
              <div className="flex justify-between mt-4 border-b-2 border-b-gray-400">
                <h5 className="pb-2.5">Subtotal:</h5>
                <p className="pb-2.5 font-medium">
                  $ {data?.data.totalCartPrice}
                </p>
              </div>
              <div className="flex justify-between mt-4 border-b-2 border-b-gray-400">
                <h5 className="pb-2.5">Shipping:</h5>
                <p className="pb-2.5 font-medium">Free</p>
              </div>
              <div className="flex justify-between my-4">
                <h5 className="pb-2.5">Total:</h5>
                <p className="pb-2.5 font-medium">
                  $ {data?.data.totalCartPrice}
                </p>
              </div>
            </div>

            <div className="flex justify-between xl:mr-20">
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center">
                  <input
                    id="bank"
                    type="radio"
                    onChange={() => {
                      setSelectedPayment("bank");
                    }}
                    checked={selectedPayment === "bank"}
                    className="h-5 w-5 checked:accent-black"
                  />
                  <label htmlFor="bank" className="ms-2 sm:text-lg font-medium">
                    Bank
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cash"
                    type="radio"
                    onChange={() => {
                      setSelectedPayment("cash");
                    }}
                    checked={selectedPayment === "cash"}
                    className="h-5 w-5 checked:accent-black"
                  />
                  <label htmlFor="cash" className="ms-2 sm:text-lg font-medium">
                    Cash on delivery
                  </label>
                </div>
              </div>
              <div>
                <img src={payments} alt="payments" />
              </div>
            </div>

            <div className="mb-10">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="xl:py-3 py-2 border-2 border-gray-800 2xl:px-12 xl:px-10 px-4 focus:shadow-input-focus focus:outline-none font-medium placeholder:text-gray-400 placeholder:font-normal rounded-sm xl:text-base text-[13px]"
                />
                <button className="hover:bg-red-700 transition-all duration-300 cursor-pointer block 2xl:text-xl font-medium bg-[#DB4444] text-white 2xl:px-16 xl:px-10 sm:px-6 px-4 xl:py-3.5 py-2 rounded-sm focus:outline-none sm:text-base text-[15px]">
                  Apply Coupon
                </button>
              </div>
            </div>

            <button className="hover:bg-red-700 transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium bg-[#DB4444] text-white sm:px-12 px-4 sm:py-3 py-2 rounded-sm text-[15px] focus:outline-none">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
