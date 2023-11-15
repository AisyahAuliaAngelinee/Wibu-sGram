import { createBrowserRouter } from "react-router-dom";
import Parent from "../pages/Parent";
import Login from "../pages/Loginpage";
import Register from "../pages/Registerpage";
import Homepage from "../pages/Hompage";

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
		],
	},
]);

export default router;
