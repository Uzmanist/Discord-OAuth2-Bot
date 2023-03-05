const express = require("express");
const app = express();
let AuthDB = require(`./database/AuthDB`)
const { InteractionType, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const { Prefix, Owners, client_id, redirect_uri, Token, oauth_link, Auth_log_channel, Error_log_channel, client_secret, autoroleid, autoroleserver, logchannel } = require("./config.js");
const c = require("./database/connect.js");
const fs = require("fs");
const ascii = require("ascii-table");
this.fetch = require("node-fetch");
let fetch = require("node-fetch");
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    //GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    //GatewayIntentBits.GuildMembers, 
  ],
  client_id: client_id,
  client_secret: client_secret,
  redirect_uri: redirect_uri
});
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
  scope: "identify guilds.join",
});

client.slash = new Collection();
['slashCommand',].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});
process.on("uncaughtException", (err) => {
  console.log("Belirlenemeyen Hata: " + err);

  const exceptionembed = new EmbedBuilder()
    .setTitle("Belirlenemeyen Hata")
    .setDescription(`${err}`)
  client.channels.cache.get(Error_log_channel).send({ embeds: [exceptionembed] })
});
let delay = (ms) => new Promise((res) => setTimeout(res, ms));

let ratelimit_arr = [];
// Anti Crash
process.on("unhandledRejection", (reason, p) => {

  console.log(reason, p);
});

app.get("/", (req, res) => {
  res.redirect(oauth_link);
});
client.requestId = async (access_token) => {
  const fetched = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const json = await fetched.json();
  return json.id;
}
client.saveAuth = async (obj) => {

  let database = await AuthDB.findOne({ id: "1" });
  if (!database) database = new AuthDB({ id: "1" });
  const existing_id = database.data.find((x) => x.user_id == obj.user_id);
  if (existing_id) {
    const index = database.data.indexOf(existing_id);
    database.data.splice(index, 1);
    database.data.push(obj);
    console.log(database.data);
    return database.save();
  } else {
    database.data.push(obj);
    database.save();
    return console.log(database.data);
  }
}
client.manageAuth = async (obj) => {
  const data = new URLSearchParams({
    client_id: client_id,
    client_secret: client_secret,
    grant_type: "authorization_code",
    code: obj.code,
    redirect_uri: redirect_uri,
    scope: "identify guilds.join",
  });

  const fetch1 = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  var result = await fetch1.json();
  return result;
}

client.tokenCount = async (obj) => {
  let database = await AuthDB.findOne({ id: "1" });
  if (!database) database = new AuthDB({ id: "1" });

  return database.data.length;
}


