import { useEffect, useCallback, useState } from "react";

import PropertyCard from "../components/PropertyCard";
import api from "../api";
import districts from "../data/districts";
import districtCities from "../data/districtCities";

const Properties = () => {
	const initialFilters = {
		title__contains: "",
		property_type: [],
		bedroom__gt: "",
		bathroom__gt: "",
		price__gt: "",
		price__lt: "",
		city__contains: "",
		district__contains: "",
		amenities: [],
		area_sqft__gt: "",
		area_sqft__lt: "",
	};

	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [properties, setProperties] = useState([]);
	const [availableAmenities, setAvailableAmenities] = useState([]);
	const [filters, setFilters] = useState(initialFilters);

	const resetFilters = () => setFilters(initialFilters);

	// Generate query string from filters object
	const generateQueryString = useCallback((filters) => {
		const searchParams = new URLSearchParams();

		Object.entries(filters).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((val) => searchParams.append(key, val)); // Append each array element separately
			} else {
				searchParams.append(key, value);
			}
		});

		return `?${searchParams.toString()}`;
	}, []);

	// Fetch amenities
	const getAmenities = useCallback(() => {
		api.get("api/amenities/").then((res) =>
			setAvailableAmenities(res.data)
		);
	});

	// Handle selecting/deselecting amenities
	const handleAmenityClick = (amenityId) => {
		setFilters((prev) => {
			const isSelected = prev.amenities.includes(amenityId);
			return {
				...prev,
				amenities: isSelected
					? prev.amenities.filter((item) => item !== amenityId)
					: [...prev.amenities, amenityId],
			};
		});
	};

	// Fetch properties
	const fetchProperties = useCallback(async () => {
		try {
			const queryString = generateQueryString(filters);
			const response = await api.get(`api/properties${queryString}`);
			setProperties(response.data);
		} catch (error) {
			console.error("Failed to fetch properties:", error);
		}
	}, [filters, generateQueryString]);

	useEffect(() => {
		getAmenities();
	}, []);

	useEffect(() => {
		fetchProperties();
	}, [filters, generateQueryString]);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Mobile Filters Toggle */}
				<button
					onClick={() => setIsFiltersOpen(!isFiltersOpen)}
					className="md:hidden p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-between"
				>
					<span>
						{isFiltersOpen ? "Hide Filters" : "Show Filters"}
					</span>
					<svg
						className={`w-5 h-5 ml-2 transform transition-transform ${
							isFiltersOpen ? "rotate-180" : ""
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				{/* Filters Column */}
				<div
					className={`md:col-span-1 space-y-6 ${
						isFiltersOpen ? "block" : "hidden"
					} md:block`}
				>
					<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
						<h2 className="text-lg font-semibold mb-4 text-gray-900">
							Filters
						</h2>

						{/* Property Type */}
						<div className="space-y-3 mb-6">
							<h3 className="text-sm font-medium text-gray-700">
								Property Type
							</h3>
							<label className="flex items-center space-x-2">
								<input
									type="checkbox"
									className="form-checkbox h-4 w-4 peer"
									checked={filters.property_type.includes(
										"sale"
									)}
									onChange={(e) =>
										setFilters({
											...filters,
											property_type: e.target.checked
												? [
														...filters.property_type,
														"sale",
												  ]
												: filters.property_type.filter(
														(type) =>
															type !== "sale"
												  ),
										})
									}
								/>
								<span className="text-gray-600 peer-checked:font-medium">
									For Sale
								</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 peer"
									checked={filters.property_type.includes(
										"rent"
									)}
									onChange={(e) =>
										setFilters({
											...filters,
											property_type: e.target.checked
												? [
														...filters.property_type,
														"rent",
												  ]
												: filters.property_type.filter(
														(type) =>
															type !== "rent"
												  ),
										})
									}
								/>
								<span className="text-gray-600 peer-checked:font-medium">
									For Rent
								</span>
							</label>
						</div>

						{/* Bed/Bath */}
						<div className="space-y-3 mb-6">
							<h3 className="text-sm font-medium text-gray-700">
								Rooms
							</h3>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="text-sm text-gray-600">
										Bedrooms (Min)
									</label>
									<select
										className="w-full mt-1 px-3 py-2 border rounded-md"
										defaultValue=""
										onChange={(e) =>
											setFilters({
												...filters,
												bedroom__gt: e.target.value,
											})
										}
									>
										<option value="">Any</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</div>
								<div>
									<label className="text-sm text-gray-600">
										Bathrooms (Min)
									</label>
									<select
										className="w-full mt-1 px-3 py-2 border rounded-md"
										defaultValue=""
										onChange={(e) =>
											setFilters({
												...filters,
												bathroom__gt: e.target.value,
											})
										}
									>
										<option value="">Any</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</div>
							</div>
						</div>

						{/* Price Range */}
						<div className="space-y-3 mb-6">
							<h3 className="text-sm font-medium text-gray-700">
								Price Range
							</h3>
							<div className="flex gap-3">
								<input
									type="number"
									placeholder="Min"
									className="w-full px-3 py-2 border rounded-md"
									value={filters.price__gt}
									onChange={(e) =>
										setFilters({
											...filters,
											price__gt: e.target.value,
										})
									}
								/>
								<input
									type="number"
									placeholder="Max"
									className="w-full px-3 py-2 border rounded-md"
									value={filters.price__lt}
									onChange={(e) =>
										setFilters({
											...filters,
											price__lt: e.target.value,
										})
									}
								/>
							</div>
						</div>

						{/* Location */}
						<div className="space-y-3 mb-6">
							<h3 className="text-sm font-medium text-gray-700">
								Location
							</h3>
							<select
								className="w-full px-3 py-2 border rounded-md"
								defaultValue=""
								onChange={(e) =>
									setFilters({
										...filters,
										district__contains: e.target.value,
									})
								}
							>
								<option value="">Select District</option>
								{districts.map((district) => (
									<option key={district}>{district}</option>
								))}
							</select>
							<select
								className="w-full px-3 py-2 border rounded-md"
								defaultValue=""
								onChange={(e) =>
									setFilters({
										...filters,
										city__contains: e.target.value,
									})
								}
							>
								<option value="">Select City</option>
								{filters.district__contains &&
									districtCities[
										filters.district__contains
									].map((city) => (
										<option key={city}>{city}</option>
									))}
							</select>
						</div>

						{/* Amenities */}
						<div className="space-y-3 mb-6">
							<h3 className="text-sm font-medium text-gray-700">
								Amenities
							</h3>
							<div className="space-y-1">
								{availableAmenities.map((amenity) => {
									const isSelected =
										filters.amenities.includes(amenity.id);
									return (
										<div
											className="flex items-center cursor-pointer gap-1 hover:bg-gray-100 mb-0.5"
											key={amenity.id}
											onClick={() =>
												handleAmenityClick(amenity.id)
											}
										>
											<input
												className="peer"
												type="checkbox"
												checked={isSelected}
												readOnly
											/>
											<p className="text-sm text-gray-600 font-light ml-2 peer-checked:font-normal">
												{amenity.name}
											</p>
										</div>
									);
								})}
							</div>
						</div>

						{/* Area */}
						<div className="space-y-3">
							<h3 className="text-sm font-medium text-gray-700">
								Area (sqft)
							</h3>
							<div className="flex gap-3">
								<input
									type="number"
									placeholder="Min"
									className="w-full px-3 py-2 border rounded-md"
									value={filters.area_sqft__gt}
									onChange={(e) =>
										setFilters({
											...filters,
											area_sqft__gt: e.target.value,
										})
									}
								/>
								<input
									type="number"
									placeholder="Max"
									className="w-full px-3 py-2 border rounded-md"
									value={filters.area_sqft__lt}
									onChange={(e) =>
										setFilters({
											...filters,
											area_sqft__lt: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Results Column */}
				<div className="md:col-span-3">
					{/* Search Bar */}
					<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
						<div className="flex gap-2">
							<input
								type="text"
								placeholder="Search properties..."
								className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								value={filters.title__contains}
								onChange={(e) =>
									setFilters({
										...filters,
										title__contains: e.target.value,
									})
								}
							/>
							<button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
								Search
							</button>
						</div>
					</div>

					{/* Property List */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* Replace with your property card component */}
						{properties.map((property) => (
							<PropertyCard
								key={property.id}
								property={property}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Properties;
