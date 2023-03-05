
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "nsfw",
  description: "nsfw embedi",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`You can see channels after verification.`)
      .setDescription(`Click the 'Verify' button to confirm that you are 18 years or older and that you consent to viewing sexually content. 🔞`)
    .setImage('https://media.discordapp.net/attachments/963982217464410202/1021135044661739671/Screenshot_20220918-220502_CapCut.jpg')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Verify")
      .setStyle(ButtonStyle.Link)
        .setURL(`${config.oauth_link}`)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel("Silk")
      .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};