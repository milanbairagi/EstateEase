import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faLaptopCode, faShieldAlt, faHandshake, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

import missionSvg from "../assets/svg/building-blocks.svg";
import visionSvg from "../assets/svg/visionary-technology.svg";

const FEATURES = [
    {
        title: "User-Friendly Platform",
        description: "Easily list and browse properties with intuitive filters.",
        icon: faLaptopCode,
    },
    {
        title: "Secure & Verified Listings",
        description: "Ensuring authenticity and reliability in every transaction.",
        icon: faShieldAlt,
    },
    {
        title: "Connecting Buyers & Sellers",
        description: "Bridging the gap between property owners and potential buyers or renters.",
        icon: faHandshake,
    },
    {
        title: "Local Focus, Global Standards",
        description: "Tailored solutions for Nepal’s real estate market with world-class service.",
        icon: faGlobeAmericas,
    },
];

const STEPS = [
    {
        title: "List Your Property",
        description: "Easily list your property with detailed information and images.",
    }, 
    {
        title: "Explore & Connect",
        description: "Browse through verified listings and connect with potential buyers or renters.",
    }, 
    {
        title: "Secure & Simplified Transactions",
        description: "Effortlessly manage your real estate needs with our streamlined platform.",
    },
];


const About = () => {
	return (
		<div className="container mx-auto px-4 py-12 xl:px-20">
			{/* Header Section */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-gray-900">
					EstateEase – Your Trusted Real Estate Partner
				</h1>
				<p className="mt-4 text-lg text-gray-600">
					Simplifying real estate transactions in Nepal with
					technology and trust.
				</p>
			</div>

			{/* Mission Section */}
			<section className="flex flex-col md:flex-row justify-center items-center gap-10 mb-16">
				<img
					src={missionSvg}
					alt="Mission"
					className="w-full md:w-1/2"
				/>
				<div className="md:w-1/2">
					<h2 className="text-3xl font-semibold text-gray-900">
						Our Mission
					</h2>
					<p className="mt-4 text-gray-600">
						Our goal is to make property transactions in Nepal
						seamless and stress-free. Whether you want to buy, sell,
						or rent, we provide a reliable and efficient platform to
						meet your needs.
					</p>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
					Why Choose Us?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{FEATURES.map((feature, index) => (
						<div
							key={index}
							className="p-6 text-center border rounded-lg shadow-lg"
						>
							<FontAwesomeIcon icon={feature.icon} className="text-3xl mx-auto mb-4" />
							<h3 className="text-xl text-gray-700 font-medium my-3">
								{feature.title}
							</h3>
                            <p className="text-sm text-gray-500">{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* How It Works Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
					How It Works
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{STEPS.map((step, index) => (
						<div
							key={index}
							className="p-6 border rounded-lg shadow-md text-center"
						>
							<h3 className="text-lg font-medium text-gray-800">
								{step.title}
							</h3>
							<p className="text-gray-600 mt-2">{step.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Vision Section */}
			<section className="flex flex-col md:flex-row items-center gap-10">
				<div className="md:w-1/2">
					<h2 className="text-3xl font-semibold text-gray-900">
						Our Vision
					</h2>
					<p className="mt-4 text-gray-600">
						We aspire to revolutionize Nepal’s real estate market
						through technology, ensuring accessibility,
						transparency, and efficiency for all.
					</p>
				</div>
				<img
					src={visionSvg}
					alt="Vision"
					className="w-full md:w-1/2"
				/>
			</section>
		</div>
	);
};

export default About;
