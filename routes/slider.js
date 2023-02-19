const router = require("express").Router();
const verify = require("../verifyToken");
const Slider = require("../models/Slider")

router.post("/slider", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const slider = new Slider(req.body)
            await slider.save()
            res.status(201).json(slider)

        } catch {
            res.status(401).json("something wrong here")
        }
    }
})