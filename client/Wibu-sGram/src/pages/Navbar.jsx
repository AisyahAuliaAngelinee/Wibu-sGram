import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<>
			<header>
				<Link to={"#"} className="logo">
					<img
						src="/public/wibusgram-high-resolution-logo-transparent.png"
						alt=""
					/>
				</Link>
				<div className="icons">
					<i className="fas fa-bars" id="menu-bars"></i>
				</div>
				<nav className="navbar">
					<ul>
						<li>
							<Link to={"#"}>Home</Link>
						</li>
						<li>
							<Link to={"#"}>About</Link>
						</li>
						<li>
							<Link to={"#"}>Waifu</Link>
						</li>
						<li>
							<Link to={"#"}>Post</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
