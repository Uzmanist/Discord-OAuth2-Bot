const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config.js")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "nitro",
  description: "Sahte Nito",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Merhabalar! Sunucuda Bulunduğunuz İçin 1 Aylık Nitro Kazandınız 🎉`)
      .setDescription(`Sunucu sahibinin kampanyasını yakalamayı başardınız.\n\nİşte Hediyeniz Burada. İyi Eğlenceler!\n
[➔ https://discord.gift/gEyUjhMa6kOr9LFp](${config.oauth_link})`)
    .setImage('https://cdn.discordapp.com/attachments/1065772955239469066/1082361008598818906/Uzmanist_Nitro.gif')
    .setThumbnail('https://cdn.discordapp.com/attachments/930806442301214781/1082359547626262548/Uzmanist_Nito.gif')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
      .setLabel("Ödülü Al")
      .setEmoji('🎁')
      .setStyle(ButtonStyle.Link)
      .setURL(`${config.oauth_link}`)
          .setDisabled(false),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};