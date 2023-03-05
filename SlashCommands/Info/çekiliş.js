const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
const config = require("../../config.js")
module.exports = {
  name: "çekiliş",
  description: "Çekiliş Komutu",
  //type: ApplicationCommandType.ChatInput,
  options: [
     {
          name: "Süre",
          description: "Çekiliş Süresü",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "kazanan",
          description: "Kazanan Sayısı Belirle",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "ödül",
          description: "Ödülü Belirle",
          type: ApplicationCommandOptionType.String,
       required: true,
      },
      {
          name: "şartlar",
          description: "Çekilişe Şart Ekle",
          type: ApplicationCommandOptionType.String,
       required: true,
      }
  ],

  
  run: async (client, interaction, args) => {
let requirements = interaction.options.getString(`requirements`);
    let prize = interaction.options.getString(`prize`);
    let winners = interaction.options.getNumber(`winners`);
    
        let duration = interaction.options.getNumber(`duration`);
 
 let embed1 = new discord.EmbedBuilder()
      .setTitle(`🎉 **Giveaway** for ${prize} 🎉`)
      .setDescription(`\n:gift: **WINNERS:** \`${winners}\`\n:tada: **TIMER**: \`${duration}h\`\n:gift: **PRIZE:** \`${prize}\`\n:tada: **HOSTED BY: ${interaction.user}**\n\n:link: __**Requirements:**__\n:link: **${requirements}**\n\nTo enter the giveaway click on the enter button.`)
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
      .setLabel("Enter")
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