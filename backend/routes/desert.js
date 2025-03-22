import express from 'express';
import { createDesert, deleteDesert, getAllDesert, getDesertBySearch, getDesertCount, getFeaturedDesert, getSingleDesert, updateDesert } from '../controller/desertController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// get desert by search
router.get('/search', getDesertBySearch);

// get featured desert
router.get('/search/getFeaturedDesert', getFeaturedDesert);

// get count of deserts
router.get('/search/getDesertCount', getDesertCount);

// create a route for /desert
router.post('/', verifyAdmin, createDesert);

// update a route for /desert
router.put('/:id', verifyAdmin, updateDesert);

// delete a route for /desert
router.delete('/:id', verifyAdmin, deleteDesert);

// get single a route for /desert
router.get('/:id', getSingleDesert);

// get all route for /desert
router.get('/', getAllDesert);

export default router;