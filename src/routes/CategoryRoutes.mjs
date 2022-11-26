import express from "express";
import { verifyToken } from '../config/jwt.mjs'
import { createCategory, getUserCategory, getAllUserCategories, getAllSystemCategories, updateCategory, deleteCategory } from '../controller/CategoryController.mjs'

const router = express.Router();

router.post('/', verifyToken, createCategory) //

router.patch('/:userId/:id', verifyToken, updateCategory) //

router.delete('/:userId/:id', verifyToken, deleteCategory)

router.get('/all', verifyToken, getAllSystemCategories) //
router.get('/all/:userId', verifyToken, getAllUserCategories) //
router.get('/:userId/:id', verifyToken, getUserCategory) //

export const categoryRoutes = router