import { v2 as cloudinary } from "cloudinary";
import productModel from '../models/productModel.js'

//function for add product
const addProduct = async (req, res) => {
  try {
    //get product details
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    //get images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrls = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrls,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData)
    await product.save()

    res.status(201).json({success: true, message: "Product added successfuly!"});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//function for list product
const listProducts = async (req, res) => {
  try {
    let products = await productModel.find({})
    res.status(201).json({success:true, products})
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message:error.message})
  }
};

//function for removing product
const removeProduct = async (req, res) => {
    try {
      const result = await productModel.findByIdAndDelete(req.body.id);
      
      if (result) {
        res.status(200).json({ success: true, message: "Product removed successfully!" });
      } else {
        res.status(404).json({ success: false, message: "Product not found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }  
};

//function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId)
    console.log(`productId: ${productId}`);
    if (product) {
      res.status(200).json({success:true, product})
    } else {
      res.status(404).json({success:false, message:"Product not found" })
    }
  } catch (error) {
    console.log(error);
      res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
