/* eslint-disable no-undef */
const puppeteer = require("puppeteer");

const getMenu = async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Navigate the page
        await page.goto("https://www.ufc.br/restaurante/cardapio/1-restaurante-universitario-de-fortaleza");

        const menu = await page.evaluate(() => {
            // Criar uma instância de Date
            const currentDate = new Date();

            // Obter o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
            const dayOfWeek = currentDate.getDay();

            // Array com nomes dos dias da semana
            const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

            // Obter o nome do dia da semana com base no índice obtido
            const currentDayOfWeek = daysOfWeek[dayOfWeek];

            // Obter a data no formato "dd/mm/aaaa"
            const day = currentDate.getDate();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // O mês é baseado em zero, então somamos 1
            const year = currentDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            function formatData(data) {
                let newData = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i] == "\n") {
                        newData += ", ";
                    }
                    else {
                        newData += data[i];
                    }
                }
                return newData;
            }
            const date = {
                dayOfWeek: currentDayOfWeek,
                formattedDate: formattedDate,
            };
            const breakfast = {
                drinks: formatData(document.querySelector("table.refeicao.desjejum > tbody > tr:nth-child(1) > td:nth-child(2)").innerText),
                breads: formatData(document.querySelector("table.refeicao.desjejum > tbody > tr:nth-child(2) > td:nth-child(2)").innerText),
                fruits: formatData(document.querySelector("table.refeicao.desjejum > tbody > tr:nth-child(3) > td:nth-child(2)").innerText),
                special: formatData(document.querySelector("table.refeicao.desjejum > tbody > tr:nth-child(4) > td:nth-child(2)").innerText),
            };
            const lunch = {
                main: formatData(document.querySelector("table.refeicao.almoco > tbody > tr:nth-child(1) > td:nth-child(2)").innerText),
                vegetarian: formatData(document.querySelector("table.refeicao.almoco > tbody > tr:nth-child(2) > td:nth-child(2)").innerText),
                salad: formatData(document.querySelector("table.refeicao.almoco > tbody > tr:nth-child(3) > td:nth-child(2)").innerText),
                garnish: formatData(document.querySelector("table.refeicao.almoco > tbody > tr:nth-child(4) > td:nth-child(2)").innerText),
                side: formatData(document.querySelector("table.refeicao.almoco > tbody > tr:nth-child(5) > td:nth-child(2)").innerText),
                dessert: formatData(document.querySelector("table.refeicao.almoco > tbody > tr:nth-child(6) > td:nth-child(2)").innerText),
            };
            const dinner = {
                main: formatData(document.querySelector("table.refeicao.jantar > tbody > tr:nth-child(1) > td:nth-child(2)").innerText),
                vegetarian: formatData(document.querySelector("table.refeicao.jantar > tbody > tr:nth-child(2) > td:nth-child(2)").innerText),
                salad: formatData(document.querySelector("table.refeicao.jantar > tbody > tr:nth-child(3) > td:nth-child(2)").innerText),
                garnish: formatData(document.querySelector("table.refeicao.jantar > tbody > tr:nth-child(4) > td:nth-child(2)").innerText),
                side: formatData(document.querySelector("table.refeicao.jantar > tbody > tr:nth-child(5) > td:nth-child(2)").innerText),
                dessert: formatData(document.querySelector("table.refeicao.jantar > tbody > tr:nth-child(6) > td:nth-child(2)").innerText),
            };
            return { date, breakfast, lunch, dinner };

        });
        await browser.close();
        return menu;
    } catch (error){
        console.error("Ocorreu um erro ao acessar os dados:", error);
        return { error: "Ocorreu um erro ao acessar os dados"};
    }

};

module.exports = {
    getMenu,
};