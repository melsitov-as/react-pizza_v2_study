import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // создает точку запуска реакт-проекта

// рендеринг
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
