import { createBrowserRouter } from "react-router-dom";
import Parent from "../pages/Parent";
import Login from "../pages/Loginpage";
import Register from "../pages/Registerpage";

const router = createBrowserRouter([
	{
		element: <Parent />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

export default router;
