import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavProfile = ({ user, handleLogout }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div
			className="relative p-3 hover:bg-gray-300 rounded-full"
			onClick={() => setIsOpen(!isOpen)}
		>
			<FontAwesomeIcon
				icon={faUser}
				size="xl"
				className="text-gray-800"
			/>

			{isOpen && (
				<div className="absolute bg-gray-200 text-gray-600 w-auto whitespace-nowrap top-12 right-1 py-2 px-1 flex flex-col">
					<Link
						to="/dashboard"
						className="hover:text-gray-900 hover:bg-slate-300 w-full px-3 py-3 transition duration-150 ease-in-out"
					>
						Dashboard
					</Link>
					<Link
						className="hover:text-gray-900 hover:bg-slate-300 w-full px-3 py-3 transition duration-150 ease-in-out"
						onClick={handleLogout}
					>
						Logout
					</Link>
				</div>
			)}
		</div>
	);
};

export default NavProfile;
