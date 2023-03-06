
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require(`discord.js`);
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "temizle",
  description: "Geçersiz Yetkilendirilmiş Tokenleri Temizler ve Yenilenmiş Tokenleri Kullanır",
  type: ApplicationCommandType.ChatInput,



  run: async (client, interaction, args) => {
    client.clean(interaction)

  },
};