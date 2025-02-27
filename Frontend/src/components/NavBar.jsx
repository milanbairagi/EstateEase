import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../context/userContext";
import NavProfile from "./NavProfile";

const NavBar = () => {
	const { user, setUser } = useUser();

	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	const toggleNavbar = () => setIsOpen((prev) => !prev);

	const handleLogout = () => {
		localStorage.clear();
		setUser([]);
		navigate("/");
	};

	return (
		<nav className="flex items-center justify-between container mx-auto sm:h-7 py-4 px-4 mt-2">
			<div className="flex items-center md:inset-y-0 md:left-0">
				<div className="flex items-center justify-start gap-3 w-full md:w-auto">
					<div className="flex items-center md:hidden">
						<button
							type="button"
							id="main-menu"
							aria-label="Main menu"
							aria-haspopup="true"
							className="inline-flex items-center justify-center p-2 rounded-xl text-gray-800 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
							onClick={toggleNavbar}
						>
							<FontAwesomeIcon icon={faBars} size="xl" />
						</button>
					</div>
					<Link to="" aria-label="Home">
						<span className="text-2xl font-bold text-indigo-700">
							EaseEstate
						</span>
					</Link>
				</div>
			</div>

			{/* Desktop Navbar links Start */}
			<div className="hidden md:flex md:justify-between md:space-x-10">
				<Link
					to="/"
					className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
				>
					Home
				</Link>
				<Link
					to="properties"
					className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
				>
					Properties
				</Link>
				<Link
					href="/blog"
					className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
				>
					Blog
				</Link>
				<Link
					to="#"
					className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
				>
					About
				</Link>
			</div>

			<div className="inline-flex gap-3">
				<div className="flex items-center justify-end gap-4">
					{/* If user is not logged in */}
					{Object.keys(user).length === 0 ? (
						<>
							<span className="inline-flex">
								<Link
									to="/login"
									className="inline-flex items-center px-5 py-2 border border-indigo-600 rounded-md text-base leading-6 font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none transition duration-150 ease-in-out"
								>
									Login
								</Link>
							</span>
							<span className="hidden sm:inline-flex rounded-md shadow ml-2">
								<Link
									to="/register"
									className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
								>
									Get started
								</Link>
							</span>
						</>
					) : (
						// if user is logged in
						<>
							<span className="hidden sm:inline-flex rounded-md shadow ml-2">
								<Link
									to="/post-property"
									className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
								>
									Post Properties
								</Link>
							</span>
							<NavProfile
								user={user}
								handleLogout={handleLogout}
							/>
						</>
					)}
				</div>
			</div>
			{/* Desktop Navbar links End */}

			{/* Mobile Navbar links Start */}

			<div
				className={`${
					isOpen ? "left-0" : "-left-full"
				} fixed flex flex-col items-start gap-2 bg-slate-200 md:hidden z-10 top-0 w-2/3 h-dvh
				px-5 py-8
				transition duration-100 ease-in-out
			`}
			>
				{/* Cross Button */}
				<div className="flex items-center md:hidden">
					<button
						type="button"
						id="main-menu"
						aria-label="Main menu"
						aria-haspopup="true"
						className="inline-flex items-center justify-center p-2 rounded-xl text-gray-800 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
						onClick={toggleNavbar}
					>
						<FontAwesomeIcon icon={faXmark} size="xl" />
					</button>
				</div>
				{/* Main Links */}
				<div className="w-full flex-grow flex flex-col justify-start text-lg divide-y-2 divide-gray-500">
					<Link
						to="/"
						className="py-3 font-medium text-gray-500 border-b-2 hover:text-gray-900 transition duration-150 ease-in-out"
					>
						Home
					</Link>
					<Link
						to="/properties"
						className="py-3 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
					>
						Properties
					</Link>
					<Link
						href="/blog"
						className="py-3 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
					>
						Blog
					</Link>
					<Link
						to="#"
						className="py-3 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
					>
						About
					</Link>
				</div>

				<div className="block space-y-2 sm:hidden w-full">
					<span className="inline-flex rounded-md shadow w-full">
						<Link
							to="/post-property"
							className="inline-flex items-center w-full px-4 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
						>
							Post Properties
						</Link>
					</span>
				</div>
			</div>
			{/* Mobile Navbar links End */}
		</nav>
	);
};

export default NavBar;
