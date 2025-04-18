const userRouter = require("./routes/userRoutes.js");
const categoryRouter = require("./routes/categoryRouter.js");
const productRouter = require("./routes/productRouter.js");
const variantRouter = require("./routes/variantRouter.js");
const wishListRouter = require('./routes/wishListRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const connectDb = require("./db/connection.js");
const port = 5000;
const database =
  "mongodb+srv://deepakshukla091827:F0sEci5b521JC9dt@cluster0.56tnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
require("./Models/usertable.js");
require("./Models/category.js");
require("./Models/product.js");
require("./Models/productVariant.js");
require("./Models/wishlist.js");
require("./Models/cart.js");
require("./Models/order.js");
require("./Models/websiteInfo.js");
app.use("/api/user", userRouter);
app.use("/api/category",categoryRouter);
app.use("/api/product",productRouter);
app.use("/api/variant",variantRouter);
app.use("/api/wishlist",wishListRouter);
app.use("/api/cart",cartRouter);

connectDb(database);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
