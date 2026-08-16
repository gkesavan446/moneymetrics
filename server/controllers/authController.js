import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPassword })

        res.status(201).json({
            message: "Account created successfully",
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login Successful",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        next(error)
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password -resetOtp -resetOtpExpires")

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })

    res.status(200).json({ message: "Logout Successful" });
};

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedOtp = await bcrypt.hash(otp, 10);

        user.resetOtp = hashedOtp
        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000)

        await user.save();

        await sendEmail(email, "Money Metrics - Password Reset OTP", `Your password reset OTP is ${otp}. It will expire in 10 minutes.`)

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Email, OTP and new password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.resetOtp || !user.resetOtpExpires) {
            return res.status(400).json({ message: "OTP not found" });
        }

        if (user.resetOtpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const isOtpValid = await bcrypt.compare(otp, user.resetOtp);

        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = null;
        user.resetOtpExpires = null;

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        next(error);
    }
}







// export const testEmail = async (req, res, next) => {
//     try {
//         await sendEmail(
//             process.env.EMAIL_USER,
//             "Money Metrics Test Email",
//             "Nodemailer is working successfully!"
//         );

//         res.status(200).json({
//             message: "Test email sent successfully"
//         });
//     } catch (error) {
//         next(error);
//     }
// };


