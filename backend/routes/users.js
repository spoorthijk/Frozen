import express from 'express';
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../controller/userController.js';

const router = express.Router();

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

// create a route for /user
router.post('/', createUser);

// update a route for /user
router.put('/:id', updateUser);

// delete a route for /user
router.delete('/:id',verifyUser, deleteUser);

// get single a route for /user
router.get('/:id', getSingleUser);

// get all route for /user
router.get('/',verifyAdmin, getAllUsers);

export default router;