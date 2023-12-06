import Category from '../models/category.schema.js'
import path from 'path';
const __dirname = path.resolve();
import fs from 'fs';

export const getAllCategories = async function(req, res, next){
    const categories = await Category.find({});
    res.json(categories);
}

export const getCategoryById = async function(req, res, next){
    const {id} = req.params;
    try {
        const category = await Category.findById(id)
        if(category){
            res.json(category);
        }else{
            next(new Error("category not found"))
        }
    } catch (error) {
        next(error);
    }
}

export const createNewCategory = async function(req, res, next){    
    const newCategory = req.body;
    try {
        const encoded = newCategory.image;
        const base64ToArray = encoded.split(";base64,");
        const prefix = base64ToArray[0];
        const extension = prefix.replace(/^data:image\//, '');
        
        if (extension === 'jpeg' || extension === 'jpg' || extension === 'png')
        {
            const imageData = base64ToArray[1];
            const fileName = (new Date().getTime() / 1000|0) + '.' + extension;
            const imagePath = path.join(__dirname, './uploads/category') + fileName;  //---/upload/32658921_abc.jpg

            const filePath = path.resolve(imagePath);
            newCategory.image = filePath 
            fs.writeFileSync(filePath, imageData,  { encoding: 'base64' }) 
            if(await Product.create(newCategory)){
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

export const updateCategory = async function(req, res, next){
    const {id} = req.params;
    const updatedCategory = req.body;

    await Category.findByIdAndUpdate(id, updatedCategory)
    res.json({
        message: 'Updated'
    });
}

export const deleteCategory = async function(req, res, next){
    const {id} = req.params;

    await Category.findByIdAndDelete(id);
    
    res.json({
        message: 'Deleted'
    });
}