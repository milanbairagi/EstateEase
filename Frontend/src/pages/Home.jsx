import { useState, useEffect } from "react";

import api from "../api";

import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
	const [properties, setProperties] = useState([]);
	const [featuredProperties, setFeaturedProperties] = useState([]);

	useEffect(() => {
		getFeaturedProperties();

		getProperties();
	}, []);

	const getProperties = () => {
		api.get("api/properties/?is_featured=false")
			.then((res) => res.data)
			.then((data) => {
				setProperties(data);
			})
			.catch((error) => console.log(error));
	};

	const getFeaturedProperties = () => {
		api.get("api/properties/?is_featured=true")
			.then((res) => res.data)
			.then((data) => {
				setFeaturedProperties(data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="container mx-auto">
			<Hero />
			<h2 className="text-3xl font-bold text-gray-900 my-2">Featured Properties</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{featuredProperties.map((property) => (
					<PropertyCard property={property} key={property.id} />
				))}
			</div>

			<h2 className="text-3xl font-bold text-gray-900 mt-4 my-2">Latest Properties:</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{properties.map((property) => (
					<PropertyCard property={property} key={property.id} />
				))}
			</div>
		</div>
	);
};

export default Home;
