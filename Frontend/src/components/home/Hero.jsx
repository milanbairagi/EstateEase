
import hero from "../../assets/svg/hero.svg"
import HomeSearchBar from "../HomeSearchBar";

const Hero = () => {
	return (
		<section className="bg-white md:px-0  grid place-items-center" style={{ height: "clamp(500px, 90vh, 900px)" }}>
			<div className="container items-center max-w-6xl px-5 mx-auto xl:px-5 pb-28">
				<div className="flex flex-wrap justify-center items-center sm:-mx-3">
					<div className="w-full md:w-1/2 md:px-3">
						<div className="w-full mx-auto pb-6 space-y-6 sm:max-w-md md:space-y-4 lg:space-y-8 xl:space-y-9 lg:pr-0 md:pb-0 my-5">
							<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">
								<span className="block">Find Your Home</span>

								<span className="block text-indigo-600 xl:inline">
									Buy, sell, or rent with ease.
								</span>
							</h1>
							<p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
								Discover the perfect property to buy or rent in
								Nepal. Browse listings, connect with sellers,
								and make your next move effortlessly.
							</p>
							<div className="w-full">
								<HomeSearchBar />
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<div className="w-full h-auto lg:p-3 overflow-hidden rounded-md sm:rounded-xl">
							<img src={hero} alt="hero-image" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
