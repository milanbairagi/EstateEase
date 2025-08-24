import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormFieldError from "../components/FormFieldError";
import api from "../api";
import Alert from "../components/Alert";

function Register() {

  const registerSchema = z.object({
    first_name: z.string().min(2, "First name is required").max(100, "First name must be at most 100 characters long"),
    last_name: z.string().min(2, "Last name is required").max(100, "Last name must be at most 100 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone_number: z.string().min(10, "Phone number must be at least 10 digits long").max(15, "Phone number must be at most 15 digits long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
  });

	const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
		resolver: zodResolver(registerSchema)
	});

	const navigate = useNavigate();

  const inputFieldClass = "appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5";

	const onRegister = async (data) => {
		try {
			await api.post("/api/register/", data);
			navigate("/login");
		} catch (error) {
			if (error?.code && error.code === "ERR_NETWORK") {
        setError("root.server", { message: "Network error, please try again later." });
      }

      // Handle error from api
      if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.detail) {
          setError("root", { message: data.detail });
        }

        Object.entries(data).forEach(([field, message]) => {
          ["first_name", "last_name", "email", "phone_number", "password"].includes(field) && setError(field, { message });
        });
      }
		}
	};

	return (
		<>
			<div className="relative min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">

        {errors.root?.server?.message && (
          <Alert msg={errors.root.server.message} handleClose={() => {clearErrors("root.server")}} />
        )}
        
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						Create an Account
					</h2>
				</div>

				<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form onSubmit={handleSubmit(onRegister)}>
							
							{/* ========== Email Field Start ========== */}
							<div className="mt-6">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-5  text-gray-700"
								>
									Email
								</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<input
										id="email"
										name="email"
										placeholder="email"
										type="email"
                    {...register("email")}
										className={`${inputFieldClass} ${errors.email ? 'border-red-500 pr-10' : ''}`}
									/>
								</div>

                {errors.email && <FormFieldError msg={errors.email.message} />}
							</div>
							{/* ========== Email Field End ========== */}

							{/* ========== Password Field Start ========== */}
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
                    {...register("password")}
										className={`${inputFieldClass} ${errors.password ? 'border-red-500 pr-10' : ''}`}
									/>
								</div>
                {errors.password && <FormFieldError msg={errors.password.message} />}
							</div>
							{/* ========= Password Field End ========= */}

							{/* ========= First/Last Name Field Start ========= */}
							<div className="mt-6 grid grid-cols-2 gap-4">
								{/* ========== FirstName Field Start ========== */}
								<div>
									<label
										htmlFor="first-name"
										className="block text-sm font-medium leading-5  text-gray-700"
									>
										First Name
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<input
											id="first-name"
											name="first-name"
											placeholder="First Name"
											type="text"
                      {...register("first_name")}
										className={`${inputFieldClass} ${errors.first_name ? 'border-red-500 pr-10' : ''}`}
										/>
									</div>
                  {errors.first_name && <FormFieldError msg={errors.first_name.message} />}
								</div>
								{/* ========== FirstName Field End ========== */}

								{/* ========== LastName Field Start ========== */}
								<div>
									<label
										htmlFor="last-name"
										className="block text-sm font-medium leading-5  text-gray-700"
									>
										Last Name
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<input
											id="last-name"
											name="last_name"
											placeholder="Last Name"
											type="text"
                      {...register("last_name")}
										className={`${inputFieldClass} ${errors.last_name ? 'border-red-500 pr-10' : ''}`}
										/>
									</div>
                  {errors.last_name && <FormFieldError msg={errors.last_name.message} />}
								</div>
								{/* ========== LastName Field End ========== */}

							</div>
							{/* ========== First/Last Name Field End ========== */}

				
							{/* ========== Phone Number Field Start ========== */}
							<div className="mt-6">
								<label
									htmlFor="phone-number"
									className="block text-sm font-medium leading-5  text-gray-700"
								>
									Phone Number
								</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<input
										id="phone-number"
										name="phone_number"
										type="number"
										placeholder="9XXXXXXXXX"
                    {...register("phone_number")}
										className={`${inputFieldClass} ${errors.phone_number ? 'border-red-500 pr-10' : ''}`}
									/>
								</div>
                {errors.phone_number && <FormFieldError msg={errors.phone_number.message} />}
							</div>
							{/* ========== Phone Number Field End ========== */}

							<div className="mt-6 flex items-center justify-between">
								<div className="text-sm leading-5">
									<Link
										to="/login"
										className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
									>
										Already have an account?
									</Link>
								</div>
							</div>

							<div className="mt-6">
								<span className="block w-full rounded-md shadow-sm">
									<button
										type="submit"
                    disabled={isSubmitting}
										className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
									>
										{isSubmitting ? 'Registering...' : 'Register'}
									</button>
								</span>
							</div>

						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
