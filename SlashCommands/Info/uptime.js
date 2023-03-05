const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  description: "Botun çalýþma süresini gösterir",
  default_permission: false,
   timeout: 30000,
 
  

  run: async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
interaction.reply(`${duration}`)
  }
}