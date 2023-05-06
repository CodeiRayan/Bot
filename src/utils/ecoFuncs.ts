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
};

/**
 * This function adds to the users Bank account
 * 
 * @param userID       The user's ID
 * @param guildID      The guild's ID
 * @param client       The client object / snowflake
 * @param bank         The amount to add on the bank
 * @returns            True or false
 */
export async function updateBank(userID: string, guildID: string, client: Client, bank: number): Promise<boolean> {
    // Returning if the bank is less then 0
    if (bank <= 0) return false;

    // Checking if the user exists or not and update the coins :D
    let check: object | boolean | undefined = economy.findOneAndUpdate(
        { userID, guildID },
        { $inc: { bank: bank } }
    );

    if (!check) {
        // Creating a new entry for the user using the create function that is above ^^
        check = await create(userID, guildID, client, 1, bank);

        // If the create function returns false, then we will return here false again
        if (!check) return false;
    };

    return true;
};

/**
 * This function handles to remove Balance from a user
 * 
 * @param userID       The user's ID
 * @param guildID      The guild's ID
 * @param client       The client object / snowflake
 * @param balance      The balance to remove
 * @returns            True or false
 */
export async function updateBalanceMinus(userID: string, guildID: string, client: Client, balance: number): Promise<boolean> {
    // Returning if the balance is less then 1
    if (balance <= 1) return false;

    // Checking if the user exists or not and update the coins :D
    let check: object | boolean | undefined = economy.findOneAndUpdate(
        { userID, guildID },
        { $inc: { bal: -balance } }
    );

    if (!check) {
        // Creating a new entry for the user using the create function that is above ^^
        check = await create(userID, guildID, client, 1);

        // If the create function returns false, then we will return here false again
        if (!check) return false;
    };

    return true;
};

/**
 * This function checks if a string contains any letters
 * 
 * @param str   The string to test for
 * @returns     Returns true or false
 */
export function checkForLetters(str: string): boolean {
    // Setting up the regexp
    const re = /^[0-9]+$/;

    // Testing
    return re.test(str);
};