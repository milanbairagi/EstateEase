import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const PropertiesTable = ({ properties }) => {
	const tableDataStyle = "border border-gray-400";
	const navigate = useNavigate();

	return (
		<table className="table-auto border border-collapse border-gray-400">
			<thead>
				<tr>
					<th className={tableDataStyle}>ID</th>
					<th className={tableDataStyle}>Title</th>
					<th className={tableDataStyle}>Property Type</th>
					<th className={tableDataStyle}>Price</th>
					<th className={tableDataStyle}>City</th>
					<th className={tableDataStyle}>District</th>
					<th className={tableDataStyle}>Bedroom</th>
					<th className={tableDataStyle}>Bathroom</th>
					<th className={tableDataStyle}>Status</th>
					<th className={tableDataStyle}>Created At</th>
					<th className={tableDataStyle}>Updated At</th>
				</tr>
			</thead>
			<tbody>
				{properties.map((property) => (
					<tr className="hover:cursor-pointer hover:bg-gray-600 hover:text-white" onClick={() => navigate(`/property/${property.id}`)} key={property.id}>
						<td className={tableDataStyle}>{property.id}</td>
						<td className={tableDataStyle}>{property.title}</td>
						<td className={tableDataStyle}>
							{property.property_type}
						</td>
						<td className={tableDataStyle}>{property.price}</td>
						<td className={tableDataStyle}>{property.city}</td>
						<td className={tableDataStyle}>{property.district}</td>
						<td className={tableDataStyle}>{property.bedroom}</td>
						<td className={tableDataStyle}>{property.bathroom}</td>
						<td className={tableDataStyle}>
							{property.is_active ? (
								<FontAwesomeIcon icon={faCheck} />
							) : (
								<FontAwesomeIcon icon={faTimes} />
							)}
						</td>
						<td className={tableDataStyle}>
							{property.created_at}
						</td>
						<td className={tableDataStyle}>
							{property.updated_at}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default PropertiesTable;
