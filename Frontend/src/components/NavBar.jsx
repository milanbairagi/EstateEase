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
		<nav className="flex justify-between align-middle border-b-2">
			<div>LOGO</div>
			<ul className="flex justify-center align-middle gap-4">
				<li className="hover:underline">
                    <Link to="/">Home</Link>
                </li>
				<li className="hover:underline">
					<Link to="#">Products</Link>
				</li>
				<li className="hover:underline">
					<Link to="#">About</Link>
				</li>
				{Object.keys(user).length === 0 ? (
					<>
						<li className="hover:underline">
							<Link to="/login">Login</Link>
						</li>
						<li className="hover:underline">
							<Link to="/register">Register</Link>
						</li>
					</>
				) : (
					<li className="hover:underline">
						<button onClick={handleLogout}>Logout</button>
					</li>
				)}
			</ul>
			<div>
				{Object.keys(user).length === 0 ? (
					"Not Signed!"
				) : (
					<div className="flex gap-3">
						<Link to="/dashboard"><div className="hover:underline">{user.username}</div></Link>
						<div className="bg-blue-700 text-white px-3">
							<Link to="/post-property">Post Property</Link>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
