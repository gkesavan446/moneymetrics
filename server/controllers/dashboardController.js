import Transaction from '../models/transactionModel.js'
import mongoose from "mongoose";

export const getDashboardSummary = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const summary = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ])

        let totalIncome = 0;
        let totalExpense = 0;

        summary.forEach((item) => {
            if (item._id == "income") {
                totalIncome = item.total;
            }

            if (item._id == "expense") {
                totalExpense = item.total;
            }
        })

        const balance = totalIncome - totalExpense;

        const totalTransactions = await Transaction.countDocuments({ userId })

        res.status(200).json({ totalExpense, totalIncome, balance, totalTransactions })

    } catch (error) {
        next(error)
    }
}

export const getMonthlySummary = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const monthlySummary = await Transaction.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        type: "$type"
                    },
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ])

        const result = [];

        monthlySummary.forEach((item) => {
            const year = item._id.year;
            const month = item._id.month;
            const type = item._id.type;

            let existingMonth = result.find(
                (item) =>
                    item.year === year &&
                    item.month === month
            );

            if (!existingMonth) {
                existingMonth = { year, month, income: 0, expense: 0 };
                result.push(existingMonth);
            }

            if (type === "income") {
                existingMonth.income = item.total;
            }

            if (type === "expense") {
                existingMonth.expense = item.total;
            }
        });

        res.status(200).json({ monthlySummary: result });
    } catch (error) {
        next(error)
    }
}

export const getExpenseByCategory = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const expenseByCategory = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    type: "expense"
                }
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
        ])

        const result = expenseByCategory.map((item) => ({
            category: item._id,
            total: item.total
        }))

        res.status(200).json({ expenseByCategory: result });

    } catch (error) {
        next(error)
    }
}

