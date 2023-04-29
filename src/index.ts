import Cluster from "discord-hybrid-sharding";
import { config } from "dotenv";
import Logger, { LoggerType } from "./utils/Logger";
config()

// Defining the managerLogger
const managerLogger = new Logger(LoggerType.Manager)

// Checking if the TOKEn is not specified 
if (!process.env.TOKEN) {
    managerLogger.fatal("No TOKEN enviroment variable found / set.")
    process.exit(0)
}

const manager = new Cluster.Manager(`${__dirname}/Bot.js`, {
    token: process.env.TOKEN,
    mode: "process",
    totalClusters: 1
})

// Add the heartbeatManager to the cluster
manager.extend(
    new Cluster.HeartbeatManager({
        interval: 2000, // Interval to send a heartbeat
        maxMissedHeartbeats: 5, // Maximum amount of missed Heartbeats until Cluster will get respawned
    })
)

// some events
manager.on('clusterCreate', cluster => managerLogger.info(`Launched Cluster ${cluster.id}`));
manager.on('debug', async (...args) => {
    try {
        managerLogger.debug(args.shift()!, ...args)
    } catch (e) {
        managerLogger.warn("Failed to log debug information.", e)
    }
});

// spawn the cluster / manager
manager.spawn({ timeout: -1 });