import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhoneAlt,
	faEnvelope,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { CONTACTS } from "../../constants";

const Card = ({ title, detail, icon }) => {
	return (
		<div className="group px-5 py-5 rounded-lg hover:transform hover:scale-105 transition duration-300 ease-in-out">
			<div className="flex items-center justify-center text-center bg-gray-200 my-5 p-4 rounded-full size-20 mx-auto group-hover:bg-indigo-500 group-hover:text-gray-50 transition duration-300 ease-in-out">
				<FontAwesomeIcon
					icon={icon}
					className="text-3xl text-gray-800 group-hover:text-gray-50 transition-colors"
				/>
			</div>
			<h3 className="text-2xl text-gray-800 font-bold text-center my-2">{title}</h3>
			<p className="text-lg text-gray-700 font-medium text-center mb-1">{detail}</p>
		</div>
	);
};

const Contact = () => {
	return (
		<section className="container mx-auto my-10">
			<div className="mb-7">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
					Let's Stay Connected
				</h2>
				<p className="text-center text-lg text-gray-500 font-medium">
					Reach Out to Us Anytime – We're Here to Help!
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mx-10 md:mx-5">
				<Card
					title="Phone"
					detail={CONTACTS.phone}
					icon={faPhoneAlt}
				/>
				<Card
					title="Email"
					detail={CONTACTS.email}
					icon={faEnvelope}
				/>
				<Card
					title="Address"
					detail={CONTACTS.address}
					icon={faLocationDot}
				/>
			</div>
		</section>
	);
};

export default Contact;
