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
		<>
			<Hero />
			<h2>Featured Properties</h2>
			<div className="flex gap-x-4">
				{featuredProperties.map((property) => (
					<PropertyCard property={property} key={property.id} />
				))}
			</div>

			<h2>Latest Properties:</h2>
			<div className="flex gap-x-4">
				{properties.map((property) => (
					<PropertyCard property={property} key={property.id} />
				))}
			</div>
		</>
	);
};

export default Home;
