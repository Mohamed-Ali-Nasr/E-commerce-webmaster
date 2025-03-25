import Loader from "@/components/Loader";
import { useVerifyCodeMutation } from "@/store/auth/authApi";
import { VerifyCodeFormValues } from "@/types";
import { verifyCodeSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyCode = () => {
  const navigate = useNavigate();

  const initialValues: VerifyCodeFormValues = {
    resetCode: "",
  };

  const [verifyResetCode, { isLoading }] = useVerifyCodeMutation();

  const submitForm = async (values: VerifyCodeFormValues) => {
    try {
      await verifyResetCode(values).unwrap();
      toast.success("Your Code is Verified Successfully");
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Verify your code, please resend it again");
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
    validationSchema: verifyCodeSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <h2 className="mb-12 text-3xl font-medium text-gray-700">
        Enter Your Reset Code
      </h2>

      <form className="select-none" onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-2xl font-medium" htmlFor="resetCode">
              Reset Code
            </label>
            {errors.resetCode && touched.resetCode && (
              <p className="text-lg font-medium text-red-600">
                {errors.resetCode || touched.resetCode}
              </p>
            )}
          </div>
          <input
            type="text"
            id="resetCode"
            placeholder="your reset code..."
            value={values.resetCode}
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

export default VerifyCode;
