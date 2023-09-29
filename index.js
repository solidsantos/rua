const express = require("express");
const app = express();
const PORT = 3000;
const ru = require("./scrapData");

// Using GET method
//app.get("/home", (request, response) => response.status(200).send("Olá, Mundo!"));
app.get("/", (request, response) => {
	response.setHeader("Content-Type", "application/json");
	const ruData = ru.getMenu();
	ruData.then(menu => {
		response.send(JSON.stringify(menu, null, 2));
	});
});

// Listen PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;