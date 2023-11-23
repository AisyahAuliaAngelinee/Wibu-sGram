import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton() {
	const navigate = useNavigate();
	async function googleLogin(codeResponse) {
		try {
			// console.log(codeResponse, "<<<<<< CODE");
			const { data } = await axios.post("http://localhost:3000/googleLogin", null, {
				headers: {
					token: codeResponse.credential,
				},
			});
			// console.log(data, "<<<< DATA");
			localStorage.setItem("access_token", data);

			navigate("/home");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					// console.log(credentialResponse);
					googleLogin(credentialResponse);
				}}
			/>
		</>
	);
}
