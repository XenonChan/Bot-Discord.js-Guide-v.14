const { readdirSync } = require('fs')

module.exports = async (client) => {
    readdirSync('./commands/').map(async dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).map(async file => {
            const pull = require(`../commands/${dirs}/${file}`)
            client.slash.set(pull.name, pull);
            if(pull.aliases) {
                pull.aliases.map(x => client.slash.set(x, pull));
            }
        });
    })
    console.log("[BOTLOADED] Commands Loaded...")
}