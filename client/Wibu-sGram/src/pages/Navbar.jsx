import { Link } from "react-router-dom";

const Navbar = () => {
	const id = localStorage.getItem("id");

	return (
		<>
			<header>
				<Link to={"#"} className="logo">
					<img src="/public/wibusgram.svg" alt="" />
				</Link>
				<div className="icons">
					<i className="fas fa-bars" id="menu-bars"></i>
				</div>
				<nav className="navbar">
					<ul>
						<li>
							<Link to={"/"}>Pulang</Link>
						</li>
						<li>
							<Link to={"/home"}>Utama</Link>
						</li>
						<li>
							<Link to={"/myarts"}>MyArts</Link>
						</li>
						<li>
							<Link to={`/profile/${id}`}>Profil</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
