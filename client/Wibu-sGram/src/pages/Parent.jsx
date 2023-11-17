import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Parent = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Parent;
