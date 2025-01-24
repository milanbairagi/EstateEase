import { useState, useEffect } from "react";

import api from "../api";

import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		getProperties();
	}, []);

	const getProperties = () => {
		api.get("api/properties/")
			.then((res) => res.data)
			.then((data) => {
				setProperties(data);
			})
			.catch((error) => console.log(error));
	};

    return (
		<>
			<Hero />
            <h2>Properties List:</h2>
            <div className="flex gap-x-4">
                {properties.map((property) => {
                    return <PropertyCard property={property} key={property.id} />;
                })}
            </div>
		</>
	);
};

export default Home;
