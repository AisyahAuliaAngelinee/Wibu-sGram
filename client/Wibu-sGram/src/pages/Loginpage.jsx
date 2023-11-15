import "../App.css";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/LoginGoogle";

const Login = () => {
	return (
		<>
			<section className="login-page">
				<div className="wrapper">
					<form action="">
						<h1>Login</h1>
						<div className="input-box">
							<input type="text" name="email" placeholder="email" />
						</div>
						<div className="input-box">
							<input type="password" name="password" placeholder="Password" />
						</div>
						<button className="btn-login">Login</button>
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
