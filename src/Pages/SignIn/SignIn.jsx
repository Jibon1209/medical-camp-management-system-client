import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn, googleSignIn } = UseAuth();
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = async (data) => {
    signIn(data.email, data.password)
      .then(() => {
        axiosPublic.put(`/users/${data.email}`).then((res) => {
          console.log(res.data.role);
          switch (res.data.role) {
            case "organizer":
              toast.success("Sign In successfully");
              navigate("/dashboard/organizer-profile", {
                state: { from: location },
              });
              break;
            case "professional":
              toast.success("Sign In successfully");
              navigate("/dashboard/professional-profile", {
                state: { from: location },
              });
              break;
            case "participant":
              toast.success("Sign In successfully");
              navigate("/dashboard/participant-profile", {
                state: { from: location },
              });
              break;
          }
        });
      })
      .catch((error) => {
        if (error.code !== "auth/invalid-login-credential") {
          toast.error("The password or email you entered does not match.");
        } else {
          toast.error(`Something went wrong with ${error.message}`);
        }
      });
  };
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          image: result.user?.photoURL,
          email: result.user.email,
        };
        axiosPublic.put(`/users/${result.user.email}`, userInfo).then((res) => {
          if (res.data) {
            toast.success("Sign In successfully");
          }
          navigate("/", { state: { from: location } });
        });
      })
      .catch((error) => {
        toast.error(`Something went wrong with ${error.message}`);
      });
  };
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Sign In</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-secondary shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign In</h1>
            <p className="text-sm TextColor">Sign in to access your account</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-Primary text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-Primary text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                </div>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="type the captcha above"
                  className="w-full px-3 py-2 border rounded-md border-Primary text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                disabled={disabled}
                type="submit"
                className={` border-white bg-Primary text-white ${
                  disabled ? "" : "hover:scale-110 transition-all"
                }  w-full rounded-md py-3`}
              >
                Continue
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center space-x-2 border rounded-md m-3 p-2 border-white bg-Primary text-white hover:scale-110 transition-all border-rounded"
            >
              <FcGoogle size={32} />
              <p>Continue with Google</p>
            </button>
          </div>
          <p className="px-6 text-sm text-center">
            Don&apos;t have an account yet?{" "}
            <Link to="/signup" className="hover:underline hover:text-Primary ">
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
