import { Link } from "react-router-dom"

import { SOCIAL_LINKS, CONTACTS } from "../constants";

const Footer = () => {

    return (
        <section className="min-w-screen bg-gray-600">
            <div className="container mx-auto px-5 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold text-gray-50 mb-4">About Us</h3>
                        <p className="text-lg text-gray-200 font-medium mb-2">EstateEase is a real estate company that provides a platform for property buyers and sellers to connect.</p>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold text-gray-50 mb-4">Quick Links</h3>
                        <ul className="text-lg text-gray-200 font-medium">
                            <li className="mb-2 hover:scale-105 transition-transform"><Link to="/">Home</Link></li>
                            <li className="mb-2 hover:scale-105 transition-transform"><Link to="/properties">Properties</Link></li>
                            <li className="mb-2 hover:scale-105 transition-transform"><Link to="#">About Us</Link></li>
                            <li className="mb-2 hover:scale-105 transition-transform"><Link to="#">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold text-gray-50 mb-4">Contact Us</h3>
                        <ul className="text-lg text-gray-200 font-medium">
                            <li className="mb-2 hover:scale-105 transition-transform">{CONTACTS.phone}</li>
                            <li className="mb-2 hover:scale-105 transition-transform">{CONTACTS.email}</li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold text-gray-50 mb-4">Social Links</h3>
                        <ul className="text-lg text-gray-200 font-medium">
                            {SOCIAL_LINKS.map((link, index) => (
                                <li key={index} className="mb-2 hover:scale-105 transition-transform"><Link to={link.link} target="_blank">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;