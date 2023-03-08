const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken")
//register user
router.post("/regsiter", async (req, res) => {
  const newuser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, "123").toString(),
  });
  try {
    const user = await newuser.save();
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "hellotakdir",
      { expiresIn: "5d" }
    );
    res.status(201).json({user, accessToken});
    
  } catch {
    res.status(500).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const bytes = CryptoJS.AES.decrypt(user.password, "123");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "hellotakdir",
      { expiresIn: "5d" }
    );

    const { password: _, ...userInfo } = user._doc;

    res.status(200).json({ ...userInfo, accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json(error.message);
  }
});

router.get("/alluser", verify, async(req, res) => {
  if(req.user.isAdmin){
    try{
      const user = await User.find({})
    res.status(200).json(user)
    }catch{
      res.status(401).json("Something wrong on here")
    }
  }else{
    res.status(400).json("You cant access this ")
  }
})

module.exports = router;
