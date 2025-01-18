const PropertyCard = ({property}) => {
	return (
        <div className="border-2">
            <h4>title: {property.title}</h4>
            <p>Property Type: {property.property_type}</p>
        </div>
    );
};
export default PropertyCard;
