
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");
const config = require("../../config.js");

module.exports = {
  name: "boşkomut",
  description: "Açıklama",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`⭐ BAŞLIK ⭐`)
      .setDescription(`\n**Açıklama**.\n\n\n**Şart [Link.](https://discord.gg/sMPrwvZRfJ)**\n**Açıklama Devam** ♾️\n**Açıklama Devamı** 🔅`)
    .setImage('https://cdn.discordapp.com/attachments/930806442301214781/1082351705133432912/Embed_Resim.png')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("BUTON (Linkli)")
      .setStyle(ButtonStyle.Link)
        .setURL(`${config.oauth_link}`)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel("BUTON BAŞLIK")
      .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};