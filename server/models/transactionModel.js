import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum: ['income', 'expense'],
            required: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0.01
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

transactionSchema.index({ userId: 1, date: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;