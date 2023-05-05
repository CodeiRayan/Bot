import { Client, Message, ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from "discord.js";

const data = {
    name: "add",
    description: "Adds to the user coins",

    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Adds to the specific member coins")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addUserOption((options) => options.setName("member").setDescription("The member to add the coins").setRequired(true))
        .addIntegerOption((options) => options.setName("amount").setDescription("The amount of coins to add").setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction, client: Client): Promise<void> {
        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true,
        });
    },

    async executeRegular(message: Message, client: Client): Promise<void> {
        
    }
}

export = data;