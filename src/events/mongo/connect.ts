import { Client } from "discord.js";

const data = {
  name: "connect",
  execute(client: Client): void {
    client.log.info("Connecting to MongoDB...")
  },
};

export = data;