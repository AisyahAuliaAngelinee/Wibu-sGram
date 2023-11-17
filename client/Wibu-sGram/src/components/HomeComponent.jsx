import { Link } from "react-router-dom";
// import { useEffect } from "react-router-dom";

const Homecomponent = () => {
	return (
		<>
			<section className="home">
				<div className="content">
					<h3>Welcome to Wibu'sGram</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo
						donec enim diam vulputate ut.
					</p>
					<Link to={"/post"}>
						<button className="btn">Let's Start</button>
					</Link>
				</div>
				<div className="image">
					<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5c29e4c9-c2b7-4e9b-84ba-53a61c75dbc9/d987vme-57375566-c4dd-40fe-92b8-c1aa357c3e45.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVjMjllNGM5LWMyYjctNGU5Yi04NGJhLTUzYTYxYzc1ZGJjOVwvZDk4N3ZtZS01NzM3NTU2Ni1jNGRkLTQwZmUtOTJiOC1jMWFhMzU3YzNlNDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wh07CQ0i8_3mSKAj3Pci_o815jJq9_owTq7Udj4sMkI" />
				</div>
			</section>
		</>
	);
};

export default Homecomponent;
