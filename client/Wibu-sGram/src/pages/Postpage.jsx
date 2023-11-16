// import { useState } from "react";
// import { useNavigate, useEffect } from "react-router-dom";

const Postpage = () => {
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);
	// const [clubs, setClubs] = useState([]);

	// const token = localStorage.getItem("token");
	// const navigate = useNavigate();

	// async function allClubs() {
	// 	try {
	// 		setLoading(true);

	// 		const { data } = await axios.get(
	// 			"https://api.p2.lc2s5.foxhub.space/clubs",
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		// console.log(data, "<<<<<<<");

	// 		setClubs(data);
	// 	} catch (error) {
	// 		console.log(error.message);
	// 		setError(error.message);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	// useEffect(() => {
	// 	allClubs();

	// 	if (token && token !== "token is not defined") {
	// 		navigate("/");
	// 	}
	// }, []);
	return (
		<>
			<h1>POST</h1>
		</>
	);
};

export default Postpage;
