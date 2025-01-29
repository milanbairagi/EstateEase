import { useState } from "react";
import api from "../api";

const InquiryForm = ({propertyId}) => {
	const [inquiryDetail, setInquiryDetail] = useState({
		message: "",
		contact_email: "",
		contact_phone: "",
	});

	const input_style_classes = "border-2";

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post(`api/property/${propertyId}/inquiries/`, inquiryDetail)
        .then(res=> console.log(res));
    }

	return (
		<>
            <h1 className="text-3xl font-bold my-6">Inquiry</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<div>
						<label htmlFor="location">Message</label>
					</div>
					<input
						type="text"
						id="message"
						name="message"
						className={input_style_classes}
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
				<div>
					<div>
						<label htmlFor="email">Email</label>
					</div>
					<input
						type="email"
						id="email"
						name="email"
						className={input_style_classes}
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
				<div>
					<div>
						<label htmlFor="number">Phone</label>
					</div>
					<input
						type="number"
						id="phone"
						name="phone"
						className={input_style_classes}
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

				<button className="bg-blue-400 rounded-md py-1 px-2 mt-4" type="submit">Submit</button>
			</form>
		</>
	);
};

export default InquiryForm;
