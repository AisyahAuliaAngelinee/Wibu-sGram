import { useEffect, useState } from "react";
import axios from "axios";

const Postpage = () => {
	const [waifu, setWaifu] = useState([]);

	async function fetchWaifu() {
		try {
			const { data } = await axios.get(
				"https://api.waifu.im/search?is_nsfw=false&many=true"
			);
			// console.log(data.images, "<<<<");
			setWaifu(data.images);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchWaifu();
	}, []);

	return (
		<>
			<section className="waifu" id="waifu">
				<div className="box-container">
					{waifu.map((w) => (
						<div className="box flex flex-col items-center">
							<img src={w.url} alt="" />
							<span>{w.tags[0].name}</span>
							<p flex flex-wrap>
								{w.tags[0].description}
							</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default Postpage;
