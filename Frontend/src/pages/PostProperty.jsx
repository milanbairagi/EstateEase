import { useState } from "react";
import api from "../api";

const PostProperty = () => {
	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="text-3xl mb-3">Post Property</div>
			<PropertyForm />
		</div>
	);
};

const PropertyForm = () => {
	const input_style_classes = "border-2";
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
			formData.append(`${key}`, property[key]);
		}

		// Post new properties
		const res = await api.post("api/properties/", formData)
		console.log(res.data);
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>

			{/* Title */}
			<div>
				<div>
					<label htmlFor="title">Title</label>
				</div>
				<input
					type="text"
					id="title"
					name="title"
					className={input_style_classes}
					value={property.title}
					onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, title: e.target.value };
						})
					}
				/>
			</div>

			{/* Description */}
			<div>
				<div>
					<label htmlFor="description">Description</label>
				</div>
				<textarea
					type="text"
					id="description"
					name="description"
					className={input_style_classes}
					value={property.description}
					onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, description: e.target.value };
						})
					}
				/>
			</div>

			{/* Property Type */}
			<div>
				<div>
					<label htmlFor="property-type">Property Type</label>
				</div>
				<select
					name="property_type"
					id="property-type"
					value={property.property_type}
					onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, property_type: e.target.value };
						})
					}
				>
					<option value="sale">For Sale</option>
					<option value="rent">For Rent</option>
				</select>
			</div>

			{/* Price */}
			<div>
				<div>
					<label htmlFor="price">Price</label>
				</div>
				<input
					type="number"
					id="price"
					name="price"
					className={input_style_classes}
					value={property.price}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, price: e.target.value };
						})
					}
                    placeholder="Eg. 50000000"
				/>
			</div>

			{/* Location */}
			<div>
				<div>
					<label htmlFor="location">Location</label>
				</div>
				<input
					type="text"
					id="location"
					name="location"
					className={input_style_classes}
					value={property.location}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, location: e.target.value };
						})
					}
                    placeholder="Eg. Sorakhutte Chwok"
				/>
			</div>
		
			{/* City */}
			<div>
				<div>
					<label htmlFor="city">City</label>
				</div>
				<input
					type="text"
					id="city"
					name="city"
					className={input_style_classes}
					value={property.city}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, city: e.target.value };
						})
					}
                    placeholder="Eg. Kathmandu"
				/>
			</div>

			{/* District */}
			<div>
				<div>
					<label htmlFor="district">District</label>
				</div>
				<input
					type="text"
					id="district"
					name="district"
					className={input_style_classes}
					value={property.district}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, district: e.target.value };
						})
					}
                    placeholder="Eg. Bhaktapur"
				/>
			</div>

			{/* Latitude */}
			<div>
				<div>
					<label htmlFor="latitude">Latitude</label>
				</div>
				<input
					type="number"
					id="latitude"
					name="latitude"
					className={input_style_classes}
					value={property.latitude}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, latitude: e.target.value };
						})
					}
                    placeholder="Eg. 27.71879"
				/>
			</div>

			{/* Longitude */}
			<div>
				<div>
					<label htmlFor="longitude">Longitude</label>
				</div>
				<input
					type="number"
					id="longitude"
					name="longitude"
					className={input_style_classes}
					value={property.longitude}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, longitude: e.target.value };
						})
					}
                    placeholder="Eg. 85.30929"
				/>
			</div>
			
			{/* Bedroom */}
			<div>
				<div>
					<label htmlFor="bedroom">Bedroom</label>
				</div>
				<input
					type="number"
					id="bedroom"
					name="bedroom"
					className={input_style_classes}
					value={property.bedroom}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, bedroom: e.target.value };
						})
					}
                    placeholder="Eg. 2"
				/>
			</div>

			{/* Bathroom */}
			<div>
				<div>
					<label htmlFor="bathroom">Bathroom</label>
				</div>
				<input
					type="number"
					id="bathroom"
					name="bathroom"
					className={input_style_classes}
					value={property.bathroom}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, bathroom: e.target.value };
						})
					}
                    placeholder="Eg. 2"
				/>
			</div>

			{/* Area */}
			<div>
				<div>
					<label htmlFor="area-sqft">Area (sqft)</label>
				</div>
				<input
					type="number"
					id="area-sqft"
					name="area_sqft"
					className={input_style_classes}
					value={property.area_sqft}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, area_sqft: e.target.value };
						})
					}
                    placeholder="Eg. 20.43"
				/>
			</div>

			{/* Image */}
			<div>
				<div>
					<label htmlFor="image">Image</label>
				</div>
				<input
					type="file"
					id="image"
					name="image"
					className={input_style_classes}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, image: e.target.files[0] };
						})
					}
				/>
			</div>

			{/* Amenities 
			<div>
				<div>
					<label htmlFor="amenities">Amenities</label>
				</div>
				<input
					type="text"
					id="amenities"
					name="amenities"
					className={input_style_classes}
					value={property.amenities}
                    onChange={(e) =>
						setProperty((previousState) => {
							return { ...previousState, amenities: e.target.value };
						})
					}
				/>
			</div>
			*/}

			<button
				type="submit"
				className="bg-blue-400 rounded-md py-1 px-2 mt-4"
			>
				Submit
			</button>
		</form>
	);
};

export default PostProperty;
