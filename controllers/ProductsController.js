const viewPath = "products";
const Product = require("../models/product");

exports.index = async (req, res) => {
  try {
    const products = await Product.find().sort({ updatedAt: "desc" });

    res.render(`${viewPath}/index`, {
      pageTitle: "Archived Products",
      products: products,
    });
  } catch (error) {
    req.flash("danger", `There was an error displaying the products: ${error}`);
    res.redirect("/");
  }
};

exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render(`${viewPath}/show`, {
      pageTitle: product.name,
      product: product,
    });
  } catch (error) {
    req.flash("danger", `There was an error displaying this product: ${error}`);
    res.redirect("/");
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: "New Product",
  });
};

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    req.flash("success", "Product created successfully");
    res.redirect(`/products/${product.id}`);
  } catch (error) {
    req.flash("danger", `There was an error creating this product: ${error}`);
    req.session.formData = req.body;
    res.redirect("/product/new");
  }
};

exports.edit = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: product.name,
      formData: product,
    });
  } catch (error) {
    req.flash("danger", `There was an error accessing this product: ${error}`);
    res.redirect("/");
  }
};

exports.update = async (req, res) => {
  try {
    let product = await Product.findById(req.body.id);
    if (!product) throw new Error("Product could not be found");

    await Product.validate(req.body);
    await Product.updateOne(req.body);

    req.flash("success", "The product was updated successfully");
    res.redirect(`/products/${req.body.id}`);
  } catch (error) {
    req.flash("danger", `There was an error updating this product: ${error}`);
    res.redirect(`/products/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Product.deleteOne({ _id: req.body.id });
    req.flash("success", "The product was deleted successfully");
    res.redirect(`/products`);
  } catch (error) {
    req.flash("danger", `There was an error deleting this product: ${error}`);
    res.redirect(`/products`);
  }
};
