import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/LoginGoogle";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const isEmail = (event) => {
		setEmail(event.target.value);
	};

	const isPassword = (event) => {
		setPassword(event.target.value);
	};

	const submitLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/login", {
				email,
				password,
			});
			console.log(response.data, "<<<< response");

			localStorage.setItem("token", response.data.access_token);
			localStorage.setItem("id", response.data.id);
			localStorage.setItem("userName", response.data.userName);
			localStorage.setItem("email", response.data.email);

			navigate("/home");
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<>
			<section className="login-page">
				<div className="wrapper">
					<form action="">
						<h1>Login</h1>
						<div className="input-box">
							<input
								type="text"
								name="email"
								placeholder="email"
								onChange={isEmail}
								value={email}
							/>
						</div>
						<div className="input-box">
							<input
								type="password"
								name="password"
								placeholder="password"
								onChange={isPassword}
								value={password}
							/>
						</div>
						<button className="btn-login" onClick={submitLogin}>
							Login
						</button>
						<div className="register-link">
							<p>
								Don't have an account? <Link to="/register">Register</Link>
							</p>
						</div>
					</form>
					<GoogleLoginButton />
				</div>
			</section>
		</>
	);
};

export default Login;
