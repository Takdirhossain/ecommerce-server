const router = require("express").Router();
const verify = require("../verifyToken");
const Category = require("../models/Category")

router.post("/addcategory", verify, async (req, res) => {
    if(req.user.isAdmin){
        try {
            const newcategory = new Category(req.body)
            await newcategory.save()
            res.status(201).json(newcategory)
        } catch {
            console.error("Somethis wrong here");
        }
    }else{
        res.status(404).json("you care not authorized")
    }
})

module.exports = router