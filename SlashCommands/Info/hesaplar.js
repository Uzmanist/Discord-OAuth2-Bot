
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "hesaplar",
  description: "Veritabanındaki Toplam Yetkilendirilmiş Hesap Sayısı",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Toplam Hesap`)
      .setColor(0x7cade2)
      .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Veritabanımda **${await client.tokenCount()}** yetkilendirilmiş hesap mevcut.`)


    await interaction.reply({
        embeds: [embed1]
      })
   
  },
};