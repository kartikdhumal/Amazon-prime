import { Router } from "express";
import { CountAdminUsers, deleteUser, EditProfile, fetcheditprofile, findUser, loginUser, Logout, registerUser, sendUsers } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/users', sendUsers);
router.get('/finduser', findUser);
router.delete('/deleteuser/:id', deleteUser);
router.post('/logout', Logout);
router.get('/fetcheditprofile/:id', fetcheditprofile);
router.put('/editprofile/:id', EditProfile);
router.get('/countAdminUsers', CountAdminUsers);

export default router;