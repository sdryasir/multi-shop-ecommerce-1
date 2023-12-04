import Product from '../models/productSchema.js'
import * as cloudinary from 'cloudinary'
import path from 'path';
const __dirname = path.resolve();
import fs from 'fs';

export const getAllProducts = async function(req, res, next){

    const products = await Product.find({})

    res.json(products);
}

export const getProductById = async function(req, res, next){
    const {id} = req.params;
    try {
        const product = await Product.findById(id)
        if(product){
            res.json(product);
        }else{
            next(new Error("Product not found"))
        }
    } catch (error) {
        next(error);
    }
}


export const createNewProduct = async function(req, res, next){    
    const newProduct = req.body;
    try {
        const encoded = newProduct.image;
        const base64ToArray = encoded.split(";base64,");
        const prefix = base64ToArray[0];
        const extension = prefix.replace(/^data:image\//, '');
        
        if (extension === 'jpeg' || extension === 'jpg' || extension === 'png')
        {


            const imageData = base64ToArray[1];
            const fileName = (new Date().getTime() / 1000|0) + '.' + extension;
            const imagePath = path.join(__dirname, './uploads/') + fileName;  //---/upload/32658921_abc.jpg

            const filePath = path.resolve(imagePath);
            newProduct.image = filePath 
            fs.writeFileSync(filePath, imageData,  { encoding: 'base64' }) 
            if(await Product.create(newProduct)){
                res.json({
                    success:true,
                    message:"Product has been created"        
                })
            }else{
                return next(new Error("Something went wrong")); 
            }
                
        }
        else {
            return next(new Error("The image is not valid, please upload jpg, png or jpeg"));
        }
    }
    catch (e) {
        return next(new Error(e.message));
    }


    
}

export const updateProduct = async function(req, res, next){
    const {id} = req.params;
    const updatedProduct = req.body;

    await Product.findByIdAndUpdate(id, updatedProduct)
    res.json({
        message: 'Updated'
    });
}

export const deleteProduct = async function(req, res, next){
    const {id} = req.params;

    await Product.findByIdAndDelete(id);
    
    res.json({
        message: 'Deleted'
    });
}