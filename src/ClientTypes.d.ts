import { Collection } from "discord.js";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>
        prefix: String
        cooldowns: Collection<unknown, any>
        commandArray: Array<any>
        handleEvents: Function
        handleCommands: Function
        handleComponents: Function
        log: any
    }
}