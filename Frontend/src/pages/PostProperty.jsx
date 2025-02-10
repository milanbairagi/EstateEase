import { useState } from "react";
import api from "../api";

const inputStyleClasses =
	"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const PostProperty = () => {
	return (
		<div className="bg-gray-100 min-h-screen">
			<PropertyForm />
		</div>
	);
};

const InputBlock = (props) => {
	return (
		<div className="mb-6">
			<label
				className="block text-gray-800 font-bold mb-2"
				htmlFor={props?.id}
			>
				{props.label}
			</label>
			<input
				className={inputStyleClasses}
				id={props?.id}
				type={props.type || "text"}
				placeholder={props?.placeholder}
				value={props.field}
				onChange={(e) => props.handleChange(e)}
			/>
		</div>
	);
};

const PropertyForm = () => {
	const [property, setProperty] = useState({
		title: "",
		description: "",
		property_type: "sale",
		price: "",
		location: "",
		city: "",
		district: "",
		latitude: "",
		longitude: "",
		bedroom: "",
		bathroom: "",
		area_sqft: "",
		image: null,
		is_active: true,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form Submitted!");

		const formData = new FormData();

		for (const key in property) {
			if (property[key] !== null) {
				formData.append(`${key}`, property[key]);
				console.log(`${key}`, property[key]);
			}
		}

		// Post new properties
		const res = await api.post("api/properties/", formData);
		console.log(res.data);
	};

	return (
		<div className="container mx-auto mt-4 p4-10">
			<div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
				<div className="md:flex">
					<div className="w-full px-6 py-8 md:p-8">
						<h2 className="text-2xl font-bold text-gray-800">
							Post Property
						</h2>
						<p className="mt-4 text-gray-600">
							Please fill out the form below to post your
							property.
						</p>
						<form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
							{/* ====== Title Start ====== */}
							<InputBlock
								id="title"
								label="Title"
								value={property.title}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										title: e.target.value,
									}))
								}
							/>
							{/* ====== Title End ====== */}

							{/* ====== Property Type Start ====== */}
							<div className="mb-6">
								<label
									className="block text-gray-800 font-bold mb-2"
									htmlFor="property-type"
								>
									Property Type
								</label>
								<select
									name="property_type"
									className={inputStyleClasses}
									id="property-type"
									value={property.property_type}
									onChange={(e) =>
										setProperty((prevState) => ({
											...prevState,
											title: e.target.value,
										}))
									}
								>
									<option value="sale">For Sale</option>
									<option value="rent">For Rent</option>
								</select>
							</div>
							{/* ====== Property Type End ====== */}

							{/* ====== Price Start ====== */}
							<InputBlock
								id="price"
								label="Price"
								placeholder="20000000"
								type="number"
								value={property.price}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										price: e.target.value,
									}))
								}
							/>
							{/* ====== Price End ====== */}

							{/* ====== Location Start ====== */}
							<InputBlock
								id="location"
								label="Location"
								placeholder="Manamaiju Pool"
								value={property.location}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										location: e.target.value,
									}))
								}
							/>
							{/* ====== Location End ====== */}

							{/* ====== City Start ====== */}
							<InputBlock
								id="city"
								label="City"
								placeholder="Kathmandu"
								value={property.city}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										city: e.target.value,
									}))
								}
							/>
							{/* ====== city End ====== */}

							{/* ====== District Start ====== */}
							<InputBlock
								id="district"
								label="District"
								placeholder="Kathmandu"
								value={property.district}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										district: e.target.value,
									}))
								}
							/>
							{/* ====== District End ====== */}

							{/* ====== Latitude Start ====== */}
							<InputBlock
								id="latitude"
								label="Latitude"
								placeholder="12.141541"
								value={property.latitude}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										latitude: e.target.value,
									}))
								}
							/>
							{/* ====== Latitude End ====== */}

							{/* ====== Longitude Start ====== */}
							<InputBlock
								id="longitude"
								label="Longitude"
								placeholder="32.123123"
								value={property.longitude}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										longitude: e.target.value,
									}))
								}
							/>
							{/* ====== Longitude End ====== */}

							{/* ====== Bedroom Start ====== */}
							<InputBlock
								id="bedroom"
								label="Bedroom"
								placeholder="5"
								value={property.bedroom}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										bedroom: e.target.value,
									}))
								}
							/>
							{/* ====== Bedroom End ====== */}

							{/* ====== Bathroom Start ====== */}
							<InputBlock
								id="bathroom"
								label="Bathroom"
								placeholder="6"
								value={property.bathroom}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										bathroom: e.target.value,
									}))
								}
							/>
							{/* ====== Bathroom End ====== */}

							{/* ====== Area Start ====== */}
							<InputBlock
								id="area"
								label="Area (sq ft)"
								placeholder="50.412"
								value={property.area_sqft}
								handleChange={(e) =>
									setProperty((prevState) => ({
										...prevState,
										area_sqft: e.target.value,
									}))
								}
								um
							/>
							{/* ====== Area End ====== */}

							{/* ====== Image Start ====== */}
							<div className="mb-6">
								<label className="block text-gray-800 font-bold mb-2">
									Image
								</label>
								<input
									type="file"
									id="image"
									name="image"
									className={`${inputStyleClasses} py-0 ps-0 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100`}
									onChange={(e) =>
										setProperty((previousState) => {
											return {
												...previousState,
												image: e.target.files[0],
											};
										})
									}
								/>
							</div>
							{/* ====== Image End ====== */}

							{/* ====== Amenities Start ====== */}
							{/* ====== Amenities End ====== */}

							{/* ====== Description Start ====== */}
							<div className="mb-6">
								<label
									className="block text-gray-800 font-bold mb-2"
									htmlFor="description"
								>
									Description
								</label>
								<textarea
									className={`${inputStyleClasses} min-h-4`}
									id="description"
									type="text"
									value={property.description}
									placeholder="Description about property"
									onChange={(e) =>
										setProperty((prevState) => ({
											...prevState,
											description: e.target.value,
										}))
									}
								></textarea>
							</div>
							{/* ====== Description End ====== */}

							<button
								className="py-2 px-4 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostProperty;
