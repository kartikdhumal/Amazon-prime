import mongoose from 'mongoose'

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  showIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
      required: true
    }
  ]
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
export default Watchlist;