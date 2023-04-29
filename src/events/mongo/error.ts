import { Client } from "discord.js";

const data = {
  name: "error",
  execute(error: String, client: Client): void {
    client.log.error(`An error has occured in the database connection:\n${error}`)
  },
};

export = data;