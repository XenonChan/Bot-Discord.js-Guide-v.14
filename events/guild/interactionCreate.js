const { EmbedBuilder } = require('discord.js')

module.exports = (client, interaction) => {
    if(interaction.isCommand()) {
        if(!client.slash.has(interaction.commandName)) return;
        if(!interaction.guild) return;
        const commands = client.slash.get(interaction.commandName);
        if(!commands) return;

        try {
            if(commands.permissions.user) {
                if(!interaction.member.permissions.has(commands.permissions.user || [])) {

                    const embed = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle("คุณไม่มีสิทธิเข้าถึงคำสั่งนี้")
                        .setTimestamp()

                    interaction.reply({ embeds: [embed], ephemeral: true })
                }
            } else if (commands.permissions.bot) {
                if(!interaction.guild.member.me.permissions.has(commands.permissions.bot || [])) {

                    const embed = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle("บอทไม่มีสิทธิในการใช้คำสั่งนนี้ในเซิฟเวอร์ของคุณ")
                        .setDescription("โปรดให้สิทธิบอทด้วยงับ")
                        .setTimestamp()

                    interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }

            commands.run(client, interaction);

        } catch (err) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("คำสั่งที่ใช้มีปัญหาโปรดรอการแก้ในอนาคต")
                .setTimestamp()

            interaction.reply({ embeds: [embed], ephemeral: true})
            console.log(err)
        }
    }
}