import mongoose from "mongoose";

const schema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Payment = mongoose.model("Payment", schema);