const discord = require("discord.js");

module.exports = {
  name: "yardım",
  description: "Botun Komutlarını Gösterir",
  default_permission: false,
  timeout: 30000,
  
  run: async (client, interaction, args) => {
    
    const embed = new discord.EmbedBuilder()
    .setTitle(`Yardım Menüsü`)
    .setDescription(`> 🛰️ **Yetkilendirme Komutları**\n\`boşkomut, çekiliş, doğrula, nitro, nsfw\`\n\n> ✨ **Bot Ayarları**\n\`aktar, defol, restart, temizle, yenile, yetkiver\`\n\n> ℹ️ **Bot Bilgileri:**\n\`hesaplar, linkler, ping, uptime, yardım\`\n\n> 🔑 **Bot Prefix:** \`/\`\n**Yetkilendirildikten sonra Uzmanist#7221'in WebSitesi'ne yönlendirilirler!**`)
    .setImage(`https://cdn.discordapp.com/attachments/930806442301214781/1082375741762707506/uzmanistbanner.gif`)    
    .setColor(`#2F3136`)
      .setFooter({ text: `Dev. Uzmanist#7221`})
    await interaction.reply({embeds: [embed]})
  }
}