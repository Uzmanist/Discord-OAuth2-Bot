const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  description: "Botun �al��ma s�resini g�sterir",
  default_permission: false,
   timeout: 30000,
 
  

  run: async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
interaction.reply(`${duration}`)
  }
}