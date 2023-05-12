const { REST, Routes } = require('discord.js')
const { clientId, guildId, token } = require('./config/config.json');
const path = require('path');
const { readdirSync } = require('fs');

const command = [];
readdirSync('./commands/').map(async dirs => {
    readdirSync(`./commands/${dirs}/`).map(async file => {
        command.push(require(path.join(__dirname, `./commands/${dirs}/${file}`)))
    })
})

const rest = new REST({version: '9'}).setToken(token);

( async () => {
    try {
        console.log('[BOTLOADED] Start RegisterCommands....');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: command},
        );
        console.log('[BOTLOADED] RegisterCommands Successfully!!');
    } catch (error)  {
        console.log('[BOTLOADED] RegisterCommands Faild T_T', error)
    }
})();