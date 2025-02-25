import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";

import api from "../../api";
import { isImage } from "../../utils";

const Profile = (props) => {
	const [user, setUser] = useState(props.user);
	const [newImage, setNewImage] = useState(null);

	// stores the url of newImage
	const newImageUrl = useMemo(() => {
		if (newImage) return URL.createObjectURL(newImage);
	}, [newImage]);

	const inputRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && isImage(file)) {
			setNewImage(file);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		// Add new profile picture
		if (newImage) {
			formData.append("profile_image", newImage);
		}

		formData.append("first_name", user.first_name);
		console.log(user.first_name);
		formData.append("last_name", user.last_name);
		formData.append("email", user.email);
		formData.append("phone_number", user.phone_number);


		// Print formData
		console.log("\n\nForm Data:")
		formData.forEach((value, key) => {
			console.log(`${key}:`, value);
		});

		const res = await api.patch("api/user/", formData);
		if (res.status === 200) {
			alert("Profile is updated!");
		} else {
			console.log(res);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8" onSubmit={handleSubmit}>
			<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
				{/* Profile Image Section */}
				<div className="relative w-32 h-32 mx-auto mb-8">
					{/* Profile Image Container */}
					<div className="relative rounded-full overflow-hidden w-full h-full border-4 border-gray-200 bg-gray-100">
						{(user.profile_image || newImage) ? (
							<img
								src={(newImage) ? newImageUrl : user.profile_image}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						) : (
							<div 
								className="w-full h-full flex items-center justify-center text-gray-400"
								onClick={handleImage}
							>
								<FontAwesomeIcon
									icon={faUser}
									className="w-2/3 h-2/3" // Control icon size relative to container
								/>
							</div>
						)}
					</div>

					{/* Edit Button with Camera Icon */}
					<button className="absolute right-1 -bottom-2 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors border-2 border-gray-200"
						onClick={() => inputRef.current.click()}
					>
						<FontAwesomeIcon
							icon={faCamera}
							className="w-5 h-5 text-gray-600"
						/>
					</button>

					{/* hidden input field for profile image */}
					<input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />
				</div>

				{/* Form Fields */}
				<form className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								First Name
							</label>
							<input
								type="text"
								className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								value={user.first_name || ""}
								onChange={(e) =>
									setUser((prevState) => ({
										...prevState,
										first_name: e.target.value,
									}))
								}
								placeholder="John"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Last Name
							</label>
							<input
								type="text"
								className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Doe"
								value={user.last_name || ""}
								onChange={(e) =>
									setUser((prevState) => ({
										...prevState,
										last_name: e.target.value,
									}))
								}
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="john.doe@example.com"
							value={user.email || ""}
							onChange={(e) =>
								setUser((prevState) => ({
									...prevState,
									email: e.target.value,
								}))
							}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Phone Number
						</label>
						<input
							type="tel"
							className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="9XXXXXXXXX"
							value={user.phone_number || ""}
							onChange={(e) =>
								setUser((prevState) => ({
									...prevState,
									phone_number: e.target.value,
								}))
							}
						/>
					</div>

					{/* Submit Button */}
					<div className="mt-8">
						<button
							type="submit"
							className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Profile;
