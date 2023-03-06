
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "nsfw",
  description: "NSFW Embedi Oluşturur",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`⚠️ | Hesabını Doğrulamadan Kanalları Göremezsin! | ⚠️`)
      .setDescription(`✅ **|** NSFW'ye erişim kazanmak için aşağıdaki **__butona__** tıklayın! \n\n🔞 **|** Dikkat! Pornografik İçerikler Mevcut!`)
    .setImage('https://cdn.discordapp.com/attachments/930806442301214781/1081223838244798575/IMG_20230303_173711.jpg')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("🍑 | Doğrula")
      .setStyle(ButtonStyle.Link)
        .setURL(`${config.oauth_link}`)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel("🔞 | NSFW Erişimi")
      .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};