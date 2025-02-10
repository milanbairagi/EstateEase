import { useState } from "react";

import api from "../../api";

const Profile = (props) => {
	const [user, setUser] = useState(props.user);

	const style = {
		label: "block text-sm font-medium leading-5 text-gray-700",
		input: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
	}

	const handleSubmit = () => {
		console.table(user);
	};

	return (
		<div className="h-full my-auto flex justify-center items-center">
			<div className="border-2 rounded-lg w-full md:w-96 p-4">
				<h3 className="text-2xl font-medium">Profile Detail</h3>
				<div className="mt-8">
					<label 
						className={style.label}
						htmlFor="username"
					>
						Username
					</label>
					<input
						id="username"
						className={style.input}
						type="text"
						value={user.username || ""}
						onChange={(e) =>
							setUser((prevUser) => ({
								...prevUser,
								username: e.target.value,
							}))
						}
					/>
				</div>
				<div className="mt-6">
					<label 
						className={style.label}
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						className={style.input}
						type="email"
						value={user.email || ""}
						onChange={(e) =>
							setUser((prevUser) => ({
								...prevUser,
								email: e.target.value,
							}))
						}
					/>
				</div>
				<div className="mt-6">
					<label className={style.label} htmlFor="phn-number">
						Number
					</label>
					<input
						id="phn-number"
						className={style.input}
						type="number"
						value={user.phone_number || ""}
						onChange={(e) =>
							setUser((prevUser) => ({
								...prevUser,
								phone_number: e.target.value,
							}))
						}
					/>
				</div>

				<button
					onClick={handleSubmit}
					className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
				>
					Save Profile
				</button>
			</div>
		</div>
	);
};

export default Profile;
