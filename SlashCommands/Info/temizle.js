
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "temizle",
  description: "Geçersiz kimlik doðrulamalarýný temizler ve yeni kimlik doðrulamalarý kullanýr.",
  type: ApplicationCommandType.ChatInput,



  run: async (client, interaction, args) => {
    client.clean(interaction)

  },
};