import { beatsnoop } from "@/assets";
import Loader from "@/components/Loader";
import { useSigninMutation } from "@/store/auth/authApi";
import { setCredentials, setToken } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/redux-hooks";
import { SigninFormValues } from "@/types";
import { SignInSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const dispatch = useAppDispatch();

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

  const initialValues: SigninFormValues = {
    email: "",
    password: "",
  };

  const [signinHandler, { isLoading }] = useSigninMutation();

  const submitForm = async (values: SigninFormValues) => {
    try {
      const res = await signinHandler(values).unwrap();

      dispatch(setCredentials({ email: res.user.email, name: res.user.name }));
      dispatch(setToken(res.token));

      toast.success(`welcome to Exclusive Cart`);
      navigate("/");
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
    validationSchema: SignInSchema,
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
              Log in to Exclusive
            </h1>
            <p className="mt-0 mb-2 text-[18px]">Enter your details below </p>
          </div>

          <form className="select-none" onSubmit={handleSubmit}>
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

            <div className="flex justify-between items-center mt-12 gap-4 lg:gap-8">
              <button
                type="submit"
                disabled={!(dirty && isValid) || isLoading}
                className="hover:bg-red-700 transition-all duration-300 cursor-pointer block bg-[#DB4444] text-[18px] font-medium text-white py-3 px-8 lg:px-16 rounded-md disabled:opacity-65 disabled:cursor-not-allowed"
              >
                Log In{" "}
              </button>

              <Link
                to="/forget-password"
                className="text-[#DB4444] text-[18px] font-medium hover:text-red-700 transition-all duration-300"
              >
                Forget Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
