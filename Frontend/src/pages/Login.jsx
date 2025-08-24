import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import FormFieldError from "../components/FormFieldError";
import { useUser } from "../context/userContext";
import Alert from "../components/Alert";

function Login() {
  const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required").min(5, "Password must be at least 5 characters long")
  });

	const { setUser } = useUser();
	const navigate = useNavigate();

	const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const inputFieldClass = "appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5";

	const onLogin = async (data) => {

		try { 
			const response = await api.post("/api/token/", data);

      // If the response is successful, store the tokens
			if (response.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, response.data.access);
				localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

				// fetch user data
				const res = await api.get("/api/user/");
				const newUser = res.data;
				setUser(newUser);

				navigate("/");
			}
		} catch (error) {
      if (error.code && error.code === "ERR_NETWORK") {
        setError("root.server", { message: "Network error, please try again later." });
      }

      // Handle error from api
      if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.detail) {
          setError("root", { message: data.detail });
        }

        Object.entries(data).forEach(([field, messages]) => {
          if (field === "email") {
            setError("email", { message: messages[0] });
          } else if (field === "password") {
            setError("password", { message: messages[0] });
          }
        });
      }
		}
	};

	return (
		<div className="relative min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      {/* Alert Message when there's an error */}
	  {errors.root?.server?.message && (
		  <Alert msg={errors.root.server.message} handleClose={() => {clearErrors("root.server")}} />
	  )}

			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					Welcome back!
				</h2>
				<p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
					<Link
						to="/register"
						className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
					>
						create a new account
					</Link>
				</p>
			</div>

			<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form onSubmit={handleSubmit(onLogin)}>
						<div>
							<label
								htmlFor="email-field"
								className="block text-sm font-medium leading-5  text-gray-700"
							>
								Email
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="email-field"
									name="email"
									placeholder="email"
									type="email"
                  {...register("email")}
									className={`${inputFieldClass} ${errors.email ? 'border-red-500 pr-10' : ''}`}
								/>
                {errors.email && <FormFieldError msg={errors.email.message} />}
							</div>
						</div>

						<div className="mt-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-5 text-gray-700"
							>
								Password
							</label>
							<div className="mt-1 rounded-md shadow-sm">
								<input
									id="password"
									name="password"
									type="password"
                  placeholder="Enter your password"
                  {...register("password")}
									className={`${inputFieldClass} ${errors.password ? 'border-red-500 pr-10' : ''}`}
								/>
                {errors.password && <FormFieldError msg={errors.password.message} />}
							</div>
						</div>

            {errors.root && errors.root.message && (
              <div className="mt-2">
                <FormFieldError msg={errors.root.message} />
              </div>
            )}

						<div className="mt-6 flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember_me"
									name="remember"
									type="checkbox"
									value="1"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<label
									htmlFor="remember_me"
									className="ml-2 block text-sm leading-5 text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm leading-5">
								<Link
									to="#"
									className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
								>
									Forgot your password?
								</Link>
							</div>
						</div>

						<div className="mt-6">
							<span className="block w-full rounded-md shadow-sm">
								<button
									type="submit"
                  disabled={isSubmitting}
									className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
								>
									{isSubmitting ? 'Signing in...' : 'Sign in'}
								</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
