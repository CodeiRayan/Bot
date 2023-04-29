import { ActivityType, Client } from "discord.js";
import { config } from "dotenv";
config();

const data = {
  name: "ready",
  once: true,
  async execute(client: Client): Promise<void> {
    // Some basic Logging
    client.log.success(`Logged in as ${client.user!.tag} : ${client.user!.id}`);

    // Setting the Presence for the bot
    client.user!.setPresence({
      activities: [{ name: "with your levels :D", type: ActivityType.Playing }],
    });
  },
};

export = data;
