const viewPath = "pages";

exports.home = (req, res) => {
  res.render(`${viewPath}/home`, {
    pageTitle: "Lab 04 - Your Turn",
  });
};

exports.about = (req, res) => {
  res.render(`${viewPath}/about`, {
    pageTitle: "About Me",
  });
};

exports.products = (req, res) => {
  res.render(`${viewPath}/products/`, {
    pageTitle: "Products Page",
  });
};
