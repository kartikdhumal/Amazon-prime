const mongoose = require('mongoose');
const User = require('./userModel');
const Show = require('./showModel');

const favoriteShowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    }
},
{ timestamps: true }
);

const FavoriteShow = mongoose.model("FavoriteShow" , favoriteShowSchema);
module.exports = FavoriteShow;
