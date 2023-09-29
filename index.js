const express = require("express");
const app = express();
const PORT = 3000;
const ru = require("./scrapData").default;

// Using GET method
//app.get("/home", (request, response) => response.status(200).send("Olá, Mundo!"));
app.get("/", async (request, response) => {
    try {
        response.setHeader("Content-Type", "application/json");
        const ruData = await ru.getMenu();
        response.send(JSON.stringify(ruData, null, 2));
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        response.status(500).json({ error: "Erro ao buscar dados" });
    }
});

// Listen PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;