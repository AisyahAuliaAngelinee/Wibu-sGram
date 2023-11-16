import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Profilecomponent = () => {
	const username = localStorage.getItem("userName");
	const userEmail = localStorage.getItem("email");

	const [userName, setUsername] = useState(username);
	const [email, setEmail] = useState(userEmail);

	const isUsername = (event) => {
		setUsername(event.target.value);
	};

	const isEmail = (event) => {
		setEmail(event.target.value);
	};

	const token = localStorage.getItem("token");
	const { id } = useParams();

	async function submitUpdate() {
		try {
			setLoading(true);
			const { data } = await axios.put(
				`http://localhost:3000/update/${id}`,
				{
					userName: username,
					email: userEmail,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// console.log(data, "<<< data");

			setEmail(data.email);
			setUsername(data.userName);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			<section className="profile-page">
				<div className="wrapper">
					<form action="">
						<h1>User Profile</h1>
						<div className="input-box">
							<input
								type="text"
								name="username"
								placeholder="Username"
								onChange={isUsername}
								value={userName}
							/>
						</div>
						<div className="input-box">
							<input
								type="email"
								name="email"
								placeholder="Email"
								onChange={isEmail}
								value={email}
							/>
						</div>
						<button
							type="button"
							className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-s-lg hover:bg-blue-900 hover:text-white focus:text-white  dark:hover:text-white dark:hover:bg-blue-700"
							onClick={submitUpdate}>
							Update
						</button>
						<button
							type="button"
							className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-e-lg hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
							Delete
						</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profilecomponent;
