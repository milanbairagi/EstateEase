import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../context/userContext";

const NavBar = () => {
	const { user, setUser } = useUser();

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		setUser([]);
		navigate("/");
	};
	return (
		<nav className="relative flex items-center justify-between container mx-auto sm:h-10 md:justify-center py-6 px-4 mt-2">
			<div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
				<div className="flex items-center justify-between w-full md:w-auto">
					<Link to="" aria-label="Home">
						<span className="text-2xl font-bold text-blue-700">EaseEstate</span>
					</Link>
					<div className="-mr-2 flex items-center md:hidden">
						<button
							type="button"
							id="main-menu"
							aria-label="Main menu"
							aria-haspopup="true"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
						>
							<svg
								stroke="currentColor"
								fill="none"
								viewBox="0 0 24 24"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="hidden md:flex md:space-x-10">
				<Link
					to="/"
					className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
				>
					Home
				</Link>
				<Link
					to="#"
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

			<div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
				{/* If user is not logged in */}
				{Object.keys(user).length === 0 ? (
					<>
						<span className="inline-flex">
							<Link
								to="/login"
								className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
							>
								Login
							</Link>
						</span>
						<span className="inline-flex rounded-md shadow ml-2">
							<Link
								to="/register"
								className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
							>
								Get started
							</Link>
						</span>
					</>
				) : (
					// if user is logged in
					<>
						<span className="inline-flex">
							<Link
								className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
								onClick={handleLogout}
							>
								Logout
							</Link>
						</span>
						<span className="inline-flex">
							<Link
								to="/dashboard"
								className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
							>
								Dashboard
							</Link>
						</span>
						<span className="inline-flex rounded-md shadow ml-2">
							<Link
								to="/post-property"
								className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
							>
								Post Properties
							</Link>
						</span>
					</>
				)}
			</div>
		</nav>
	);
};

export default NavBar;