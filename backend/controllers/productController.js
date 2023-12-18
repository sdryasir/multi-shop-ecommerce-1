import Product from '../models/productSchema.js'
import Category from '../models/category.schema.js'

import path from 'path';
import { imageUploading } from '../utils/utils.js'

export const getAllProducts = async function (req, res, next) {

    const products = await Product.find({})

    res.json(products);
}

export const getProductById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id)
        if (product) {
            res.json(product);
        } else {
            next(new Error("Product not found"))
        }
    } catch (error) {
        next(error);
    }
}


export const createNewProduct = async function (req, res, next) {
    const newProduct = req.body;

    const imageUrl = await imageUploading({
        folder: 'products',
        image: newProduct.image
    })

    newProduct.image = imageUrl;

    const product = await Product.create(newProduct);
    const categoryId = product.category.toString()
    const productId = product._id.toString()

    const category = await Category.findById(categoryId);
    const newProducts = [...category.products, productId.toString()];
    category.products = newProducts;
    const updatedCat = await Category.findByIdAndUpdate(categoryId, category)

    if (product) {
        res.json({
            message: 'Product has been created',
            success: true
        })
    }



}

export const updateProduct = async function (req, res, next) {
    const { id } = req.params;
    const updatedProduct = req.body;

    await Product.findByIdAndUpdate(id, updatedProduct)
    res.json({
        message: 'Updated'
    });
}

export const deleteProduct = async function (req, res, next) {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({
        message: 'Deleted'
    });
}