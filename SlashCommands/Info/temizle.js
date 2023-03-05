
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "temizle",
  description: "Geçersiz kimlik doğrulamalarını temizler ve yeni kimlik doğrulamaları kullanır.",
  type: ApplicationCommandType.ChatInput,



  run: async (client, interaction, args) => {
    client.clean(interaction)

  },
};