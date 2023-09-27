const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const ru = require('./scrapData');


// using puppeteer for web scratching
const puppeteer = require('puppeteer');

// Using GET method
//app.get('/home', (request, response) => response.status(200).send('Olá, Mundo!'));
app.get('', (request, response) => {
    const ruData = ru.getMenu();
    ruData.then(menu => {
        console.log(menu);
        response.json(menu);
    })
});

// Listen PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
