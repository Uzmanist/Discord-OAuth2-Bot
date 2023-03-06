const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
const config = require("../../config.js")
module.exports = {
  name: "çekiliş",
  description: "Bir Çekiliş Ayarla",
  //type: ApplicationCommandType.ChatInput,
  options: [
     {
          name: "süre",
          description: "Çekiliş Süresi",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "kazananlar",
          description: "Kazanan Kişi Sayısı",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "ödül",
          description: "Çekiliş Ödülü",
          type: ApplicationCommandOptionType.String,
       required: true,
      },
      {
          name: "şart",
          description: "Çekiliş Şart(ları)",
          type: ApplicationCommandOptionType.String,
       required: true,
      }
  ],

  
  run: async (client, interaction, args) => {
let requirements = interaction.options.getString(`şart`);
    let prize = interaction.options.getString(`ödül`);
    let winners = interaction.options.getNumber(`kazananlar`);
    
        let duration = interaction.options.getNumber(`süre`);
 
 let embed1 = new discord.EmbedBuilder()
      .setTitle(`🎉 ${prize} Ödüllü **Çekiliş** 🎉`)
      .setDescription(`\n:gift: **Kazanan Sayısı:** \`${winners}\`\n:tada: **Zamanlayıcı**: \`${duration}h\`\n:gift: **Ödül:** \`${prize}\`\n:tada: **Çekiliş Sahibi: ${interaction.user}**\n\n:link: __**Şartlar:**__\n✍️ **${requirements}**\n\nÇekilişe katılmak için **butona** tıklayın!`)
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
      .setLabel("✅ | Katıl")
      .setStyle(ButtonStyle.Link)
      .setURL(`${config.oauth_link}`)
          .setDisabled(false),
      );


    await interaction.reply(
                            {
      
      embeds: [embed1],
      components: [row]

    });
    
  },
};