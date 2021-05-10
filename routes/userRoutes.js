import express from "express";
import { getAll, register, login, profile, profileById, updateUser, deleteUser } from "../controllers/userController.js";
import { rateLimiterRouter } from '../utils/rateLimiter.js';
import { authverify } from '../utils/authVerify.js';

const userRoutes = express.Router();

userRoutes.get('/', getAll);
userRoutes.post('/register', rateLimiterRouter, register);
userRoutes.post('/login', rateLimiterRouter, login);
userRoutes.get('/profile', authverify,profile);
userRoutes.get('/:id', authverify,profileById);
userRoutes.put('/:id', authverify,updateUser);
userRoutes.delete('/:id', authverify,deleteUser);

export default userRoutes;