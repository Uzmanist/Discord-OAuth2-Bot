
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "temizle",
  description: "Ge�ersiz kimlik do�rulamalar�n� temizler ve yeni kimlik do�rulamalar� kullan�r.",
  type: ApplicationCommandType.ChatInput,



  run: async (client, interaction, args) => {
    client.clean(interaction)

  },
};