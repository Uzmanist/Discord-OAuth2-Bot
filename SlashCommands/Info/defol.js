const discord = require('discord.js')
// const users = require('../../models/users');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.js')
module.exports = {
  name: "defol",
  description: "Botu sunucudan at",
  default_permission: true,
  timeout: 30000,
  

  run: async (client, interaction, args) => {

    await interaction.reply(`${client.user.username} sunucudan çýktým. **Davet linkim:**
https://discord.com/api/oauth2/authorize?client_id=${config.client_id}&permissions=8&scope=bot%20applications.commands `)
    interaction.guild.leave()
  }
}
