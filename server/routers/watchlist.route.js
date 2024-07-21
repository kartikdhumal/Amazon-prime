import { Router } from "express";
import { addWatchlist, deleteWatchlist, getWatchlists } from '../controllers/watchlist.controller.js'
const router = Router();

router.post('/addwatchlist', addWatchlist);
router.get('/watchlists', getWatchlists);
router.delete('/deletewatchlist/:userId/:showId', deleteWatchlist);

export default router;