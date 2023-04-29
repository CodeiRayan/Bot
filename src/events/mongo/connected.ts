import { Client } from "discord.js";

const data = {
  name: "connected",
  execute(client: Client): void {
    client.log.success("Successfully connected to the Database");
  },
};

export = data;