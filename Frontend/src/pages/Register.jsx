import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phnNumber, setPhnNumber] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const respond = await api.post("/api/register/", {
				username,
				first_name: firstName,
				last_name: lastName,
				email,
				phone_number: phnNumber,
				password,
			});
			console.log(respond);
			navigate("/login");
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						Create an Account
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form>
							{/* ========== Username Field Start ========== */}
							<div className="mt-3">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-5  text-gray-700"
								>
									Username
								</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<input
										id="username"
										name="username"
										placeholder="username"
										type="text"
										required=""
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									/>
									<div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg
											className="h-5 w-5 text-red-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</div>
							</div>
							{/* ========== Username Field End ========== */}

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
										required=""
										onChange={(e) =>
											setPassword(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									/>
								</div>
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
											value={firstName}
											onChange={(e) =>
												setFirstName(e.target.value)
											}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
										/>
										<div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<svg
												className="h-5 w-5 text-red-500"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
									</div>
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
											value={lastName}
											onChange={(e) =>
												setLastName(e.target.value)
											}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
										/>
										<div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<svg
												className="h-5 w-5 text-red-500"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
									</div>
								</div>
								{/* ========== LastName Field End ========== */}

							</div>
							{/* ========== First/Last Name Field End ========== */}

							
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
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									/>
									<div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg
											className="h-5 w-5 text-red-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</div>
							</div>
							{/* ========== Email Field End ========== */}

							
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
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
										placeholder="9XXXXXXXXX"
										value={phnNumber}
										onChange={(e) =>
											setPhnNumber(e.target.value)
										}
									/>
									<div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg
											className="h-5 w-5 text-red-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</div>
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
										onClick={handleSubmit}
										className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
									>
										Register
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
