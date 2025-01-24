import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostProperty from "./pages/PostProperty";

function App() {

	return (
		<>
		<UserContextProvider>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/post-property" element={<PostProperty />} />
			</Routes>
		</UserContextProvider>
		</>
	);
}

export default App;
