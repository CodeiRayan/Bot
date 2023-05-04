import mongoose from "mongoose"

export interface Ieconomy {
    guildID: string;
    userID: string;
    bal: number;
    bank: number;

}

const eco = new mongoose.Schema<Ieconomy>({
    guildID: String,
    userID: String,
    bal: Number,
    bank: Number
})

export default mongoose.model("Economy", eco, "eco")