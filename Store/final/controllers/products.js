// GET /api/v1/products
const getAllProductsStatic = async (req, res) => { 
    res.status(200).json({ msg: 'testing1' });
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'testing2' });
}

module.exports = { getAllProductsStatic, getAllProducts };