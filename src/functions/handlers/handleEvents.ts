import fs from "fs";
import path from "node:path"
import { connection } from "mongoose";

const data = (client: any) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(path.join(__dirname, "../../events"));
    for (const folder of eventFolders) {
      const eventFiles: any = fs
        .readdirSync(path.join(__dirname, `../../events/${folder}`))
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client":
            client.log.info("Initializing client events...");
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args: any) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args: any) =>
                event.execute(...args, client)
              );
          }
          client.log.success("Inititialized client events.")
          break;
        case "mongo":
          client.log.info("Initializing mongo events...");
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              connection.once(event.name, (...args) => {
                eventFiles.execute(...args, client)}
              );
            else
              connection.on(event.name, (...args) => {
                event.execute(...args, client)}
              );
          }
          client.log.success("Inititialized mongo events.")
          break;

        default:
          break;
      }
    }
  };
};

export = data;