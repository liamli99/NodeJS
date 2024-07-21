const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { BadRequestError } = require('../errors/index');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// POST /api/v1/products/uploads, 'Choose File' button
// Save the uploaded file to the server, note that this route doesn't require 'useTempFiles: true' in app.js!
const uploadProductImageLocal = async (req, res) => {
    // Since we load 'express-fileupload', we have 'req.files' to access the uploaded file!
    console.log(req.files);

    // Check if the file exists
    if (!req.files) {
        throw new BadRequestError('No File Uploaded');
    }

    // If we use Postman -> Body -> form-data to upload the file, then the Key value is 'image'!
    // If the frontend uses FormData, then the first argument is 'image'; If the frontend only uses input, then the input is '<input name="image", type="file">'!
    const productImage = req.files.image;

    // Check if the file is an image
    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Please Upload Image');
    }

    // Check the size of the file
    if (productImage.size > 100000) {
        throw new BadRequestError('Please Upload Image Smaller Than 100KB');
    }

    // Save the uploaded image to '../public/uploads'! For this project, we save the uploaded image to the server because we have a frontend in public folder!
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);

    // Note that 'res.image.src' is actually the 'image' property of the request body that will be sent to createProduct route! 
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
}

// Save the uploaded file to a cloud service: Cloudinary!
const uploadProductImageCloud = async (req, res) => {
    // Since we set 'useTempFiles: true' in app.js, the uploaded image is saved to a tmp folder!
    // Save the uploaded image to Cloudinary: Assets -> Media Library -> Folders, the folder name is 'upload-file'!
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