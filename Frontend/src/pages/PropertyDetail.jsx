import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed } from "@fortawesome/free-solid-svg-icons"

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
				<div>
					<div className="flex justify-between">
						<div className="text-3xl">{property.title}</div>
						<div className="text-blue-400 text-sm">
							NRs.{" "}
							<span className="text-2xl">
								{new Intl.NumberFormat("en-IN").format(
									property.price
								)}
							</span>
						</div>
					</div>
					<div className="text-sm text-gray-500">
						{property.city}, {property.district}
					</div>
					{property.image !== null && (
						<img src={property.image} className="max-h-[300px]" />
					)}

					<div className="text-2xl">About Property</div>
					<p>{property.description}</p>

					{/* Icons boxes */}
					<div className="flex gap-2">
						<div className="flex">
							<div className="h-20 w-20 bg-gray-300 flex flex-col justify-center items-center rounded-md">
                                <FontAwesomeIcon icon={faBed} size="lg" />

								<div className="text-xl font-bold text-gray-800">
									{property.bedroom}
								</div>
							</div>
						</div>

						<div className="flex">
							<div className="h-20 w-20 bg-gray-300 flex flex-col justify-center items-center rounded-md">
								<FontAwesomeIcon icon={faBath} size="lg" />

								<div className="text-xl font-bold text-gray-800">
									{property.bathroom}
								</div>
							</div>
						</div>
					</div>

					
					<InquiryForm propertyId={property.id} />
				</div>
			)}
		</>
	);
};

export default PropertyDetail;
