const router = require("express").Router();
const NewProduct = require("../models/Products");
const verify = require("../verifyToken");

router.post("/newpost",  verify, async (req, res) => {
   if(req.user){
    try {
      const product = new NewProduct(req.body);
      await product.save();
      res.status(201).json(product);
    } catch {
      res.status(500).json("Somethis wrong here");
    }
   }
  
});
router.delete("/posts/:id", verify, async(req,res) => {
  try{
    const post = await NewProduct.findById(req.params.id)
    if(!post){
      return res.status(404).json("Post not found")
    }
    if(post.userid !== req.user.id){
      res.status(403).json("you are not authenticate")
    }
    await NewProduct.remove()
    res.json("Post hasbeen delete")
  } catch{
    res.status(404).json("SOmething wrong")
  }
})


router.post("/:id/like", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await NewProduct.findById(id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    product.like++; // Increment the likes field by 1
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
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


module.exports = router;
