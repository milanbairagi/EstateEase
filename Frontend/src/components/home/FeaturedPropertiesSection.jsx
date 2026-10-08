import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import PropertyCard from "../PropertyCard";

const FeaturedPropertiesSection = () => {
	const [featuredProperties, setFeaturedProperties] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getFeaturedProperties();
	}, []);

	const getFeaturedProperties = () => {
		api.get("api/properties/?is_featured=true")
			.then((res) => res.data)
			.then((data) => {
				setFeaturedProperties(data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<section className="container mx-auto py-20 xl:px-20">
			<h2 className="my-5 text-3xl md:text-4xl text-center md:text-left font-bold mb-10 px-3 md:px-5">
				Featured Properties
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 lg:gap-10 mx-10 md:mx-5 lg:mx-0">
				{featuredProperties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>

			<div className="flex justify-center items-center my-10">
				<button
					className="bg-none border-2 border-indigo-500 rounded-lg text-indigo-500 text-lg font-semibold px-7 py-3 shadow-md hover:bg-indigo-500 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out"
					onClick={() => navigate("/properties")}
				>
					Show More
				</button>
			</div>
		</section>
	);
};

export default FeaturedPropertiesSection;