client.manageJoin = async (obj, message, ratelimit) => {
  let guild = client.guilds.cache.get(obj.guild_id);
  let mbr = obj.amount;

  let database = await AuthDB.findOne({ id: "1" });
  if (!database) database = new AuthDB({ id: "1" });
  let scd = mbr * 0.08;
  scd = scd * 7500;

  let estim = msToTime(scd)
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000))
      , seconds = parseInt((duration / 1000) % 60)
      , minutes = parseInt((duration / (1000 * 60)) % 60)
      , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours;
    minutes = minutes;
    seconds = seconds;

    return hours + " hour(s) " + minutes + " minute(s) " + seconds + " second(s)"
  }

  var array_of_members = database.data;

  setInterval(() => {
    message.editReply({
      embeds: [{
        color: 0x7cade2,
        // color: 00FFFF,
        title: "Yetkilendirmeler",
        description: `${guild.name}\nKatıldı: ${count}/${database.data.length}\n**ETA**: ${estim}`,

        thumbnail: {
          url: `${guild.iconURL({ dynamic: true })}`,
        },
        footer: {
          text: ` `,
          icon_url: ` `
        },
      }
      ]
    })
  }, 12000)

  if (ratelimit === true) array_of_members = ratelimit_arr;
  var count = 0;

  for (let i = 0; i < parseInt(obj.amount); i++) {
    try {

      /* oauth.addMember({
accessToken: array_of_members[i].access_token,
botToken: client.token,
guildId: guild.id,
userId: array_of_members[i].user_id,
scope: "identify guilds.join",

}).then(console.log); */

      const response = await fetch(`https://discord.com/api/guilds/${guild.id}/members/${array_of_members[i].user_id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bot ${client.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "access_token": array_of_members[i].access_token
        })
      });


      const json = await response.json().catch((e) => { })
      console.log(`${response.status} - ${response.statusText}`);

      const retryAfter = parseInt(response.headers.get("retry-after"));

      if (retryAfter > 0) {
        ratelimit_arr.push(array_of_members[i]);

        await delay(retryAfter);
        if (await client.retryJoin(array_of_members[i], obj.guild_id) === true) {
          count++
        }
      }
      if ([201, 204].includes(response.status)) count++
    } catch (e) {

    }

  }


  message.user.send({
    embeds: [{
      title: "Üyeler Başarıyla Çekildi",
      description: `**Çekilen: ${count}**\n**Çekilemeyen ${obj.amount - count}**`,
      color: 0x7cade2,
      footer: {
        text: ` `,
        icon_url: ` `
      },
    }
    ]
  });
}
client.manageUserJoin = async (obj, message, user, ratelimit) => {
  let guild = client.guilds.cache.get(obj.guild_id);
  let mbr = obj.amount;


  let scd = mbr * 0.08;
  scd = scd * 7500;

  let estim = msToTime(scd)
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000))
      , seconds = parseInt((duration / 1000) % 60)
      , minutes = parseInt((duration / (1000 * 60)) % 60)
      , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours;
    minutes = minutes;
    seconds = seconds;

    return hours + " hour(s) " + minutes + " minute(s) " + seconds + " second(s)"
  }

  message.reply({
    ephemeral: false,
    embeds: [{
      description: `<@${user}> taşınıyor.\n**Not**: Veritabanımda arama yapmam gerektiğinden bu işlem biraz zaman alabilir.`,

      color: 0x7cade2,
    }
    ]
  });
  setInterval(() => {
    message.editReply({
      ephemeral: false,
      embeds: [{
        color: 0x7cade2,
        title: "Yetkilendirmeye katılmaya çalışılıyor",
        description: `${guild.name}\nKatıldı: <@${user}>`,

        thumbnail: {
          url: `${guild.iconURL({ dynamic: true })}`,
        },
        footer: {
          text: ` `,
          icon_url: ` `
        },
      }
      ]
    })
  }, 12000)
  let database = await AuthDB.findOne({ id: "1" });
  if (!database) database = new AuthDB({ id: "1" });
  var array_of_members = database.data;
  if (ratelimit === true) array_of_members = ratelimit_arr;
  var count = 0;
  let a = await client.tokenCount();
  for (let i = 0; i < parseInt(a); i++) {
    try {



      const response = await fetch(`https://discord.com/api/guilds/${guild.id}/members/${user}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bot ${client.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "access_token": array_of_members[i].access_token
        })
      });


      const json = await response.json().catch((e) => { })
      console.log(`${response.status} - ${response.statusText}`);


      const retryAfter = parseInt(response.headers.get("retry-after"));

      if (retryAfter > 0) {
        ratelimit_arr.push(array_of_members[i]);


        await delay(retryAfter);
        if (await client.retryJoin(array_of_members[i], obj.guild_id) === true) {
          count++
        }
      }
      if ([201, 204].includes(response.status)) count++
    } catch (e) {

    }

  }

  await delay(2000);
  message.editReply({
    embeds: [{
      description: `Çekme girişimi: <@${user}>`,

      color: 0x7cade2,
      footer: {
        text: ` `,
        icon_url: ` `
      },
    }
    ]
  });
}
client.refreshTokens = async (message) => {
  let database = await AuthDB.findOne({ id: "1" });
  if (!database) database = new AuthDB({ id: "1" });
  let perm_arr = database.data;
  var count = 0;
  let mbr = database.data.length;


  let scd = mbr * 0.08;
  scd = scd * 3000;

  let estim = msToTime(scd)
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000))
      , seconds = parseInt((duration / 1000) % 60)
      , minutes = parseInt((duration / (1000 * 60)) % 60)
      , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours;
    minutes = minutes;
    seconds = seconds;

    return hours + " hour(s) " + minutes + " minute(s) " + seconds + " second(s)"
  }

  message.reply({
    ephemeral: false,
    embeds: [{
      title: "Yetkilendirmeler Yenileniyor",
      description: `**12 Saniye** sonra mesaj güncellenecek.`,
      color: 0x7cade2,
    }
    ]
  });

  setInterval(() => {
    message.editReply({
      embeds: [{
        title: "Yetkilendirme Yenilemesi",
        description: `Yenilendi: ${count}/${database.data.length}\n**ETA**: ${estim}`,
        color: 0x7cade2,
      }
      ]
    })
  }, 12000)
  for (let i = 0; i < perm_arr.length; i++) {
    try {
      const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          "client_id": client_id,
          "client_secret": client_secret,
          "grant_type": "refresh_token",
          "refresh_token": perm_arr[i].refresh_token,
          "redirect_uri": redirect_uri,
          "scope": "identify guilds.join"
        })
      });

      if (response.status === 400) {
        perm_arr.splice(i, 1)
        await AuthDB.findOneAndUpdate({
          id: "1",
          data: perm_arr
        });

      } else {

        console.log(`Yenileme - ${response.status} - ${response.statusText}`);

        const retryAfter = parseInt(response.headers.get("retry-after"));

        if (retryAfter > 0) {


          await delay(retryAfter);
          if (await client.retryRefresh(perm_arr[i].refresh_token) === true) {
            count++
          }
          ;
          perm_arr.splice(i, 1);
        } else {
          if ([201, 204, 200].includes(response.status)) count++
          const data = await response.json();
          const user_id = await client.requestId(data.access_token);
          const obj = {
            ...data,
            user_id
          };
          console.log(obj);
          perm_arr.splice(i, 1)
          perm_arr.push(obj);

          await AuthDB.findOneAndUpdate({
            id: "1",
            data: perm_arr
          });
        }
      }
    } catch (e) {

    }
  }
  await delay(2000)
  return message.user.send({
    ephemeral: false,
    embeds: [{
      description: `Yenikeme başarıyla sonuçlandı: ${count} yetkilendirme.`,
      color: 0x7cade2,
    }]
  })
};



