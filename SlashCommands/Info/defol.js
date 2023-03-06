const discord = require('discord.js')
// const users = require('../../models/users');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.js')
module.exports = {
  name: "defol",
  description: "Botu Sunucundan Çıkar",
  default_permission: true,
  timeout: 30000,
  

  run: async (client, interaction, args) => {

    await interaction.reply(`Ben **${client.user.username}** ve lanet olası sunucudan **çıkıyorum.** Davet Linkim: [Burada](https://discord.com/api/oauth2/authorize?client_id=${config.client_id}&permissions=8&scope=bot%20applications.commands) `)
    interaction.guild.leave()
  }
}
