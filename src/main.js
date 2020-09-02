const mongoose = require('mongoose');
const botInit = require('./botInit');
const settings = require('../botSettings');

async function start() {
    await mongoose.connect('mongodb://localhost/birthday', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    // let p =new Participant({externalId: '12345678'});
    // p.save()

    await botInit(settings.token)
    // await setScheduledTasks(partBotInstance, respBotInstance)
}


start();

