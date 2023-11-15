import { createBrowserRouter } from "react-router-dom";
import Parent from "../pages/Parent";
import Login from "../pages/Loginpage";

const router = createBrowserRouter([
	{
		element: <Parent />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

export default router;
