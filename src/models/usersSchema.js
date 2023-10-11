import mongoose from "mongoose";

export const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    account: {
        type: Object,
        default: {
            confirmed: false,
            code: "0000",
            expireCode: Date.now + 1,
            admin: false            
        }
    },
});