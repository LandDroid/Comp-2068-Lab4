const mongoose = require("mongoose");

// You need to create a new schema and assign it the following
// constant
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // This must exist
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

// Query Helpers
ProductSchema.query.drafts = function () {
  return this.where({
    status: "DRAFT",
  });
};

ProductSchema.query.published = function () {
  return this.where({
    status: "PUBLISHED",
  });
};

ProductSchema.virtual("synopsis").get(function () {
  const post = this.description;
  return post.replace(/(<([^>]+)>)/gi, "").substring(0, 250);
});

module.exports = mongoose.model("Product", ProductSchema);
