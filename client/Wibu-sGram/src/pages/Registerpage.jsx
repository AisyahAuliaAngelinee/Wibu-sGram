import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [userName, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const isUsername = (event) => {
		setUsername(event.target.value);
	};

	const isEmail = (event) => {
		setEmail(event.target.value);
	};

	const isPassword = (event) => {
		setPassword(event.target.value);
	};

	const submitRegister = async (event) => {
		event.preventDefault();
		try {
			await axios.post("https://vclrshna.online/register", {
				userName,
				email,
				password,
			});
			// console.log(response, "<<< Register");

			navigate("/");
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	// if (error) return <p>{error.message}</p>;

	return (
		<>
			<section className="regis-page">
				<div className="wrapper">
					<form action="">
						<h1>REGISTER</h1>
						<h1>{error?.message}</h1>
						<div className="input-box">
							<input type="text" name="username" placeholder="Username" onChange={isUsername} value={userName} />
						</div>
						<div className="input-box">
							<input type="email" name="email" placeholder="Email" onChange={isEmail} value={email} />
						</div>
						<div className="input-box">
							<input type="password" name="password" placeholder="Password" onChange={isPassword} value={password} />
						</div>
						<button className="btn-regis" onClick={submitRegister}>
							Register
						</button>
						<div className="login-link">
							<p>
								Already have an account? <Link to="/">Login</Link>
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Register;
