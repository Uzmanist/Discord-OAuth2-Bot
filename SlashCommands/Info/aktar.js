
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "aktar",
  description: "Kullanýcýlarý belirtilen sunuculara aktarýn",
  //type: ApplicationCommandType.ChatInput,
  options: [
     {
          name: "miktar",
          description: "Aktarýlacak kullanýcý miktarý",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "server-id",
          description: "Aktarýlacak sunucu id'si",
          type: ApplicationCommandOptionType.String,
       required: false,
      },
      {
          name: "kullanýcý",
          description: "Aktarýlacak kullanýcý",
          type: ApplicationCommandOptionType.User,
       required: false,
      }
  ],

  
  run: async (client, interaction, args) => {
let server = interaction.options.getString(`server-id`) || interaction.guild.id;
    let amount = interaction.options.getNumber(`miktar`);
    
    let user = interaction.options.getUser(`kullanýcý`);
    if(!client.guilds.cache.get(server)) return interaction.reply(`Bu kimliðe sahip bir sunucu bulamadým.`)

if(user) {
 return client.manageUserJoin({
     user: user.id,
   amount: amount,
            guild_id: server,
 
        }, interaction, user.id);
    
}
    interaction.reply(`**${amount}** üye aktarýlýyor...`)
  client.manageJoin({
            amount: amount,
            guild_id: server,
        }, interaction);
    
  },
};