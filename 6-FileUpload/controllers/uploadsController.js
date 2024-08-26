const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { BadRequestError } = require('../errors/index');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// If we want to use Postman to upload the file, we can go to Body -> form-data -> Key (choose 'File'), Value (Select file from local machine)!

// POST /api/v1/products/uploads
// 'Choose File' button
// Save the uploaded file to local (../public/uploads)! Note that this doesn't require 'useTempFiles: true' in app.js!
const uploadProductImageLocal = async (req, res) => {
    // Since we load 'express-fileupload' in app.js, we can use 'req.files' to access all the uploaded files!
    console.log(req.files);

    // Check if the file exists
    if (!req.files) {
        throw new BadRequestError('No File Uploaded');
    }

    // If we use Postman -> Body -> form-data to upload the file, then the Key should be 'image'!
    // If the frontend uses FormData, then the first argument should be 'image'; If the frontend only uses input, then the input should be '<input name="image", type="file">'!
    // So that we can use `req.files.image` to access the specific uploaded file!
    const productImage = req.files.image;

    // Check if the file is an image
    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Please Upload Image');
    }

    // Check the size of the file
    if (productImage.size > 1024 * 1024) {
        throw new BadRequestError('Please Upload Image Smaller Than 1MB');
    }

    // Save the uploaded image to local: ../public/uploads
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);

    // Send the image url back as response, we will use it as 'image' field when creating the product
    // Note that the url is not '/public/uploads/...' becasue app.js serves static files from public directory!
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
}

// Save the uploaded file to a cloud service: Cloudinary! Note that this requires 'useTempFiles: true' in app.js!
const uploadProductImageCloud = async (req, res) => {
    // Since we set 'useTempFiles: true' in app.js, the uploaded file is saved to a tmp folder at first!
    // Save the uploaded image to Cloudinary: Assets -> Media Library -> Folders, the folder name is 'upload-file'!
    // TODO: upload_stream?
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'upload-file'
    });

    // Remove the temp file
    // TODO: delete the tmp folder
    fs.unlinkSync(req.files.image.tempFilePath);

    console.log(result);

    res.status(StatusCodes.OK).json({ image: { src: `${result.secure_url}` } });
}

module.exports = { uploadProductImageLocal, uploadProductImageCloud };