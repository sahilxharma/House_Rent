const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      req.userId = decoded.id;     // ✅ Add this
      req.user = decoded;          // Optional: keep full token payload
      next();
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
