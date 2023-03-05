
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let e = require(`../../database/e`)
module.exports = {
  name: "ping",
  description: "Botun pingini g�ster",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {

    let start = Date.now();

    let embed1 = new discord.EmbedBuilder()
    .setDescription("�uanda yava� �al���yorum")


    await interaction.reply({
        embeds: [embed1]
      })
        let end = Date.now();
 const getDatabasePing = async () => {
            const Now = Date.now();
            await e.find().then(entrys => {})
            return `${~~(Date.now() - Now)}`;
        };

        const DbPing = await getDatabasePing();    

        let embed = new discord.EmbedBuilder()
          .setTitle("Pong!")
     .addFields([
{ name: 'API Gecikmesi', value: `${Math.round(client.ws.ping)}ms` },
{ name: 'Mesaj Gecikmesi', value: `${end - start}ms` },
       { name: 'Veritaban� Gecikmesi', value: `${DbPing}ms` },
])


       interaction.editReply({ embeds: [embed] }).catch((e) => interaction.channel.send(e));
  },
};