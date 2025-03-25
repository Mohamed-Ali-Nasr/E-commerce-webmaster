import Loader from "@/components/Loader";
import {
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "@/store/auth/authApi";
import { logout, selectAuth } from "@/store/auth/authSlice";
import {
  setCountWishlist,
  setNumOfItems,
  setWishList,
} from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { UpdateUserFormValues } from "@/types";
import { UpdateUserSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface ApiError {
  data: {
    errors: {
      msg: string;
    };
  };
}

const Account = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const { name, email } = useAppSelector(selectAuth);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };

  const initialValues: UpdateUserFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    password: "",
    rePassword: "",
  };

  const [updateUserHandler, { isLoading: isLoadingUser }] =
    useUpdateUserMutation();
  const [updatePasswordHandler, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation();

  const dispatch = useAppDispatch();

  const handleUpdateUser = () => {
    dispatch(logout());
    dispatch(setNumOfItems(0));
    dispatch(setCountWishlist(0));
    dispatch(setWishList([]));
  };

  const submitForm = async ({
    firstName,
    lastName,
    email,
    phone,
    currentPassword,
    password,
    rePassword,
  }: UpdateUserFormValues) => {
    try {
      const userUpdatePromise =
        firstName || lastName || email || phone
          ? updateUserHandler({
              name: `${firstName} ${lastName}`.trim(),
              email,
              phone,
            }).unwrap()
          : Promise.resolve();

      const passwordUpdatePromise =
        currentPassword || password || rePassword
          ? updatePasswordHandler({
              currentPassword,
              password,
              rePassword,
            }).unwrap()
          : Promise.resolve();

      await Promise.all([userUpdatePromise, passwordUpdatePromise]);
      toast.success("Your profile has been updated successfully.");
      handleUpdateUser();
    } catch (error: unknown) {
      if ((error as ApiError).data?.errors?.msg !== undefined) {
        toast.error((error as ApiError).data.errors.msg);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: UpdateUserSchema,
    onSubmit: submitForm,
  });

  if (isLoadingUser || isLoadingPassword) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <div className="flex gap-8 sm:justify-between flex-col sm:flex-row sm:items-center mb-10 pb-10 pt-4">
        <div className="flex items-center gap-2.5">
          <p className="text-gray-500">Home</p>
          <span className="text-gray-500">/</span>
          <h4 className="font-medium">My Account</h4>
        </div>
        <div>
          Welcome!{" "}
          <span className="font-medium text-[#DB4444]">
            {name?.toLocaleUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex lg:gap-20 justify-between flex-col md:flex-row">
        <div>
          <div className="mb-8">
            <h4 className="font-medium mb-4">Manage My Account</h4>
            <ul className="ml-8 text-gray-400">
              <li className="hover:text-[#DB4444] transition-all duration-300 cursor-pointer mb-2">
                My Profile
              </li>
              <li className="hover:text-[#DB4444] transition-all duration-300 cursor-pointer mb-2">
                Address Book
              </li>
              <li className="hover:text-[#DB4444] transition-all duration-300 cursor-pointer mb-2">
                My Payment Options
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="font-medium mb-4">My Orders</h4>
            <ul className="ml-8 text-gray-400">
              <li className="hover:text-[#DB4444] transition-all duration-300 cursor-pointer mb-2">
                My Returns
              </li>
              <li className="hover:text-[#DB4444] transition-all duration-300 cursor-pointer mb-2">
                My Cancellations
              </li>
            </ul>
          </div>

          <div className="">
            <h4 className="font-medium mb-4">My Wishlist</h4>
          </div>
        </div>

        <div className="shadow-[0_1px_13px_rgba(0,0,0,0.05)] sm:px-12 px-6 py-8">
          <h3 className="text-2xl font-medium text-[#DB4444] mb-6">
            Edit Your Profile
          </h3>
          <form className="select-none" onSubmit={handleSubmit}>
            <div className="flex lg:gap-12 flex-col lg:flex-row">
              <div className="mb-6">
                <div className="flex justify-between mt-4 items-center mb-2">
                  <label htmlFor="first-name">First Name</label>
                  {errors.firstName && touched.firstName && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.firstName || touched.firstName}
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  placeholder={name?.split(" ")[0] || "First Name"}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] xl:w-sm w-full lg:w-xs rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mt-4 items-center mb-2">
                  <label htmlFor="last-name">Last Name</label>
                  {errors.lastName && touched.lastName && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.lastName || touched.lastName}
                    </p>
                  )}
                </div>

                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  placeholder={
                    name?.split(" ").slice(1).join(" ") || "Last Name"
                  }
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] xl:w-sm w-full lg:w-xs rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="flex lg:gap-12 mb-4 flex-col lg:flex-row">
              <div className="mb-6">
                <div className="flex justify-between mt-4 items-center mb-2">
                  <label htmlFor="email">Email</label>
                  {errors.email && touched.email && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.email || touched.email}
                    </p>
                  )}
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder={email || "Email"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] xl:w-sm w-full lg:w-xs rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mt-4 items-center mb-2">
                  <label htmlFor="phone">Phone</label>
                  {errors.phone && touched.phone && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.phone || touched.phone}
                    </p>
                  )}
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] xl:w-sm w-full lg:w-xs rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex sm:justify-between mb-2 gap-2 sm:items-center flex-col sm:flex-row">
                <label htmlFor="current-password">Password Changes</label>
                {errors.currentPassword && touched.currentPassword && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.currentPassword || touched.currentPassword}
                  </p>
                )}
              </div>

              <input
                type="password"
                id="current-password"
                name="currentPassword"
                placeholder="Current Password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
              />
            </div>

            <div className="mb-6">
              <div className="mb-2">
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.password || touched.password}
                  </p>
                )}
              </div>

              <div className="flex">
                <input
                  type={type}
                  name="password"
                  placeholder="New Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />

                <span
                  className="flex items-center justify-around cursor-pointer"
                  onClick={handleToggle}
                >
                  {icon ? (
                    <HiOutlineEye className="absolute mr-12" size={25} />
                  ) : (
                    <HiOutlineEyeOff className="absolute mr-12" size={25} />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2">
                {errors.rePassword && touched.rePassword && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.rePassword || touched.rePassword}
                  </p>
                )}
              </div>

              <input
                type="password"
                name="rePassword"
                placeholder="Confirm New Password"
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
              />
            </div>

            <div className="flex justify-end items-center sm:gap-10 gap-4">
              <Link
                to="/"
                className="hover:bg-[#DB4444] transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium hover:text-white sm:px-12 px-6 py-3 rounded-sm border border-gray-400 hover:border-[#DB4444] text-sm"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={!(dirty && isValid)}
                className="hover:bg-red-700 transition-all duration-300 cursor-pointer block bg-[#DB4444] sm:text-[18px] font-medium text-white lg:px-12 sm:px-8 px-4 py-3 rounded-md disabled:opacity-65 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Account;
