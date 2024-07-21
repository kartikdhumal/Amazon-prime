import Watchlist from "../models/Watchlist.models.js";
import mongoose from "mongoose";

export const addWatchlist = async (req, res) => {
    try {
        const { userId, showId } = req.body;

        if (!userId || !showId) {
            return res.status(400).json({ message: 'User ID and Show ID are required' });
        }

        let watchlist = await Watchlist.findOne({ userId });

        if (watchlist) {
            if (watchlist.showIds.includes(showId)) {
                return res.status(400).json({ message: 'Item already exists in watchlist' });
            }

            watchlist.showIds.push(showId);
            await watchlist.save();
        } else {
            watchlist = await Watchlist.create({ userId, showIds: [showId] });
        }

        res.status(201).json({ message: 'Item added to watchlist successfully', watchlist });
    } catch (error) {
        console.error('Error adding item to watchlist:', error);
        res.status(500).json({ message: 'An error occurred while adding item to watchlist' });
    }
};

export const getWatchlists = async (req, res) => {
    try {
        const watchlistData = await Watchlist.find();

        if (!watchlistData || watchlistData.length === 0) {
            return res.status(404).json({ message: 'No watchlists found' });
        }

        res.json(watchlistData);
    } catch (error) {
        console.error('Error fetching watchlist data:', error);
        res.status(500).json({ message: 'An error occurred while fetching watchlist data' });
    }
};

export const deleteWatchlist = async (req, res) => {
    try {
        const { userId, showId } = req.params;

        if (!userId || !showId) {
            return res.status(400).json({ message: 'User ID and Show ID are required' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(showId)) {
            return res.status(400).json({ message: 'Invalid User ID or Show ID' });
        }

        const watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
            return res.status(404).json({ message: 'Watchlist not found' });
        }

        const initialLength = watchlist.showIds.length;
        watchlist.showIds = watchlist.showIds.filter(id => id.toString() !== showId.toString());

        if (watchlist.showIds.length === initialLength) {
            return res.status(404).json({ message: 'Show ID not found in watchlist' });
        }

        await watchlist.save();

        res.status(200).json({ message: 'Watchlist item deleted successfully', watchlist });
    } catch (error) {
        console.error('Error deleting watchlist item:', error);
        res.status(500).json({ message: 'An error occurred while deleting watchlist item' });
    }
};