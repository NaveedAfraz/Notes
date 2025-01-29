const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log("token is this o auth chekc", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    };
    // console.log(req?.user);
    // console.log("decoded is this", decoded);

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = requireAuth;
