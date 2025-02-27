import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faRulerCombined, faLocationDot } from "@fortawesome/free-solid-svg-icons";


const PropertyCard = ({ property }) => {
	return (
		<Link to={`/property/${property.id}`}>
			<div className="flex justify-center px-3 py-3">
				<div className="max-w-sm rounded-md hover:shadow-lg border-[1px] border-gray-100 overflow-hidden">
					<div className="aspect-video bg-gray-200 rounded-md overflow-hidden p-0.5">
						<img
							className="object-cover"
							src={property.image}
							alt="Property Image"
						/>
					</div>
					
					<div className="px-3 py-3">
						<h3 className="font-medium mb-0.5 text-md truncate">
							{property.title}
						</h3>
						<p className="text-gray-800 text-lg font-bold mb-0.5">Rs. {property.price}</p>
						<p className="text-gray-400 mb-2 text-xs font-semibold truncate">
							<span className="mr-1"><FontAwesomeIcon icon={faLocationDot} /></span>{property.location} | {property.city}
						</p>
						
						<div className="flex items-center text-sm text-gray-600 space-x-2">
							<span> <FontAwesomeIcon icon={faBed} /> {property.bedroom}</span>
							<span>•</span>
							<span><FontAwesomeIcon icon={faBath} /> {property.bathroom}</span>
							<span>•</span>
							<span><FontAwesomeIcon icon={faRulerCombined} /> {property.area_sqft} <sup>2</sup> ft</span>
						</div>
					</div>					
				</div>
			</div>
		</Link>
	);
};
export default PropertyCard;
