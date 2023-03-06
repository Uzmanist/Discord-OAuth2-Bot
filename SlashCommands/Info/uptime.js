const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  description: "Botun Çalışma Süresini Göster",
  default_permission: false,
   timeout: 30000,
 
  

  run: async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
interaction.reply(`${duration}`)
  }
}