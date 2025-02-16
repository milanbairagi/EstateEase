import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import api from "../api";
import { isImage } from "../utils";

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
		additional_images: [],
		amenities: [],
		is_active: true,
	});

	const [availableAmenities, setAvailableAmenities] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getAmenities();
	}, []);

	const ImagePreview = ({ stateFieldName, index }) => {
		// choose indexed image when index is given
		let imgFile =
			index !== undefined
				? property[stateFieldName][index]
				: property[stateFieldName];
		return (
			<div className="relative max-w-[300px]">
				<img
					id="img-preview"
					className="relative object-cover w-full"
					src={URL.createObjectURL(imgFile)}
					alt="image"
				/>
				<FontAwesomeIcon
					icon={faCircleXmark}
					size="lg"
					style={{ color: "#DF4848" }}
					className="absolute top-0 right-0 cursor-pointer"
					onClick={() =>
						// delete image on click
						setProperty((prevState) => {
							const newProperty = { ...prevState };
							// handle deletion based on index for array of images
							if (index !== undefined) {
								newProperty[stateFieldName] = newProperty[
									stateFieldName
								].filter((_, i) => i !== index);
							} else {
								newProperty[stateFieldName] = null;
							}
							return newProperty;
						})
					}
				/>
			</div>
		);
	};

	const cacheImage = useMemo(() => {
		return <ImagePreview stateFieldName="image" />;
	}, [property.image]);

	const cacheAdditionalImage = useMemo(() => {
		return (
			<div className="grid grid-cols-2 gap-2">
				{property.additional_images.map((_, index) => (
					<ImagePreview
						stateFieldName="additional_images"
						index={index}
						key={index}
					/>
				))}
			</div>
		);
	}, [property.additional_images]);

	const getAmenities = () => {
		api.get("api/amenities/").then((res) =>
			setAvailableAmenities(res.data)
		);
	};

	// Handle selecting/deselecting amenities
	const handleAmenityClick = (amenityId) => {
		setProperty((prev) => {
			const isSelected = prev.amenities.includes(amenityId);
			return {
				...prev,
				amenities: isSelected
					? prev.amenities.filter((item) => item !== amenityId)
					: [...prev.amenities, amenityId],
			};
		});
	};

	const handleMultipleImageChange = (e) => {
		const selectedImages = Array.from(e.target.files);
		const totalImages =
			property.additional_images.length + selectedImages.length;

		if (totalImages > 5) {
			alert("You can only upload up to 5 images.");
			return;
		}
		setProperty((prev) => ({
			...prev,
			additional_images: [...prev.additional_images, ...selectedImages],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form Submitted!");

		const formData = new FormData();

		for (const key in property) {
			const value = property[key];
			if (value === null || (Array.isArray(value) && value.length === 0))
				continue;

			if (Array.isArray(value)) {
				value.forEach((array_element) => {
					formData.append(`${key}`, array_element);
				});
				continue;
			}
			formData.append(`${key}`, value);
		}

		// Print formData
		// formData.forEach((value, key) => {
		// 	console.log(`${key}:`, value);
		// });

		// Post new properties
		const res = await api.post("api/properties/", formData);
		if (res.status === 201) {
			const id = res.data.id;
			navigate(`/property/${id}`);
		}
		console.log(res);
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
						<form
							className="mt-6"
							onSubmit={(e) => handleSubmit(e)}
						>
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

							{/* ====== Amenities Start ====== */}
							<div className="mb-6">
								<label className="block text-gray-800 font-bold mb-2">
									Select Amenities
								</label>
								<div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4">
									{availableAmenities.map((amenity) => {
										const isSelected =
											property.amenities.includes(
												amenity.id
											);
										return (
											<div
												className={`flex items-center justify-start gap-1 md:gap-2 border-2 px-3 py-2 rounded text-sm cursor-pointer
															${isSelected ? "bg-slate-300 border-slate-800" : "bg-gray-200 text-gray-700"}`}
												key={amenity.id}
												onClick={() =>
													handleAmenityClick(
														amenity.id
													)
												}
											>
												<img
													src={amenity?.icon}
													alt="amenity-icon"
													className="max-w-9"
												/>
												<p className="ml-2">
													{amenity.name}
												</p>
											</div>
										);
									})}
								</div>
							</div>
							{/* ====== Amenities End ====== */}

							{/* ====== Image Start ====== */}
							<div className="mb-6">
								<label className="block text-gray-800 font-bold mb-2">
									Image
								</label>

								{!property.image ? (
									<>
										<div
											htmlFor="image"
											className="relative flex flex-col min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] text-center mb-6"
										>
											<input
												type="file"
												id="image"
												name="image"
												accept="image/*"
												// className={`${inputStyleClasses} py-0 ps-0 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100`}
												className="absolute opacity-0 w-full h-full cursor-pointer"
												onChange={(e) => {
													const file =
														e.target.files[0];
													setProperty(
														(previousState) => {
															URL;
															if (isImage(file)) {
																return {
																	...previousState,
																	image: e
																		.target
																		.files[0],
																};
															}
															return {
																...previousState,
																image: null,
															};
														}
													);
												}}
											/>
											<div>
												<span className="mb-2 block text-xl font-semibold text-[#07074D]">
													Drop Main Images here
												</span>
												<span className="mb-2 block text-base font-medium text-[#6B7280]">
													Or
												</span>
												<span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
													Browse
												</span>
											</div>
										</div>
									</>
								) : (
									<>{cacheImage}</>
								)}
							</div>
							{/* ====== Image End ====== */}

							{/* ====== Additional Image Start ====== */}
							<div className="mb-6">
								<label className="block text-gray-800 font-bold mb-2">
									Additional Image
								</label>

								{property.additional_images.length < 5 && (
									<>
										<div
											htmlFor="additional-image"
											className="relative flex flex-col min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] text-center mb-6"
										>
											<input
												type="file"
												id="additional-image"
												name="additional_images"
												className="absolute opacity-0 w-full h-full cursor-pointer"
												onChange={(e) =>
													handleMultipleImageChange(e)
												}
												multiple
											/>
											<div>
												<span className="mb-2 block text-xl font-semibold text-[#07074D]">
													Drop Additional Images here
													<p className="text-sm font-medium text-[#07074D]">
														Add up to 5 images
													</p>
												</span>
												<span className="mb-2 block text-base font-medium text-[#6B7280]">
													Or
												</span>
												<span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
													Browse
												</span>
											</div>
										</div>
									</>
								)}

								{/* Additional Image Preview Start */}
								{property.additional_images.length !== 0 && (
									<h3 className="text-md font-semibold mb-3 text-gray-800">
										Preview
									</h3>
								)}
								{cacheAdditionalImage}
								{/* Additional Image Preview End */}
							</div>
							{/* ====== Additional Image End ====== */}

							{/* ====== Description Start ====== */}
							<div className="mb-6">
								<label
									className="block text-gray-800 font-bold mb-2"
									htmlFor="description"
								>
									Description
								</label>
								<textarea
									id="description"
									type="text"
									value={property.description}
									className={`${inputStyleClasses} min-h-[100px]`}
									rows={10}
									placeholder="Description about property"
									onChange={(e) =>
										setProperty((prevState) => ({
											...prevState,
											description: e.target.value,
										}))
									}
									required
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
