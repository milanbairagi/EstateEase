import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import districts from "../data/districts";
import SelectDropdown from "./common/SelectDropdown";

const HomeSearchBar = () => {
	const [propertyType, setPropertyType] = useState("sale");
	const [district, setDistrict] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	const [suggestDistricts, setSuggestDistricts] = useState([]);

	const navigate = useNavigate();

	const searchQuery = new URLSearchParams();

	useEffect(() => {
		setSuggestDistricts(districts);
	}, [])

	const generateQueryString = () => {
		searchQuery.set("property_type", propertyType);
		searchQuery.set("district", district);
		searchQuery.set("price__gt", maxPrice);
		return searchQuery.toString();
	}

	const handleSearch = () => {
		const queryString = generateQueryString();
		navigate(`/properties?${queryString}`);
	}

	const handleDistrictChange = (e) => {
		setDistrict(e.target.value);
		const filteredDistricts = districts.filter((district) => {
			return district
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});
		setSuggestDistricts(filteredDistricts);
	};

	const handleSelectDistrict = (district) => {
		setDistrict(district);
		setSuggestDistricts([]);
	};

	return (
		<div>
			<div className="lg:absolute grid gap-3 divide-y lg:divide-y-0 lg:grid-cols-4 items-center md:flex-nowrap p-1.5 lg:divide-x lg:divide-gray-300 bg-white border border-gray-300 rounded-lg shadow-md">
				<div className="px-4 h-full">
					<h3 className="text-md font-semibold text-indigo-500">
						Type
					</h3>
					<SelectDropdown
						options={[
							{ value: "sale", label: "Sale" },
							{ value: "rent", label: "Rent" },
						]}
						selectedValue={propertyType}
						onChange={setPropertyType}
					/>
				</div>
				<div className="px-4 h-full">
					<h3 className="text-md font-semibold text-indigo-500">
						Max Price
					</h3>
					<SelectDropdown
						options={[
							{ value: "", label: "All Price" },
							{ value: "10000000", label:"1 Crore" },
							{ value: "20000000", label:"2 Crore" },
							{ value: "30000000", label:"3 Crore" },
							{ value: "40000000", label:"4 Crore" },
							{ value: "50000000", label:"5 Crore" },
							{ value: "60000000", label:"6 Crore" },
							{ value: "70000000", label:"7 Crore" },
							{ value: "80000000", label:"8 Crore" },
							{ value: "90000000", label:"9 Crore" },
							{ value: "100000000", label:"10 Crore" },
						]}
						selectedValue={maxPrice}
						onChange={setMaxPrice}
					/>
				</div>
				<div className="relative px-4 h-full">
					<h3 className="text-md font-semibold text-indigo-500">
						District
					</h3>
					<input
						type="text"
						className="peer w-full h-7 focus:outline-none"
						value={district}
						placeholder="District"
						onChange={handleDistrictChange}
					/>
					<ul className="hidden peer-focus:block hover:block absolute w-full max-h-56 overflow-y-scroll bg-white border border-gray-400 rounded-b-lg">
						{suggestDistricts.map((district, index) => (
							<li
								key={index}
								className="p-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
								onClick={() => handleSelectDistrict(district)}
							>
								{district}
							</li>
						))}
					</ul>
				</div>
				<div className="hidden pl-4 pr-2 py-1 h-full lg:block">
					<button className="bg-indigo-500 hover:bg-indigo-400 text-center text-white w-full h-full rounded-lg" onClick={handleSearch}>
						Search
					</button>
				</div>
			</div>

			<div className="block mt-2 h-full lg:hidden">
				<button className="bg-indigo-500 hover:bg-indigo-400 text-center text-white w-full h-full p-3 rounded-lg" onClick={handleSearch}>
					Search
				</button>
			</div>
		</div>
	);
};

export default HomeSearchBar;
