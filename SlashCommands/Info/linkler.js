
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`);
const { Prefix, Owners, client_id, redirect_uri, Token, oauth_link, Auth_log_channel, Error_log_channel, client_secret } = require("../../config.js");
module.exports = {
  name: "linkler",
  description: "Botun Linklerini Görüntüle",
  //type: ApplicationCommandType.ChatInput,
  

  
  run: async (client, interaction, args) => {

    interaction.reply({
      ephemeral: false,
      content: `> **Yönlendirme Linki**: ${redirect_uri}\n\n> **Yetkilendirme Linki**: ${oauth_link}\n\n> **Davet Linki:**      https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`
    })
  },
};