const router = require("express").Router();
const NewProduct = require("../models/Products");
const verify = require("../verifyToken");

router.post("/newproducts", verify, async (req, res) => {
 
    try {
        const product = new NewProduct(req.body);
        await product.save();
        res.status(201).json(product);
      } catch {
        res.status(500).json("Somethis wrong here");
      }
  
  
});
router.get("/newproducts", async (req, res) => {
  try {
    const product = await NewProduct.find({});
    res.status(201).json(product);
  } catch {
    res.status(501).json("Somethis wrong at here ");
  }
});
router.get("/latest", async (req, res) => {
  try {
    const product = await NewProduct.find({}).sort({ createdAt: -1 });
    res.status(201).json(product);
  } catch {
    res.status(501).json("Somethis wrong at here ");
  }
});
module.exports = router;
