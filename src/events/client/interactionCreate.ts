import { InteractionType, Client, Interaction } from "discord.js";

const data = {
  name: "interactionCreate",
  async execute(interaction: Interaction, client: Client) {
    // If normal slash command execute the normal slash command
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        client.log.error(err);
        await interaction.reply({
          content: `Something went wrong while executing this command...`,
          ephemeral: true,
        });
      }
    } else if (
      interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
      // Execute the Autocomplete function
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        client.log.error(err);
      }
    } else if (interaction.isContextMenuCommand()) {
      // Execute the Context Menu Command
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (err) {
        client.log.error(err);
      }
    }
  },
};

export = data;
