import { useSigninMutation, useSignupMutation } from "@/store/auth/authApi";
import { setCredentials, setToken } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/redux-hooks";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { googleIcon } from "@/assets";

const AuthWithGoogle = () => {
  const [signupHandler] = useSignupMutation();
  const [signinHandler] = useSigninMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google
        const googleRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const userEmail = googleRes.data.email;
        const userName = googleRes.data.name;

        // Check for existing password or generate new one
        let userPassword = localStorage.getItem("googleDummyPassword");

        if (!userPassword) {
          userPassword = uuidv4();
          localStorage.setItem("googleDummyPassword", userPassword);
          // Sign up with new password
          try {
            await signupHandler({
              name: userName,
              email: userEmail,
              password: userPassword,
              rePassword: userPassword,
            }).unwrap();
          } catch (signupError: unknown) {
            const err = signupError as { data: { message: string } };
            toast.error(err.data.message);
          }
        }

        // Sign in with stored password
        try {
          const res = await signinHandler({
            email: userEmail,
            password: userPassword,
          }).unwrap();

          dispatch(
            setCredentials({ email: res.user.email, name: res.user.name })
          );

          dispatch(setToken(res.token));

          toast.success(`welcome to Exclusive Cart`);
          navigate("/");
        } catch (error: unknown) {
          const err = error as { data: { message: string } };
          toast.error(err.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <>
      <button
        onClick={() => googleLogin()}
        className="flex transition-all duration-300 cursor-pointer mt-6 border border-gray-400 hover:text-[#DB4444] text-[18px] font-medium py-4 rounded-md w-full justify-center items-center gap-4"
      >
        <img src={googleIcon} alt="Google-Icon" />
        Sign Up with Google
      </button>
    </>
  );
};

export default AuthWithGoogle;
