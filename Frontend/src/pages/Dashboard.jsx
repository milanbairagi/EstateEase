import { useEffect, useState, useMemo } from "react";

import { useUser } from "../context/userContext";
import api from "../api";
import PropertiesTable from "../components/dashboard/PropertiesTable";
import Inquiries from "../components/dashboard/Inquires";
import Profile from "../components/dashboard/Profile";

const Dashboard = () => {
	const { user, setUser } = useUser();

	const [userProperties, setUserProperties] = useState([]);
	const [dashboardNav, setDashboardNav] = useState([
		{ name: "My Properties", isActive: true },
		{ name: "Inquiries", isActive: false },
		{ name: "Profile", isActive: false },
	]);

	const activeTabStyle =
		"border-b-2 border-blue-500 text-blue-500 font-semibold";
	const InactiveTabStyle = "text-gray-300";

	useEffect(() => {
		getUserProperties();
	}, [user]);

	const handleTabClick = (clickedTab) => {
		setDashboardNav((prevNav) =>
			prevNav.map((tab) =>
				tab.name === clickedTab
					? { ...tab, isActive: true }
					: { ...tab, isActive: false }
			)
		);
	};

	const getUserProperties = async () => {
		if (Object.keys(user).length === 0) return;

		try {
			const respond = await api.get(`api/properties/?owner=${user.id}`);
			const properties = await respond.data;
			setUserProperties(properties);
		} catch (error) {
			console.log(error);
		}
	};

	const activeContent = useMemo(() => {
		const activeTab = dashboardNav.find((tab) => tab.isActive);
		if (activeTab?.name === "My Properties") {
			return <PropertiesTable properties={userProperties} />
		} else if (activeTab?.name === "Inquiries") {
			return <Inquiries />;
		} else if (activeTab?.name === "Profile") {
			return <Profile user={user} />;
		}
	}, [dashboardNav, userProperties]);

	return (
		<div className="flex flex-col min-h-screen">
			<h1 className="text-3xl font-semibold">My Dashboard</h1>
			<div className="flex space-x-4 border-b">
				{dashboardNav.map((tab) => (
					<button
						className={`py-2 px-4 ${
							tab.isActive ? activeTabStyle : InactiveTabStyle
						}`}
						key={tab.name}
						onClick={() => handleTabClick(tab.name)}
					>
						{tab.name}
					</button>
				))}
			</div>
			<div className="mt-4">{activeContent}</div>
		</div>
	);
};

export default Dashboard;
