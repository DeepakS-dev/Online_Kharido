const Product = require('../../Models/product');

const productList = async(req,res) => {

try {
    console.log("This is product Controller....");
    const productListing = await Product.find();

    return res.status(200).json({
        status:true,
        message:"Product List Successfully fetched",
        data:productListing
    })
    
} catch (error) {
    return res.status(500).json({
        status:false,
        error:error
    })
}

}

module.exports = productList;