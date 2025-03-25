import { beatsnoop } from "@/assets";
import Loader from "@/components/Loader";
import { useSignupMutation } from "@/store/auth/authApi";
import { SignupFormValues } from "@/types";
import { SignUpSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthWithGoogle from "@/components/AuthWithGoogle";

const Signup = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const [signupHandler, { isLoading }] = useSignupMutation();

  const submitForm = async (values: SignupFormValues) => {
    try {
      await signupHandler(values).unwrap();
      toast.success("Thanks for create account, please Login to your Account.");
      navigate("/signin");
    } catch (error: unknown) {
      const err = error as { data: { message: string } };
      toast.error(err.data.message);
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
    validationSchema: SignUpSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="md:my-16 my-8 pb-20">
      <div className="md:flex-row flex flex-col items-center gap-10">
        <div className="lg:order-1 order-2">
          <img src={beatsnoop} alt="Beatsnoop-Logo" />
        </div>

        <div className="lg:order-2 md:mb-0 order-1 px-8 mb-10 mx-auto w-full md:w-[88%] lg:w-[60%] xl:w-[35%]">
          <div className="mb-6">
            <h1 className="mb-4 lg:text-4xl text-3xl font-medium">
              Create an account
            </h1>
            <p className="mt-0 mb-2 text-[18px]">Enter your details below </p>
          </div>

          <form className="select-none" onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-between mt-4">
                {errors.name && touched.name && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.name || touched.name}
                  </p>
                )}
              </div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-[45px] w-full border-b border-b-gray-400 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            <div className="mb-6">
              <div className="mt-4">
                {errors.email && touched.email && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.email || touched.email}
                  </p>
                )}
              </div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-[45px] w-full border-b border-b-gray-400 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            <div className="mb-6">
              <div className="mt-4">
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.password || touched.password}
                  </p>
                )}
              </div>
              <div className="flex">
                <input
                  type={type}
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] w-full border-b border-b-gray-400 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-400 placeholder:font-normal"
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
              <div className="mb-3">
                {errors.rePassword && touched.rePassword && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.rePassword || touched.rePassword}
                  </p>
                )}
              </div>

              <input
                type="password"
                id="rePassword"
                placeholder="Confirm Password"
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-[45px] w-full border-b border-b-gray-400 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            <button
              type="submit"
              disabled={!(dirty && isValid) || isLoading}
              className="hover:bg-red-700 transition-all duration-300 cursor-pointer mt-10 mx-auto block bg-[#DB4444] text-[18px] font-medium text-white py-4 rounded-md w-full disabled:opacity-65 disabled:cursor-not-allowed"
            >
              Create Account
            </button>

            <AuthWithGoogle />

            <div className="flex items-center gap-4 mt-8">
              <p className="text-xl">Already have account? </p>
              <Link
                to="/signin"
                className="text-xl font-medium border-b w-fit border-b-gray-400 hover:-translate-y-1 duration-300 transition-all"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
