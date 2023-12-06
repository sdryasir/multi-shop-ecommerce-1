import express from 'express';
const router = express.Router()
import { 
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
 } from '../controllers/category.controller.js';
 import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

router.route('/categories').get(getAllCategories);
router.route('/category/:id').get(getCategoryById);
router.route('/new/category').post(isAuthenticatedUser, authorizedUser('admin'),  createNewCategory);
router.route('/category/update/:id').put(isAuthenticatedUser, authorizedUser('admin'), updateCategory);
router.route('/category/delete/:id').delete(isAuthenticatedUser, authorizedUser('admin'), deleteCategory);

export default router;
