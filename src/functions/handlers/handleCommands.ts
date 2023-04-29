import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import path from "node:path";
import { Routes } from "discord-api-types/v10";
import fs from "fs";
config()

const data = (client: Client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(path.join(__dirname, "../../commands"));
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(path.join(__dirname, `../../commands/${folder}`))
        .filter((file) => file.endsWith(".js"));
      try {
        const { commands, commandArray } = client;
        for (const file of commandFiles) {
          const command = require(path.join(__dirname, `../../commands/${folder}/${file}`));
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          
          // Logging
          client.log.info(`Command: ${command.data.name} has been registered in the handler.`)
        }
      } catch (error) {
        client.log.error(`Error while loading a command:\n\n ${error}`)
      }
      /*
      const clientId = process.env.ID || "955100922890051604";
      const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);
      try {
        client.log.info("Started refreshing application (/) commands.")

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandArray,
        });
        client.log.success("Successfully reloaded application (/) commands.")
      } catch (error) {
        // Catching any errors
        client.log.error(error)
      } */
    }
  };
};

export = data;