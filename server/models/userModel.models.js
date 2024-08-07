import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: true,
    },
    password: {
        type: String,
        unique: false,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;