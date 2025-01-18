import { Link, useNavigate } from "react-router-dom";

import "../assets/css/navbar.css"
import { useUser } from "../../context/userContext";

const NavBar = () => {
	const {user, setUser} = useUser();

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		setUser([]);
		navigate("/");
	}
	return (
		<nav>
			<div className="nav-logo">LOGO</div>
			<ul className="nav-links-container">
				<li className="nav-link">
                    <Link to="/">Home</Link>
                </li>
				<li className="nav-link">
                    <Link to="#">Products</Link>
                </li>
				<li className="nav-link">
                    <Link to="#">About</Link>
                </li>
				{(user.length === 0) ? 
					<>
						<li className="nav-link">
							<Link to="/login">Login</Link>
						</li>
						<li className="nav-link">
							<Link to="/register">Register</Link>
						</li>
					</> 
					:
					<li className="nav-link">
						<button onClick={handleLogout}>Logout</button>
					</li>
				}
			</ul>
			<div>
				{!(user.length === 0) ? user.username : "Not Signed!"}
			</div>
		</nav>
	);
};

export default NavBar;
