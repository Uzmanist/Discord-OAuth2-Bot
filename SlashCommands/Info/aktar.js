
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "aktar",
  description: "Hesapları Aktar (Gelişmiş)",
  //type: ApplicationCommandType.ChatInput,
  options: [
     {
          name: "miktar",
          description: "Aktarılacak Üye Miktarı",
          type: ApplicationCommandOptionType.Number,
       required: true,
      },
    {
          name: "sunucu",
          description: "Aktarılacak Sunucu ID'si",
          type: ApplicationCommandOptionType.String,
       required: false,
      },
      {
          name: "kullanıcı",
          description: "Aktarılacak Kulanıcı",
          type: ApplicationCommandOptionType.User,
       required: false,
      }
  ],

  
  run: async (client, interaction, args) => {
let server = interaction.options.getString(`sunucu`) || interaction.guild.id;
    let amount = interaction.options.getNumber(`miktar`);
    
    let user = interaction.options.getUser(`kullanıcı`);
    if(!client.guilds.cache.get(server)) return interaction.reply(`Sunucu ID'sini bulamadım.`)

if(user) {
 return client.manageUserJoin({
     user: user.id,
   amount: amount,
            guild_id: server,
 
        }, interaction, user.id);
    
}
    interaction.reply(`**${amount}** hesap aktarılıyor...`)
  client.manageJoin({
            amount: amount,
            guild_id: server,
        }, interaction);
    
  },
};