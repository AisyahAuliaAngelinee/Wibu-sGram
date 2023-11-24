import { Link } from "react-router-dom";

const Navbar = () => {
	const id = localStorage.getItem("id");

	async function logoutHandler() {
		try {
			localStorage.removeItem("token");
			localStorage.removeItem("access_token");
			localStorage.removeItem("id");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<header>
				<Link to={"#"} className="logo">
					<img src="/public/wibusgram-high-resolution-logo-transparent.png" alt="" />
				</Link>
				<div className="icons">
					<i className="fas fa-bars" id="menu-bars"></i>
				</div>
				<nav className="navbar">
					<ul>
						<li>
							<Link to={"/login"}>Pulang</Link>
						</li>
						<li>
							<Link to={"/"}>Utama</Link>

						</li>
						<li>
							<Link to={`/login`}>Profil</Link>
						</li>
						<li>
							<Link to={"/"} onClick={logoutHandler}>
								Logout
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
