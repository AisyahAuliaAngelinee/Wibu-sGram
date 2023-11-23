import { createBrowserRouter } from "react-router-dom";
import Parent from "../pages/Parent";
import Login from "../pages/Loginpage";
import Register from "../pages/Registerpage";
import Homepage from "../pages/Hompage";
import Postpage from "../pages/Postpage";
import Profilecomponent from "../components/Profilecomponent";
import Myarts from "../pages/Myartspage";
import Artsform from "../components/Artsform";

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
			{
				path: "/",
				element: <Homepage />,
			},
			{
				path: "/profile/:id",
				element: <Profilecomponent />,
			},
			{
				path: "/post",
				element: <Postpage />,
			},
			{
				path: "/myarts",
				element: <Myarts />,
			},
			{
				path: "/add-arts",
				element: <Artsform />,
			},
		],
	},
]);

export default router;
