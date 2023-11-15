import "../App.css";

const Profilecomponent = () => {
	return (
		<>
			<section className="profile-page">
				<div className="wrapper">
					<form action="">
						<h1>User Profile</h1>
						<div className="input-box">
							<input type="text" name="username" placeholder="Username" />
						</div>
						<div className="input-box">
							<input type="email" name="email" placeholder="Email" />
						</div>
						<div className="input-box">
							<input type="password" name="password" placeholder="Password" />
						</div>
						<button
							type="button"
							className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-s-lg hover:bg-blue-900 hover:text-white focus:text-white  dark:hover:text-white dark:hover:bg-blue-700">
							Update
						</button>
						<button
							type="button"
							className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-e-lg hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
							Delete
						</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profilecomponent;
