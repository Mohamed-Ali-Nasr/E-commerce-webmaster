import Loader from "@/components/Loader";
import { useForgetPassMutation } from "@/store/auth/authApi";
import { ForgetPassFormValues } from "@/types";
import { forgetPassSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ApiError {
  data: {
    message: string;
  };
}

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues: ForgetPassFormValues = {
    email: "",
  };

  const [ForgetPass, { isLoading }] = useForgetPassMutation();

  const submitForm = async (values: ForgetPassFormValues) => {
    try {
      await ForgetPass(values).unwrap();
      toast.success("Reset code was sent to your email Successfully");
      navigate("/verify-code");
    } catch (error: unknown) {
      if ((error as ApiError).data?.message !== undefined) {
        toast.error((error as ApiError).data.message);
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
    validationSchema: forgetPassSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <h2 className="mb-12 text-3xl font-medium text-gray-700">
        please enter your Email
      </h2>

      <form className="select-none" onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-2xl font-medium" htmlFor="email">
              Email
            </label>
            {errors.email && touched.email && (
              <p className="text-lg font-medium text-red-600">
                {errors.email || touched.email}
              </p>
            )}
          </div>
          <input
            type="email"
            id="email"
            placeholder="your Email..."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
          />

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

export default ForgetPassword;
