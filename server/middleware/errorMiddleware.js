

const errorMiddleware = async (err, req, res, next) => {
    console.log(err);

    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID" });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === 11000) {
        return res.status(409).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "Something went wrong" });
}

export default errorMiddleware;