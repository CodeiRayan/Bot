import { Client } from "discord.js";

const data = {
  name: "disconnect",
  execute(client: Client): void {
    client.log.warn("Disconnected from MongoDB")
  },
};

export = data;