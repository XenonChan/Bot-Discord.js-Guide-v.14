const { readdirSync }  = require('fs')

module.exports = async (client) => {
    const loadCommands = dirs => {
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`)
            const eventName = file.split('.')[0]
            client.on(eventName, evt.bind(null, client))
        }
    }
    ['client', 'guild'].forEach((x) => loadCommands(x))

    console.log('[BOTLOADED] Events Loaded...')
}