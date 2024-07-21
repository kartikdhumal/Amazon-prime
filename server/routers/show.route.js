import { Router } from "express";
import { countMovies, countShows, deleteShows, EditShows, findGenre, findShows, findShowByType, getShowUpdateData, getWatch, sendShows } from '../controllers/show.controller.js'

const router = Router();

router.post('/shows', sendShows);
router.get('/findshow', findShows);
router.get('/getShowUpdateData/:id', getShowUpdateData);
router.put('/editshow/:id', EditShows);
router.get('/countShows', countShows);
router.delete('/deleteshow/:id', deleteShows);
router.get('/countMovies', countMovies);
router.get('/watch/:id', getWatch);
router.get('/findshow/:type', findShowByType);
router.get('/findgenre/:genre', findGenre);


export default router;