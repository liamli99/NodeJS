

const createProduct = async (req, res) => {
  res.send('create');
}

const getAllProducts = async (req, res) => {
  res.send('get all products');
}

const getSingleProduct = async (req, res) => {
  res.send('get single product');
}

const updateProduct = async (req, res) => {
  res.send('update');
}

const deleteProduct = async (req, res) => {
  res.send('delete');
}

const uploadImage = async (req, res) => {
  res.send('upload');
}

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage };