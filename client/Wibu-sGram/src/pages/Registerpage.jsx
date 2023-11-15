import "../App.css";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<>
			<section class="regis-page">
				<div class="wrapper">
					<form action="">
						<h1>REGISTER</h1>
						<div class="input-box">
							<input
								type="text"
								name="username"
								placeholder="Username"
								required
							/>
						</div>
						<div class="input-box">
							<input type="email" name="email" placeholder="Email" required />
						</div>
						<div class="input-box">
							<input
								type="password"
								name="password"
								placeholder="Password"
								required
							/>
						</div>
						<button class="btn-regis">Register</button>
						<div class="login-link">
							<p>
								Already have an account? <Link to="/login">Login</Link>
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Register;
