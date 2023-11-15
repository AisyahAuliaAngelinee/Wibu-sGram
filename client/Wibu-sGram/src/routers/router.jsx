import { createBrowserRouter } from "react-router-dom";
import Parent from "../pages/Parent";
import Login from "../pages/Loginpage";
import Register from "../pages/Registerpage";
import Homepage from "../pages/Hompage";
import Postpage from "../pages/Postpage";
import Profilecomponent from "../components/Profilecomponent";

const router = createBrowserRouter([
	{
		element: <Parent />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/home",
				element: <Homepage />,
			},
			{
				path: "/profile",
				element: <Profilecomponent />,
			},
			{
				path: "/post",
				element: <Postpage />,
			},
		],
	},
]);

export default router;
