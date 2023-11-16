import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const token = localStorage.getItem("token");
	const id = localStorage.getItem("id");

	async function fetchUser() {
		try {
			const { data } = await axios.get(`http://localhost:3000/update/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(data, "<< Datas");
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchUser();
	}, []);

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
							<Link to={"/"}>Pulang</Link>
						</li>
						<li>
							<Link to={"/home"}>Utama</Link>
						</li>
						<li>
							<Link to={"#"}>Waifu</Link>
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
