import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const userInfo = {
      name: data.name,
      image: imageFile,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    console.log(userInfo);
  };
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Sign Up</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-[#495057]">
              Welcome to CampHealth Portal
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-DarkGray  text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  {...register("image", { required: true })}
                  accept="image/*"
                  className="w-full border rounded-md border-DarkGray text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-DarkGray  text-gray-900"
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
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  autoComplete="new-password"
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-DarkGray  text-gray-900"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                </div>
                <select
                  defaultValue="default"
                  {...register("role", { required: true })}
                  className="w-full px-3 py-2 border rounded-md border-DarkGray  text-gray-900"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="organizer">Organizer</option>
                  <option value="professional">Healthcare Professional</option>
                  <option value="participant"> Participant</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-gradient-to-r from-Green to-LightGreen w-full rounded-md py-3 hover:text-white hover:bg-gradient-to-l `from-LightGreen` `to-Green` transition-all"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div className="flex justify-center items-center">
            <button className="flex justify-center items-center space-x-2 border rounded-md m-3 p-2 border-white bg-gradient-to-r from-Green to-LightGreen hover:text-white hover:bg-gradient-to-l `from-LightGreen` `to-Green` transition-all border-rounded">
              <FcGoogle size={32} />
              <p>Continue with Google</p>
            </button>
          </div>
          <p className="px-6 text-sm text-center">
            Already have an account?{" "}
            <Link to="/signin" className="hover:underline hover:text-Blue">
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
