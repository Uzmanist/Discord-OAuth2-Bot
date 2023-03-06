
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "yenile",
  description: "Yetkilendirmeleri Yenile",
  //type: ApplicationCommandType.ChatInput,
  

  
  run: async (client, interaction, args) => {
client.refreshTokens(interaction)
    
  },
};