const jwt = require('jsonwebtoken');
function verify (req, res, next) {
    const authheader = req.headers.token;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, "hellotakdir", (err, user) => {
            if(err){
                res.status(403).json("Token is not valid")
            }
          req.user = user;
          next();
        });
      } else {
        res.status(401).json("You are not Authenticate");
      }
}
module.exports=verify