import { Client, Message, ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { checkForLetters, updateBalance } from "../../utils/ecoFuncs";

const data = {
    name: "add",
    description: "Adds to the user coins",
    aliases: [],

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

    async executeRegular(message: Message, client: Client, args: string[]): Promise<void> {
        // Getting the important variables
        const user = message.mentions.users.first();
        const amount: unknown = args[2];

        if (!checkForLetters(amount as string)) {
            const embed = new EmbedBuilder()
                .setDescription(":x: Only numbers are allowed for the amount")
                .setColor(0xff0000);

            await message.reply({ embeds: [embed] })
            return;
        }

        const check = await updateBalance(user.id, message.guild.id, client, amount as number);

        if (!check) {
            await message.reply(":x: ")
            return;
        }

        return;

    }
}

export = data;
