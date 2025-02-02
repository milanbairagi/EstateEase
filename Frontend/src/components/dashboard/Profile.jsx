import { useState } from "react";

import api from "../../api";

const Profile = (props) => {
	const [user, setUser] = useState(props.user);

    const handleSubmit = () => {
        console.table(user);
    }

	return (
		<div>
			<div className="text-2xl font-medium">
				Profile Detail
			</div>
			<div>
				<label className="text-lg me-3" htmlFor="">
					Username
				</label>
				<input
					className="border border-gray-300"
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
			<div>
				<label className="text-lg me-3" htmlFor="">
					Email
				</label>
				<input
					className="border border-gray-300"
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
			<div>
				<label className="text-lg me-3" htmlFor="">
					Number
				</label>
				<input
					className="border border-gray-300"
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

            <button onClick={handleSubmit}  className="bg-blue-400 px-5 py-2 my-3 rounded-md">Save Profile</button>
		</div>
	);
};

export default Profile;
