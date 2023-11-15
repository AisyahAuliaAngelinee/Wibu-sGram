import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="241968580688-ng2k41m65naga1l33k32n22f5usgemeq.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>
);
