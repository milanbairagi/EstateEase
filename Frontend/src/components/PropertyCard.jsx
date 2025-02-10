import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
	return (
		<Link to={`/property/${property.id}`}>
			<div className="flex px-3 py-3">
				<div className="max-w-sm rounded overflow-hidden shadow-lg">
					<img
						className="w-full max-h-48 object-cover"
						src={property.image}
						alt="Property Image"
					/>
					<div className="px-6 py-4">
						<div className="font-bold text-xl mb-2">
							{property.title}
						</div>
						<p className="text-gray-700 text-base">
							{property.description}
						</p>
					</div>
					<div className="px-6 py-4">
						<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
							#photography
						</span>
						<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
							#travel
						</span>
						<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
							#winter
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default PropertyCard;
