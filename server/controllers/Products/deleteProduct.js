const Product = require('../../Models/product')

const deleteProduct = async (req, res) => {
  try {
    const Productdel = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status:true,
      message:"Deleted Successfully.",
      deletedProduct: Productdel
    });
  } catch (err) {
   return res
      .status(500)
      .json({ 
        status:false,
        error: err });
  }
};


module.exports = deleteProduct;