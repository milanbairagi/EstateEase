import { useNavigate } from "react-router-dom";

import buyHouse from "../../assets/svg/buy-house.svg";

const AboutSection = () => {
    const navigate = useNavigate();
    
    // Redirect to about page
    const handleButtonClick = () => {
        navigate("/about");
    };

    return (
        <section className="container mx-auto py-20 xl:px-20">
            <div className="grid md:grid-cols-2 justify-center items-center my-10 px-5">
                <div className="flex justify-center items-center">
                    <img
                        className=""
                        src={buyHouse} alt="Buy House"
                    />
                </div>
                <div>
                    <h4 className="text-3xl md:text-4xl text-center md:text-left font-bold text-gray-900 my-7">Find Your Perfect Property with Ease</h4>
                    <p className="text-gray-700 text-lg md:text-sm lg:text-lg font-medium tracking-tight text-justify">
                        At <span className="font-bold">EstateEase,</span>  we make buying, selling, and renting properties in Nepal simple and stress-free. Whether you're a homeowner looking to list your property or a buyer searching for the ideal home, our platform connects you with the right opportunities effortlessly. With a focus on transparency, reliability, and user-friendly experiences, we aim to be your trusted real estate partner.
                    </p>
                    <p className="text-gray-800 text-xl md:text-lg lg:text-xl font-semibold my-4 lg:my-7">
                        Start exploring today and find the perfect place to call home!
                    </p>

                    <button className="bg-indigo-500 text-white text-lg font-medium px-7 py-3 my-3 rounded-md hover:bg-indigo-400" onClick={handleButtonClick}>Read More</button>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;