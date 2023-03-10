
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`);
const { redirect_uri } = require("../../config.js");
const config = require("../../config.js");

module.exports = {
  name: "doğrula",
  description: "Bir Yetkilendirme Linki Oluştur",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Kanalları Hesabını Doğruladıktan Sonra Görebileceksin`)
      .setDescription(`ℹ️ **|** Doğrulamak için **__Doğrula__** butonuna **__TIKLA__**`)
    .setImage('https://cdn.discordapp.com/attachments/930806442301214781/1082351705133432912/Embed_Resim.png')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("✅ | Doğrula")
      .setStyle(ButtonStyle.Link)
        .setURL(`${config.oauth_link}`)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel("Sunucuya Eriş")
      .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};