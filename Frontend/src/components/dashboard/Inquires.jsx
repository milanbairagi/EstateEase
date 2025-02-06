import { useState, useEffect } from "react";
import api from "../../api";
import InquiryCard from "./InquiryCard";

const Inquiries = () => {
	const [inquiries, setInquiries] = useState([]);

	const tableDataStyle = "border border-gray-400";

	useEffect(() => {
		getInquiries();
	}, []);

	const getInquiries = async () => {
		api.get("api/user/inquiries/").then((res) => {
			setInquiries(res.data);
		});
	};

	return <div className="flex flex-col gap-3 items-center">
		{inquiries.map((inquiry) => (
			<InquiryCard inquiry={inquiry} key={inquiry.id} />
		))}
	</div>;
};

export default Inquiries;
