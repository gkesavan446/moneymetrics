import Transaction from "../models/transactionModel.js";
import mongoose from "mongoose";

export const getReportSummary = async (req, res, next) => {
    try {
        const { from, to } = req.query;

        const match = { userId: new mongoose.Types.ObjectId(req.user.userId) }

        if (from || to) {
            match.date = {};

            if (from) {
                match.date.$gte = new Date(`${from}T00:00:00`);
            }

            if (to) {
                match.date.$lte = new Date(`${to}T23:59:59.999`);
            }
        }

        const summary = await Transaction.aggregate([
            {
                $match: match
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        summary.forEach((item) => {
            if (item._id === "income") {
                totalIncome = item.total
            }
            if (item._id === "expense") {
                totalExpense = item.total
            }
        })

        const expenseCategories = await Transaction.aggregate([
            {
                $match: { ...match, type: "expense" }
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    total: -1
                }
            }
        ]);

        const topExpenseCategory = expenseCategories.length > 0 ? expenseCategories[0]._id : null;

        res.status(200).json({
            totalIncome, totalExpense, balance: totalIncome - totalExpense,
            topExpenseCategory, expenseCategories
        });

    } catch (error) {
        next(error)
    }
};