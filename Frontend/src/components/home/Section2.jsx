import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck,  faHouseChimney, faHouseUser } from "@fortawesome/free-solid-svg-icons";


const Card = ({ title, subheading, description, icon }) => {
    return (
        <div className="group px-6 py-6 rounded-lg shadow-md bg-gray-50 hover:transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center text-center bg-gray-200 my-5 p-4 rounded-full size-20 mx-auto group-hover:bg-indigo-500 group-hover:text-gray-50 transition duration-300 ease-in-out">
                <FontAwesomeIcon icon={icon} className="text-3xl text-gray-800 group-hover:text-gray-50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-center my-2">{title}</h3>
            <p className="text-lg font-medium text-center mb-1">{subheading}</p>
            <p className="text-sm font-normal text-center tracking-tighter">{description}</p>
        </div>
    )
}

const Section2 = () => {
    return (
        <section className="container mx-auto py-20 xl:px-20">
            <h2 className="text-gray-800 text-center text-4xl font-bold mb-10">What we do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mx-10 md:mx-5 lg:mx-0">
                <Card
                    title="Buy"
                    subheading="Find Your Perfect Home with Ease"
                    description="Explore a wide range of properties and buy your dream home hassle-free. With verified listings and expert support, finding the right property has never been easier."
                    icon={faHouseCircleCheck}
                />
                <Card
                    title="Sell"
                    subheading="List, Connect & Sell Faster"
                    description="Get your property in front of the right buyers. Our platform ensures maximum visibility, making it easier for you to sell quickly and at the best price."
                    icon={faHouseChimney}
                />
                <Card
                    title="Rent"
                    subheading="Effortless Renting for Owners & Tenants"
                    description="Whether you're listing your space or looking for a rental, we make the process smooth and secure. Find the right match and rent with confidence."
                    icon={faHouseUser}
                />

            </div>
        </section>
    )
};

export default Section2;