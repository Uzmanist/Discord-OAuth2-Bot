
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "aktar",
  description: "Kullan�c�lar� belirtilen sunuculara aktar�n",
  //type: ApplicationCommandType.ChatInput,
  options: [
     {
          name: "miktar",
          description: "Aktar�lacak kullan�c� miktar�",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "server-id",
          description: "Aktar�lacak sunucu id'si",
          type: ApplicationCommandOptionType.String,
       required: false,
      },
      {
          name: "kullan�c�",
          description: "Aktar�lacak kullan�c�",
          type: ApplicationCommandOptionType.User,
       required: false,
      }
  ],

  
  run: async (client, interaction, args) => {
let server = interaction.options.getString(`server-id`) || interaction.guild.id;
    let amount = interaction.options.getNumber(`miktar`);
    
    let user = interaction.options.getUser(`kullan�c�`);
    if(!client.guilds.cache.get(server)) return interaction.reply(`Bu kimli�e sahip bir sunucu bulamad�m.`)

if(user) {
 return client.manageUserJoin({
     user: user.id,
   amount: amount,
            guild_id: server,
 
        }, interaction, user.id);
    
}
    interaction.reply(`**${amount}** �ye aktar�l�yor...`)
  client.manageJoin({
            amount: amount,
            guild_id: server,
        }, interaction);
    
  },
};