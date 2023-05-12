const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { readdirSync } = require('fs')
const { token } = require('./config/config.json')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ]
})

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.slash = new Collection()
const handlers = readdirSync('./handlers/')

handlers.forEach(x => {
    require(`./handlers/${x}`)(client)
})

client.login(token)
