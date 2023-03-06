
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "refresh",
  description: "Refreshs authorizations.",
  //type: ApplicationCommandType.ChatInput,
  

  
  run: async (client, interaction, args) => {
client.refreshTokens(interaction)
    
  },
};