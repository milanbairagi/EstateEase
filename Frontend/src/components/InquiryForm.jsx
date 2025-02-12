import { useState } from "react";
import api from "../api";

const InquiryForm = ({ propertyId }) => {
	const [inquiryDetail, setInquiryDetail] = useState({
		message: "",
		contact_email: "",
		contact_phone: "",
	});

	const style = {
		label: "block text-sm font-medium leading-5 text-gray-700",
		input: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5",
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		api.post(`api/property/${propertyId}/inquiries/`, inquiryDetail).then(
			(res) => console.log(res)
		);
	};

	return (
		<div className="bg-white p-6">
			<h1 className="text-3xl font-bold mb-6">Inquiry</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="mb-6">
					<label htmlFor="location" className={style.label} >
						Message
					</label>
					<input
						type="text"
						id="message"
						name="message"
						className={style.input}
						value={inquiryDetail.message}
						onChange={(e) =>
							setInquiryDetail((previousState) => {
								return {
									...previousState,
									message: e.target.value,
								};
							})
						}
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="email" className={style.label}>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className={style.input}
						value={inquiryDetail.contact_email}
						onChange={(e) =>
							setInquiryDetail((previousState) => {
								return {
									...previousState,
									contact_email: e.target.value,
								};
							})
						}
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="number" className={style.label}>
						Phone
					</label>
					<input
						type="number"
						id="phone"
						name="phone"
						className={style.input}
						value={inquiryDetail.contact_phone}
						onChange={(e) =>
							setInquiryDetail((previousState) => {
								return {
									...previousState,
									contact_phone: e.target.value,
								};
							})
						}
					/>
				</div>

				<button
					className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default InquiryForm;
