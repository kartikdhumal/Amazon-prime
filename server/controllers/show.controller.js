import Show from '../models/showModel.models.js';
import 'dotenv/config';
import mongoose from 'mongoose';

export const sendShows = async (req, res) => {
    try {
        const bodyData = req.body;
        const show = new Show(bodyData);
        const showData = await show.save();
        res.status(201).send(showData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the show.' });
    }
}

export const findShows = async (req, res) => {
    try {
        const showData = await Show.find().sort({ _id: -1 }).exec();
        res.status(200).send(showData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching shows.' });
    }
}

export const getShowUpdateData = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid ID' });
    }
    try {
        const data = await Show.findById(id);
        if (!data) {
            return res.status(404).send({ error: 'Data not found' });
        }
        res.status(200).send(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send({ error: 'Internal server error' });
    }
}

export const EditShows = async (req, res) => {
    try {
        const id = req.params.id;
        const showData = await Show.findByIdAndUpdate(id, req.body, { new: true });
        if (!showData) {
            return res.status(404).send({ error: 'Show not found' });
        }
        res.status(200).send(showData);
    } catch (error) {
        console.error('Error updating show:', error);
        res.status(500).send({ error: 'An error occurred while updating the show.' });
    }
}

export const countShows = async (req, res) => {
    try {
        const count = await Show.countDocuments({ isSeries: true });
        res.status(200).send({ count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }
}

export const deleteShows = async (req, res) => {
    try {
        const id = req.params.id;
        const showData = await Show.findByIdAndDelete(id);
        if (!showData) {
            return res.status(404).send({ error: 'Show not found' });
        }
        res.status(200).send(showData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while deleting the show.' });
    }
}

export const countMovies = async (req, res) => {
    try {
        const count = await Show.countDocuments({ isSeries: false });
        res.status(200).send({ count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }
}

export const getWatch = async (req, res) => {
    try {
        const id = req.params.id;
        const showData = await Show.findById(id);
        if (!showData) {
            return res.status(404).send({ error: 'Show not found' });
        }
        res.status(200).send(showData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
}

export const findShowByType = async (req, res) => {
    try {
        const type = req.params.type;
        let showData;
        if (type === 'movie') {
            showData = await Show.find({ isSeries: false });
        } else if (type === 'series') {
            showData = await Show.find({ isSeries: true });
        } else {
            showData = await Show.find();
        }
        res.status(200).send(showData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
}

export const findGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const genreData = await Show.find({ genre: genre });
        res.status(200).send(genreData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
}
