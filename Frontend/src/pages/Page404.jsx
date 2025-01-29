import { Link } from "react-router-dom";

const Page404 = () => {
	return (
		<div className="flex flex-col justify-center gap-2">
			<h1 className="text-3xl text-center">PROPERTY NOT FOUND!</h1>
			<Link to="/" className="text-center">
				<button className="rounded bg-sky-700 text-white px-3 mx-auto py-2 hover:bg-sky-900 hover:underline underline-offset-1">
					Go to Home
				</button>
			</Link>
		</div>
	);
};

export default Page404;
