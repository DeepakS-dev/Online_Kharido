const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
    },
    url: {
      type: String,
      required: [true, "url is required"],
      unique: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: [true, "description is required"],
    },
    metatitle: {
      type: String,
      required: [true, "title is required"],
    },
    metadesc: {
      type: String,
      required: [true, "meta description is required"],
    },
    meta_keywords: {
      type: String,
      required: [true, "meta Keywords is required"],
    },
    parentcategory: {
      type: Array,
      default: [],
    },
    attribute: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "Active",
    },
    banner: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
