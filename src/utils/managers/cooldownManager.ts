import { Collection, Message, Client, EmbedBuilder } from "discord.js"

/**
 * Looks if someone is on cooldown or not
 * @param command     The command
 * @param message     The message object / snowflake
 * @param client      The client object / snowflake
 * @return {boolean}  True if there is a cooldown for that user, false otherwise
 * 
 * @todo              ADD EMBED to make it look nicer
 */
export async function checkCooldown(command: { data: { name: string; }; cooldown: number; }, message: Message, client: Client): Promise<boolean> {
    // Getting all the cooldowns
    const { cooldowns } = client;

    // Checking if there is no entry for that command
    if (!cooldowns.has(command.data.name)) {
        // And creating a new one
        cooldowns.set(command.data.name, new Collection());
    }

    // Getting the current Data
    const now = Date.now();

    // Getting the timestamps
    const timestamps = cooldowns.get(command.data.name);

    // Setting the default cooldonw Duration
    const defaultCooldownDuration = 1;

    // Calculating the default cooldown Amount
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    // Checking if the timestamp collection has the user in it
    if (timestamps.has(message.author.id)) {
        // Getting the expiration time from the timestamp collection
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        // Checking if the current time is lower than the expiration time
        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);

            const embed = new EmbedBuilder()
                .setDescription(`:x: Please wait <t:${expiredTimestamp}:R> more second(s) before reusing the \`${command.data.name}\` command.`)
                .setColor(0xff0000)
                .setTimestamp()

            await message.reply({ embeds: [embed] })
            return true;
        }
    }

    // Else setting the cooldown
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    return false;
}