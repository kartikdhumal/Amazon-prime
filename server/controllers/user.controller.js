import User from '../models/userModel.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import 'dotenv/config';

export const registerUser = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = new User(req.body);
        const userData = await user.save();
        const userId = user._id;
        const token = jwt.sign(
            { email: user.email, id: userId, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        res.status(201).send({ userData, userId, token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ error: 'Server error: Something went wrong' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: "User doesn't exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send({ error: 'Incorrect password' });
        }

        const { _id: userId, isAdmin, name } = user;
        const token = jwt.sign(
            { email: user.email, id: userId, name },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        res.status(200).send({ message: 'User logged in successfully', success: true, email: user.email, userId, isAdmin, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'Server error: Something went wrong' });
    }
};

export const sendUsers = async (req, res) => {
    try {
        const user = new User(req.body);
        const userData = await user.save();
        res.status(201).send(userData);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Server error: Unable to create user' });
    }
};

export const findUser = async (req, res) => {
    try {
        const userData = await User.find().sort({ _id: -1 }).exec();
        res.status(200).send(userData);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Server error: Unable to fetch users' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await User.findByIdAndDelete(id);

        if (!userData) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(userData);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ error: 'Server error: Unable to delete user' });
    }
};

export const fetcheditprofile = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid ID' });
    }

    try {
        const data = await User.findById(id);

        if (!data) {
            return res.status(404).send({ error: 'Data not found' });
        }

        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send({ error: 'Server error: Unable to fetch profile' });
    }
};

export const Logout = async (req, res) => {
    res.status(200).send({ message: 'User logged out successfully' });
};

export const EditProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedData) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(updatedData);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send({ error: 'Server error: Unable to update profile' });
    }
};

export const CountAdminUsers = async (req, res) => {
    try {
        const count = await User.countDocuments({ isAdmin: true });
        res.status(200).send({ count });
    } catch (error) {
        console.error('Error counting admin users:', error);
        res.status(500).send({ error: 'Server error: Unable to count admin users' });
    }
};
