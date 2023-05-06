import { Message, Client, EmbedBuilder } from "discord.js";
import { sleep } from "../../utils/sleep"

const data = {
  name: "messageCreate",
    execute: async (message: Message, client: Client): Promise<void> => {
        // Declaring some variables
        let { commands, prefix } = client;

        // If a bot ran a command
        if (message.author.bot) return;

        // If the command was sent in DM
        if (!message.guild) return;

        // The bot should return when the prefix is not on the first index of the message
        if (message.content.indexOf(prefix as string) !== 0) return;

        // Get the Arguments from the message
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        // Get the commandName out of the message
        let commandName = args[0].toLowerCase();

        // Searching the command to execute it
        const command = commands.get(commandName) || commands.find((x: any) => x.aliases && x.aliases.includes(commandName));

        // If the command does not exists send an error embed
        if (!command) {
            const embed = new EmbedBuilder()
                .setDescription(":x: This command does not exists! Did you mean another command? Type **`/help`** for more information.")
                .setColor(0xff0000)
                .setTimestamp();
            let msg = await message.channel.send({ embeds: [embed] });
            await sleep(15);
            await msg.delete();
            return;
        };

  },
};

export = data;
