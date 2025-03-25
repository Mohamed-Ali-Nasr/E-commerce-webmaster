import Loader from "@/components/Loader";
import { useResetPassMutation } from "@/store/auth/authApi";
import { ResetPassSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { ResetPassFormValues } from "@/types";

const ResetPassword = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const navigate = useNavigate();

  const initialValues: ResetPassFormValues = {
    email: "",
    newPassword: "",
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };

  const [resetPass, { isLoading }] = useResetPassMutation();

  const submitForm = async (values: ResetPassFormValues) => {
    try {
      await resetPass(values).unwrap();
      toast.success("Your Password is Reset Successfully, please signin again");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Reset Password");
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
    validationSchema: ResetPassSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <h2 className="mb-12 sm:text-3xl text-2xl font-medium text-gray-700">
        reset your account password
      </h2>

      <form className="select-none" onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-2xl font-medium" htmlFor="email">
                Email
              </label>
              {errors.email && touched.email && (
                <p className="text-sm text-red-600">
                  {errors.email || touched.email}
                </p>
              )}
            </div>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-2xlfont-medium" htmlFor="newPassword">
                new Password
              </label>
              {errors.newPassword && touched.newPassword && (
                <p className="text-sm text-red-600">
                  {errors.newPassword || touched.newPassword}
                </p>
              )}
            </div>
            <div className="flex">
              <input
                type={type}
                id="newPassword"
                placeholder="******"
                value={values.newPassword}
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

          <button
            disabled={!(dirty && isValid)}
            type="submit"
            className="hover:bg-red-700 transition-all duration-300 cursor-pointer block bg-[#DB4444] sm:text-lg font-medium text-white rounded-md tracking-wide mx-auto mt-12 w-full sm:w-xl h-14 disabled:opacity-65 disabled:cursor-not-allowed"
          >
            Verify
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
