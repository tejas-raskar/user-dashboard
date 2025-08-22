const jwt = require("jsonwebtoken");
const User = require("../api/models/user");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ msg: "Unauthorized, user not found." });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Unauthorized, token failed." });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized, no token" });
  }
};

module.exports = { protect };
