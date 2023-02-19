const router = require("express").Router();
const NewProduct = require("../models/Products");
const verify = require("../verifyToken");

router.post("/newproducts", verify, async (req, res) => {
  if (req.user.isAdmin) {

    try {
      const product = new NewProduct(req.body);
      await product.save();
      res.status(201).json(product);
    } catch {
      res.status(500).json("Somethis wrong here");
    }
  } else {
    res.status(401).json("You are not authorized")
  }
});

//update stock
router.put("/products/:productid", async(req, res) => {
  const {productId} = req.params
})


//get all products
router.get("/newproducts", async (req, res) => {
  try {
    const product = await NewProduct.find({});
    res.status(201).json(product);
  } catch {
    res.status(501).json("Somethis wrong at here ");
  }
});

//get latest product 
router.get("/latest", async (req, res) => {
  try {
    const product = await NewProduct.find({}).sort({ createdAt: -1 });
    res.status(201).json(product);
  } catch {
    res.status(501).json("Somethis wrong at here ");
  }
});

//get random products
router.get('/products/random', async (req, res) => {
  try {
    const agreegation = await NewProduct.aggregate([{ $sample: { size: 2 } }])
    res.status(201).json(agreegation)
  } catch {
    res.status(401).json("Something wrong here")

  }
});
module.exports = router;
