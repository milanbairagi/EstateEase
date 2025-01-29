import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
	return (
		<Link to={`/property/${property.id}`}>
			<div className="border-2">
				<h4>title: {property.title}</h4>
				<p>Property Type: {property.property_type}</p>
			</div>
		</Link>
	);
};
export default PropertyCard;
