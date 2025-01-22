import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useUser } from "../context/userContext";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { setUser } = useUser();

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const response = await api.post("/api/token/", {
				username,
				password,
			});

			if (response.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, response.data.access);
				localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

				// fetch user data
				const res = await api.get("/api/user/");
				const newUser = res.data;
				setUser(newUser);
				
				navigate("/");
			}
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username-field">Username</label>
				<input
					type="text"
					name="username"
					id="username-field"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<label htmlFor="password-field">Password</label>
				<input
					type="password"
					name="password"
					id="password-field"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
