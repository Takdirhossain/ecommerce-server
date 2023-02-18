const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth")
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://ecommerce:ecommerce@cluster0.eurlfla.mongodb.net/ecommerece?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("databse connect");
  });
app.use("/api/auth", auth)


app.use('/', (req, res) => {
  res.send("This is server is runing efesf")
})
app.listen(port, () => {
  console.log("Server is running on ");
});
