import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Myarts = () => {
	const [arts, setArts] = useState([]);

	async function fetchArts() {
		try {
			const { data } = await axios.get("http://localhost:3000/arts");
			setArts(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchArts();
	}, []);

	const { id } = useParams();
	const navigate = useNavigate();

	const deleteArts = async () => {
		try {
			await axios.delete(`http://localhost:3000/delete/${id}`);
			navigate("/myarts");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className="waifu" id="waifu">
				<Link to={"/add-arts"}>
					<button className="text-white px-2.5 py-1 rounded text-sm font-medium bg-blue-800 border-0 border-l hover:bg-[#15803d] dark:hover:text-white">
						Add More
					</button>
				</Link>
				<div className="box-container">
					{arts.map((a) => (
						<div className="box flex flex-col items-center">
							<img src={a.imgUrl} alt="" />
							<span>{a.title}</span>
							<button
								className="text-white px-2.5 py-1 rounded text-sm font-medium bg-blue-800 border-0 border-l hover:bg-[#15803d] dark:hover:text-white"
								onClick={deleteArts}>
								Delete
							</button>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default Myarts;
