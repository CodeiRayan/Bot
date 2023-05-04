import { Client } from "discord.js";
import economy from "../schemas/economy";

/**
 * This function creates a new user entry in the Database
 * 
 * @param userID  The userID in string format
 * @param guildID The guildID's string
 * @param client  The client snowflake / obj
 * @param balance The balance that should be added on create
 * @param bank    The amount that should be added on create to the bank bal
 * @returns       The created database entry object or if it failed a boolean
 */
export async function create(userID: string, guildID: string, client: Client, balance: number = 1, bank: number = 1): Promise<boolean | object> {
    // Checking if something is less then 0 from balance and bank
    if (balance <= 0 || bank <= 0) return false;
    
    // Check if the user exists in the db or not
    let check = economy.findOne({ userID, guildID });

    if (!check) {
        try {
            // Creating a new entry for the user and saving it
            let check = await economy.create({
                userID: userID,
                guildID: guildID,
                bal: 999 + balance,
                bank: 99 + bank,
            });

            // And now return that shit
            return check;
        } catch (err) {
            // Catching any errors that might come up
            await client.log.error("While trying to create a new Entry in the Database a error occured: " + err)

            // And returning false
            return false;
        }
    }

    // Return if a entry already exists
    return !check;
}

/**
 * This function adds automatically balance to the user "bank" account lol
 * 
 * @param userID       The user ID where the balance should be added
 * @param guildID      The guild ID where the balance should be added to the user in the specific guild
 * @param client       The client object / snowflake
 * @param balance      The balance that should be added
 * @returns            A boolean that indicates if it was successfull or not
 */
export async function updateBalance(userID: string, guildID: string, client: Client, balance: number): Promise<boolean> {
    // Returning if the balance is less then 0
    if (balance <= 0) return false;

    // Checking if the user exists or not and update the coins :D
    let check: object | boolean | undefined = economy.findOneAndUpdate(
        { userID, guildID },
        { $inc: { bal: balance }}
    );

    if (!check) {
        // Creating a new entry for the user using the create function that is above ^^
        check = await create(userID, guildID, client, balance);

        // If the create function returns false, then we will return here false again
        if (!check) return false;
    };

    return true;
}


export async function updateBank(userID: string, guildID: string, client: Client, bank: number): Promise<boolean> {
    // Returning if the bank is less then 0
    if (bank <= 0) return false;

    // Checking if the user exiss or not and update the coins :D
    let check: object | boolean | undefined = economy.findOneAndUpdate(
        { userID, guildID },
        { $inc: { bank: bank } }
    );

    if (!check) {
        // Creating a new entry for the user using the create function that is above ^^
        check = await create(userID, guildID, client, 0, bank);

        // If the create function reuturns false, then we will reutn here false again
        if (!check) return false;
    };

    return true;
}