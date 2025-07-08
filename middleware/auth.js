const jwt = require("jsonwebtoken")
const db = require("../config/database")

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Access token required" })
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    // Get user from database
    const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [decoded.userId])

    if (users.length === 0) {
      return res.status(401).json({ error: "User not found" })
    }

    req.user = users[0]
    next()
  } catch (error) {
    console.error("Auth error:", error)
    return res.status(403).json({ error: "Invalid token" })
  }
}

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    next()
  }
}

module.exports = {
  authenticateToken,
  requireRole,
}
