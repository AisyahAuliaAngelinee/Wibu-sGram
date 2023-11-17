import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Profilecomponent = () => {
	// const username = localStorage.getItem("userName");
	// const userEmail = localStorage.getItem("email");

	const [userName, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);

	const isUsername = (event) => {
		setUsername(event.target.value);
	};

	const isEmail = (event) => {
		setEmail(event.target.value);
	};

	const token = localStorage.getItem("token");
	const { id } = useParams();

	const navigate = useNavigate();
	// pake useeffect buat ngambil data user
	// set username sama email
	useEffect(() => {
		async function fetchUser() {
			try {
				const { data } = await axios.get(
					`https://vclrshna.online/update/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				// console.log(data, "<< Datas");

				setUsername(data.userName);
				setEmail(data.email);
			} catch (error) {
				console.log(error);
				setError(error);
			}
		}

		fetchUser();
	}, []);

	async function submitUpdate() {
		// console.log("submit");
		try {
			// setLoading(true);
			const { data } = await axios.put(
				`https://vclrshna.online/update/${id}`,
				{
					userName,
					email,
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

			navigate("/home");
		} catch (error) {
			console.log(error);
			setError(error);
		}
	}

	async function submitDelete() {
		try {
			await axios.delete(`https://vclrshna.online/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			navigate("/");
		} catch (error) {
			console.log(error);
			setError(error);
		}
	}

	return (
		<>
			<section className="profile-page">
				<div className="wrapper">
					<form action="">
						<h1>User Profile</h1>
						<h1>{error?.message}</h1>
						<div className="input-box">
							<input
								type="text"
								name="username"
								placeholder="Username"
								onChange={isUsername}
								defaultValue={userName}
							/>
						</div>
						<div className="input-box">
							<input
								type="email"
								name="email"
								placeholder="Email"
								onChange={isEmail}
								defaultValue={email}
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
							className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-e-lg hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700"
							onClick={submitDelete}>
							Delete
						</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profilecomponent;