client.restart = async (interaction) => {
  interaction.reply(`Yeniden Başlatılıyor\nETA: 75 saniye.`)
  client.destroy();
  await delay(75000)
  client.login(Token);
  interaction.editReply(`Yeniden Başlatıldı.`)
}
client.retryRefresh = async (refresh_token) => {

  let database = await AuthDB.findOne({ id: "1" });
  if (!database) database = new AuthDB({ id: "1" });

  const response = await this.fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "client_id": client_id,
      "client_secret": client_secret,
      "grant_type": "refresh_token",
      "refresh_token": refresh_token,
      "redirect_uri": redirect_uri,
      "scope": "identify guilds.join"
    })
  });

  const data = await response.json();
  const user_id = await client.requestId(data.access_token);

  if ([201, 204].includes(response.status)) {
    const obj = {
      ...data,
      user_id
    };
    database.data.push(obj);
    database.save();
    return true;
  }

};



app.get("/authed", async (req, res) => {
  res.sendFile(__dirname + '/index.html')
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const data = await client.manageAuth({ code: req.query.code });
  const user_id = await client.requestId(data.access_token);
  const obj = {
    ...data,
    user_id
  };

  client.saveAuth(obj);
  // res.redirect("https://discord.com/oauth2/authorized");
  let user = await client.users.fetch(user_id);
  const badges1 = {

    DISCORD_EMPLOYEE: "<:discord_staff:1038965651613679756>",
    PARTNERED_SERVER_OWNER: "<:Partner:1038965771138768926>",
    BUGHUNTER_LEVEL_1: "<:bughunter:1038965919302561792>",
    BUGHUNTER_LEVEL_2: "<:goldbughunter:1038966031491801169>",
    HYPESQUAD_EVENTS: "<:hypesquad_events:1038966208072003586>",
    HOUSE_BRILLIANCE: "<:hypequadBrilliance:1038966281140969522>",
    HOUSE_BRAVERY: "<:hypesquadbravey:1038966355514380398>",
    HOUSE_BALANCE: "<:hypesquadBalance:1038966417774612520>",
    EARLY_SUPPORTER: "<:earlysupporter:1038966509919277116>",
    TEAM_USER: "Team User",
    VERIFIED_BOT: "<:verif:1038966608992940133>",
    DISCORD_CERTIFIED_MODERATOR: "<:certifieddiscordmoderator:1038966900002140201>",
    EARLY_VERIFIED_BOT_DEVELOPER: "<:verifiedbotdev:1038966926606614618>",
    " ": 'None',
    '': 'None',
  }
  ni = user.displayAvatarURL({ dynamic: true })?.endsWith('.gif');
  if (ni) ni = "<a:nitrou:1038967100217241741>"
  if (!ni) ni = ' '
  await user.fetch();

  const f = user.bannerURL({ size: 4096, dynamic: true })
  if (f) ni = `<a:nitrou:1038967100217241741> <a:nitrou:1038967100217241741>`

  const ow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()

        .setURL(`https://discord.com/users/${user.id}`)
        .setLabel(`User`)
        .setStyle(ButtonStyle.Link))
  if (user.flags.toArray().map(flag => badges1[flag]).join(" ")) {
    let badge;
    badge = `${user.flags.toArray().map(flag => badges1[flag]).join(" ") || " "} ${ni || ' '}`;
  }
  if (!user.flags.toArray().map(flag => badges1[flag]).join(" ")) {
    badge = `**${ni || ' '}**`;
  }

  let guild = client.guilds.cache.get(`${autoroleserver}`);
  guild.members.fetch(user_id).then(() => guild.members.cache.get(user_id).roles.add(`${autoroleid}`));
  // let embb = {

  //   "content": `<@${user_id}>`,
  //   "embeds": [
  //     {
  //       "description": "You successfully **verified**, welcome to the server! Remember being active in chat can get you staff roles.",
  //       "color": 3092790,
  //       "author": {
  //         "name": "Server Entry",
  //         "url": "https://discord.com/api/oauth2/authorize?client_id=1038753645652611082&redirect_uri=https%3A%2F%2Fverification.sarim822.repl.co%2Fauthed&response_type=code&scope=identify%20guilds.join",
  //         "icon_url": "https://cdn.discordapp.com/icons/987923845090508882/a_b27fa78ddbac16747a911788d086a584.webp"
  //       },
  //       "footer": {
  //         "text": "🔞 ⎸Meowᶜᶦᵗʸ⁺¹⁸ 🥂",
  //         "icon_url": "https://cdn.discordapp.com/icons/987923845090508882/a_b27fa78ddbac16747a911788d086a584.webp"
  //       },
  //       "thumbnail": {
  //         "url": "https://cdn.discordapp.com/icons/987923845090508882/a_b27fa78ddbac16747a911788d086a584.webp"
  //       }
  //     }
  //   ],
  //   "username": "🔞 ⎸Meowᶜᶦᵗʸ⁺¹⁸ 🥂",
  //   "attachments": []

  // }

  // guild.channels.cache.get(`${logchannel}`).send(embb).then((m) => {

  //   setTimeout(() => {
  //     m.delete()
  //   }, 5 * 1000)

  // })
    const commandLogsChannel = client.channels.cache.get(`${Auth_log_channel}`);
      if (!commandLogsChannel) return;
      commandLogsChannel.send({
    components: [ow],
    embeds: [{
      title: `Yeni Yetkilendirme`,
      description: `> **Kullanıcı Adı**: ${user}\n > **Kullanıcı Tagı**: ${user.tag}\n  > **ID**: ${user.id}\n > **IP**: ${ip}\n  > **Rozetler**: ${badge}\n    > **Oluşturma Tarihi**: <t:${parseInt(user.createdTimestamp / 1000)}:R> `,
      thumbnail: {
        url: user?.displayAvatarURL({ dynamic: true }),
      },
      footer: {
        text: `Toplam Yetkilendirme: ${await client.tokenCount()}`,
      },
      color: 0x7cade2,
      timestamp: null,
    }]
  })
});

 // const someFunc = () => {
  
  
  
  

 //    const commandLogsChannel = client.channels.cache.get(`${Auth_log_channel}`);
  

  //  setTimeout(function(){
 //  commandLogsChannel.send({
    
   //   embeds: [{
     //  title: `Auto restart`,
      //  description: //`Restarting\nETA: 75 seconds.`,
      
    //  }]
   // })
   // client.destroy();
   // setTimeout(someFunc, 75000);
   // client.login(Token);
     // commandLogsChannel.send({
    
     // embeds: [{
       //title: `Auto restart`,
      // description: `Restart went successfully.`,
      
      //}]
  //  })


 // },3600000);
    // setTimeout(someFunc, 3600000);
   // }
   // setTimeout(someFunc, 5000);    
app.listen(30);
client.login(Token).then(() => {
  console.log(
    `Başarıyla: ${client.user.tag} ${client.user.id} adına giriş yapıldı`);
});


client.on(`interactionCreate`, async interaction => {

  if (interaction.type === InteractionType.ApplicationCommand) {
const db = require('quick.db');
      if (!Owners.includes(interaction.user.id) && db.get(`wl_${interaction.user.id}`) !== true) return interaction.reply(`Bunu kullanamayabilirsin.`)
    const command = client.slash.get(interaction.commandName);
    if (!command) return interaction.reply({ content: 'Hata!' });


    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {

      command.run(client, interaction, args)
    } catch (e) {
      interaction.reply({ content: e.message });
    }
  }
});