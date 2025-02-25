import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBath,
	faBed,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import InquiryForm from "../components/InquiryForm";

import api from "../api";

import Page404 from "./Page404";

const PropertyDetail = () => {
	const param = useParams();
	const [property, setProperty] = useState({});

	useEffect(() => {
		getProperty();
	}, []);

	const getProperty = async () => {
		try {
			const respond = await api.get(`api/property/${param.id}/`);
			if (respond.status === 200) {
				setProperty(respond.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{Object.keys(property).length === 0 ? (
				<Page404 />
			) : (
				<div className="bg-gray-100">
					<div className="container mx-auto px-4 py-8">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-3">
							<div className="lg:col-span-3 mb-8">
								{/* First Section */}
								<div className="bg-white px-5 mb-3">
									<div className="flex flex-wrap justify-between mb-4 pt-3">
										<div>
											<h2 className="text-3xl font-bold mb-2">
												{property.title}
											</h2>

											<p className="text-gray-600 mb-4">
												<FontAwesomeIcon
													icon={faLocationDot}
													className="me-3"
												/>
												{property.location} {" | "}
												{property.city}
											</p>
										</div>

										<div>
											<span className="text-2xl font-semibold mr-2 text-blue-500">
												Rs. {property.price}
											</span>
										</div>
									</div>

									{/* Main Property Image */}
									<img
										src={property.image}
										alt="Property"
										className="w-full md:h-[70vh] object-cover md:w-auto mx-auto rounded-lg shadow-md mb-4"
										id="mainImage"
									/>

									{/* Additional Images */}
									<div className="flex gap-4 py-4 w-full justify-center overflow-x-auto">
										<img
											src={property.image}
											alt="Thumbnail 1"
											className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-100 hover:opacity-60 transition duration-300"
										/>

										{property.additional_images.map(
											(img_data) => (
												<img
													key={img_data.id}
													src={img_data.image}
													alt="Thumbnail"
													className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
												/>
											)
										)}
									</div>
								</div>

								<div className="block text-gray-700 mb-6 px-5 bg-white">
									<h3 className="text-2xl font-semibold mb-2 border-b-2">
										Description
									</h3>
									<p className="text-sm text-gray-700">
										{property.description}
									</p>
								</div>

								{/* Icons boxes */}
								<div className="flex gap-2">
									<div className="flex">
										<div className="h-20 w-20 bg-gray-300 flex flex-col justify-center items-center rounded-md">
											<FontAwesomeIcon
												icon={faBed}
												size="lg"
											/>

											<div className="text-xl font-bold text-gray-800">
												{property.bedroom}
											</div>
										</div>
									</div>

									<div className="flex">
										<div className="h-20 w-20 bg-gray-300 flex flex-col justify-center items-center rounded-md">
											<FontAwesomeIcon
												icon={faBath}
												size="lg"
											/>

											<div className="text-xl font-bold text-gray-800">
												{property.bathroom}
											</div>
										</div>
									</div>
								</div>

								<div className="bg-white w-full my-5 px-5">
									<h3 className="text-2xl font-medium pt-2 pb-5 border-b-2">
										Overview
									</h3>
									<div className="grid md:grid-cols-2">
										<p>fa</p>
										<p>fa</p>
										<p>fa</p>
										<p>fa</p>
									</div>
								</div>

								<div className="bg-white my-5 px-5 py-5">
									<h3 className="text-2xl font-medium mb-3">
										Amenities:
									</h3>

									<div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
										{property.amenities.map((amenity) => (
											<div
												className="bg-slate-200 flex items-center justify-start gap-1 md:gap-2 border-2 px-3 py-2 rounded text-sm lg:text-lg"
												key={amenity.id}
											>
												<img
													src={amenity?.icon}
													alt="amenity-icon"
													className="max-w-9"
												/>
												<p className="ml-2">
													{amenity.name}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>

							<div className="">
								<InquiryForm propertyId={property.id} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyDetail;
