module.exports = {
    name: "ping",
    description: "BotisReply'PONG!!!'",
    permissions: {
        bot: [],
        user: []
    },

    run: async (client, interaction) => {
        interaction.reply("PONG!!!!")
    }
}