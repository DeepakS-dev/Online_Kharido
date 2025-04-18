// const Product = require("../../../Models/product");

// const productByCategory = async (req, res) => {
//   const { none, page, max_price, min_price, order,orderby,brand,size,color,weight } =
//     req.query;
//   try {
//     const categoryId = req.params.id;
//     const itemsPerPage = 12;
//     const pageNumber = parseInt(page) || 1;
//     const skip = (pageNumber - 1) * itemsPerPage;
//     let sortOptions = {};
//     if (orderby) {
//       if (orderby == "trendingproduct") {
//         sortOptions[orderby] = 1;
//       }
//       if (orderby == "newarrivedproduct") {
//         sortOptions[orderby] = 1;
//       }

//       if (orderby == "selling_price") {
//         sortOptions[orderby] = order === "ASC" ? 1 : -1;
//       }
//     }else{
//       sortOptions['selling_price'] = 1;
//     }

//     // Build the base query for finding products by category
//     const baseQuery = {
//       $or: [{ parent_category: categoryId }, { child_category: categoryId }],
//     };

//     // Add price filtering to the base query
//     if (min_price || max_price) {
//       baseQuery.selling_price = {};
//       if (min_price) baseQuery.selling_price.$gte = parseInt(min_price);
//       if (max_price) baseQuery.selling_price.$lte = parseInt(max_price);
//     }

// if(weight){
//   const [weightnum, weighttype] = weight.split(' ');
//    baseQuery.weight = weightnum;
//     baseQuery.weight_type = weighttype;
// }
//     if (color) baseQuery.color = color;
//     if (size) baseQuery.size = size;
//     if (brand) baseQuery.brand = brand;

//     // Get total count before applying filters
//     const totalCountBeforeFilter = await Product.countDocuments(baseQuery);

//     // Get products before applying filters
//     const productsBeforeFilter = await Product
//       .find(baseQuery)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(itemsPerPage);

//       const totalItems = totalCountBeforeFilter;
//       const totalPages = Math.ceil(totalItems / itemsPerPage);

//       const categoryCheck = await Product.find({
//         $or: [{ parent_category: categoryId }, { child_category: categoryId }],
//       });
//       console.log(categoryCheck);

//      return res.status(200).json({
//         status: true,
//         message:"Filtered Items",
//         data: productsBeforeFilter,
//         totalPages,
//         itemsPerPage,
//         totalItems,
//         pageNumber,
//       });

//   } catch (error) {
//    return res.status(500).json({
//         status: false,
//         error: error.message });
//   }
// };

// module.exports = productByCategory;
const Product = require("../../../Models/product");
const mongoose = require("mongoose");

const productByCategory = async (req, res) => {
  const {
    page = 1,
    max_price,
    min_price,
    order,
    orderby,
    brand,
    size,
    color,
    weight,
  } = req.query;

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ status: false, error: "Invalid Category ID" });
      }
      
      const categoryId = new mongoose.Types.ObjectId(req.params.id);
    const itemsPerPage = 12;
    const skip = (parseInt(page) - 1) * itemsPerPage;

    let sortOptions = {};
    if (orderby) {
      if (orderby === "trendingproduct" || orderby === "newarrivedproduct") {
        sortOptions[orderby] = 1;
      } else if (orderby === "selling_price") {
        sortOptions.selling_price = order === "ASC" ? 1 : -1;
      }
    } else {
      sortOptions.selling_price = 1;
    }
    const baseQuery = {
        $or: [
          { parent_category: { $in: [`"${categoryId}"`] } },
          { child_category: { $in: [`"${categoryId}"`] } }
        ]
      };

    if (min_price || max_price) {
      baseQuery.selling_price = {};
      if (min_price) baseQuery.selling_price.$gte = parseInt(min_price);
      if (max_price) baseQuery.selling_price.$lte = parseInt(max_price);
    }

    if (weight) {
      const [weightnum, weighttype] = weight.split(" ");
      baseQuery.weight = parseFloat(weightnum);
      baseQuery.weight_type = weighttype;
    }

    if (color) baseQuery.color = color;
    if (size) baseQuery.size = size;
    if (brand) baseQuery.brand = brand;

    console.log("Final Query:", baseQuery);

    const totalCountBeforeFilter = await Product.countDocuments(baseQuery);
    const productsBeforeFilter = await Product
      .find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(itemsPerPage);

    if (!productsBeforeFilter.length) {
      return res
        .status(404)
        .json({ status: false, message: "No products found" });
    }

    const totalPages = Math.ceil(totalCountBeforeFilter / itemsPerPage);

    return res.status(200).json({
      status: true,
      message: "Filtered Items",
      data: productsBeforeFilter,
      totalPages,
      itemsPerPage,
      totalItems: totalCountBeforeFilter,
      pageNumber: parseInt(page),
    });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = productByCategory;
