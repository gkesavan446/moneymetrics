import Transaction from '../models/transactionModel.js'


export const createTransaction = async (req, res, next) => {
    try {
        const { type, category, amount, description, date } = req.body;

        if (!type || !category || !amount || !description || !date) {
            return res.status(400).json({ message: "All transaction fields are required" });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        const transaction = await Transaction.create({
            userId: req.user.userId,
            type, category, amount, description, date
        });

        res.status(201).json({ message: "Transaction created successfully", transaction });
    } catch (error) {
        next(error)
    }
};

export const getTransactions = async (req, res, next) => {
    try {

        const { page = 1, limit = 10, sort = "latest", type, category, search, from, to } = req.query

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({ message: "Page and limit must be greater than 0" });
        }

        const filter = {
            userId: req.user.userId
        };

        if (type) {
            if (!["income", "expense"].includes(type)) {
                return res.status(400).json({ message: "Invalid transaction type" });
            }
            filter.type = type;
        }

        if (category) {
            filter.category = { $regex: `^${category}$`, $options: "i" };
        }

        // if (search) {
        //     filter.description = { $regex: search, $options: "i" };
        // }

        if (search) {
            query.$or = [
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        if (from || to) {
            filter.date = {};

            if (from) {
                filter.date.$gte = new Date(`${from}T00:00:00`);
            }

            if (to) {
                filter.date.$lte = new Date(`${to}T23:59:59.999`);
            }
        }

        const skip = (pageNumber - 1) * limitNumber;

        const sortOption = sort === "oldest" ? { date: 1 } : { date: -1 };

        const transactions = await Transaction.find(filter)
            .sort(sortOption).skip(skip).limit(limitNumber)

        const totalTransactions = await Transaction.countDocuments(filter);

        const totalPages = Math.ceil(totalTransactions / limitNumber)

        res.status(200).json({
            transactions,
            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalTransactions,
                totalPages
            }
        });

    } catch (error) {
        next(error)
    }
}

export const updateTransaction = async (req, res, next) => {

    try {
        const { id } = req.params
        const { type, category, amount, description, date } = req.body;

        if (!type || !category || !amount || !description || !date) {
            return res.status(400).json({ message: "All transaction fields are required" });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Invalid transaction type" });

        }

        if (Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        const transaction = await Transaction.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { type, category, amount, description, date },
            { returnDocument: "after", runValidators: true }
        )

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", transaction })

    } catch (error) {
        next(error)
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params

        const transaction = await Transaction.findOneAndDelete({ _id: id, userId: req.user.userId });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });

    } catch (error) {
        next(error)
    }
}


// export const getTransactions = async (req, res, next) => {
//     try {

//         const { page = 1, limit = 10, sort = "latest" } = req.query

//         const pageNumber = Number(page);
//         const limitNumber = Number(limit);

//         if (pageNumber < 1 || limitNumber < 1) {
//             return res.status(400).json({ message: "Page and limit must be greater than 0" });
//         }

//         const skip = (pageNumber - 1) * limitNumber;

//         const sortOption = sort === "oldest" ? { date: 1 } : { date: -1 };

//         const transactions = await Transaction.find({ userId: req.user.userId })
//             .sort(sortOption).skip(skip).limit(limitNumber)

//         const totalTransactions = await Transaction.countDocuments({ userId: req.user.userId });

//         const totalPages = Math.ceil(totalTransactions / limitNumber)

//         res.status(200).json({
//             transactions,
//             pagination: {
//                 currentPage: pageNumber,
//                 limit: limitNumber,
//                 totalTransactions,
//                 totalPages
//             }
//         });

//     } catch (error) {
//         next(error)
//     }
// }

