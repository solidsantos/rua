const puppeteer = require('puppeteer');

const getMenu = async () =>{
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    // Navigate the page
    await page.goto('https://www.ufc.br/restaurante/cardapio/1-restaurante-universitario-de-fortaleza');

    const menu = await page.evaluate(() => {
        const breakfast = ({
            drinks: document.querySelector('table.refeicao.desjejum > tbody > tr:nth-child(1) > td:nth-child(2)').innerText,
            breads: document.querySelector('table.refeicao.desjejum > tbody > tr:nth-child(2) > td:nth-child(2)').innerText,
            fruits: document.querySelector('table.refeicao.desjejum > tbody > tr:nth-child(3) > td:nth-child(2)').innerText,
            special: document.querySelector('table.refeicao.desjejum > tbody > tr:nth-child(4) > td:nth-child(2)').innerText,
        });
        const lunch = ({
            main: document.querySelector('table.refeicao.almoco > tbody > tr:nth-child(1) > td:nth-child(2)').innerText,
            vegetarian: document.querySelector('table.refeicao.almoco > tbody > tr:nth-child(2) > td:nth-child(2)').innerText,
            salad: document.querySelector('table.refeicao.almoco > tbody > tr:nth-child(3) > td:nth-child(2)').innerText,
            garnish: document.querySelector('table.refeicao.almoco > tbody > tr:nth-child(4) > td:nth-child(2)').innerText,
            side: document.querySelector('table.refeicao.almoco > tbody > tr:nth-child(5) > td:nth-child(2)').innerText,
            dessert: document.querySelector('table.refeicao.almoco > tbody > tr:nth-child(6) > td:nth-child(2)').innerText,
        });
        const dinner = ({
            main: document.querySelector('table.refeicao.jantar > tbody > tr:nth-child(1) > td:nth-child(2)').innerText,
            vegetarian: document.querySelector('table.refeicao.jantar > tbody > tr:nth-child(2) > td:nth-child(2)').innerText,
            salad: document.querySelector('table.refeicao.jantar > tbody > tr:nth-child(3) > td:nth-child(2)').innerText,
            garnish: document.querySelector('table.refeicao.jantar > tbody > tr:nth-child(4) > td:nth-child(2)').innerText,
            side: document.querySelector('table.refeicao.jantar > tbody > tr:nth-child(5) > td:nth-child(2)').innerText,
            dessert: document.querySelector('table.refeicao.jantar > tbody > tr:nth-child(6) > td:nth-child(2)').innerText,
        });
        return { breakfast, lunch, dinner };
    });
    await browser.close();
    return JSON.stringify(menu, null, 4);
};

getMenu();


module.exports = {
    getMenu,
}