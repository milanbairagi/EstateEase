import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
                "first_name": firstName,
                "last_name": lastName,
                email,
                "phone_number": phnNumber,
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
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username-field">Username</label>
				<input
					type="text"
					name="username"
					id="username-field"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
                    required
				/>
				<br />
				<label htmlFor="first-name-field">First Name</label>
				<input
					type="text"
					name="first_name"
					id="first-name-field"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<label htmlFor="last-name-field">Last Name</label>
				<input
					type="text"
					name="last_name"
					id="last-name-field"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<br />
				<label htmlFor="email-field">Email</label>
				<input
					type="email"
					name="email"
					id="email-field"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
                    required
				/>
				<br />
				<label htmlFor="phone-field">Phone Number</label>
				<input
					type="tel"
					name="phone_number"
					id="phone-field"
					value={phnNumber}
					onChange={(e) => setPhnNumber(e.target.value)}
                    required
				/>
				<br />
				<label htmlFor="password-field">Password</label>
				<input
					type="password"
					name="password"
					id="password-field"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
                    required
				/>
				<br />
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Register;
