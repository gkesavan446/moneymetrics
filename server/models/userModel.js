import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        },
        resetOtp: {
            type: String,
            default: null
        },
        resetOtpExpires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

export default User;