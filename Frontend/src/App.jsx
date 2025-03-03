import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostProperty from "./pages/PostProperty";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<UserContextProvider>
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Home /> <Footer />
							</>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/properties" element={<Properties />} />
					<Route path="/post-property" element={<PostProperty />} />
					<Route path="/property/:id" element={<PropertyDetail />} />
					<Route
						path="/about"
						element={
							<>
								<About /> <Footer />
							</>
						}
					/>
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</UserContextProvider>
		</>
	);
}

export default App;
