const Telegraf = require('telegraf');
const {nextStep} = require("./actions");
const {userInjection} = require('./middlewares');

async function setupTelegramBot(token) {
    const bot = new Telegraf(token);

    bot.use(userInjection);

    bot.on(['message'], nextStep);


    try {
        await bot.launch();
        console.log('\x1b[1m\x1b[35m%s\x1b[0m\x1b[32m%s\x1b[0m', 'BIRTHDAY BOT', ' was started');
    }catch (e) {
        console.error(e)
    }

    return bot;
}


module.exports = setupTelegramBot;