import { client_id } from "../config.js";


export default (client) => {
	 const fs = require("fs");
    const ascii = require("ascii-table");
const { ActivityType } = require("discord.js");
    let slash = []

    const table = new ascii().setHeading(" Slash Commands", "Load Status");
  
    const commandFolders = fs.readdirSync("./SlashCommands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./SlashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../SlashCommands/${folder}/${file}`);
        if (command.name) {
          client.slash.set(command.name, command);
          slash.push(command)
          table.addRow(file, "✔️");
        } else {
          table.addRow(
            file,
            "❌ => Eksik bir help.name veya help.name dizede değil"
          );
          continue;
        }
      }
      console.log(table.toString());
      console.log(`https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=8&scope=applications.commands%20bot`)
    }
    client.on("ready", async() => {
      await client.application.commands.set(slash)
      client.user.setActivity(`Uzmanist Development`, {
    type: ActivityType.Watching,
  });
    })
  }

