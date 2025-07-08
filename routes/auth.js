const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const db = require("../config/database")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Register
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").trim().isLength({ min: 2 }),
    body("phone").optional().isMobilePhone(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password, name, phone, address, role = "customer" } = req.body

      // Check if user exists
      const [existingUsers] = await db.execute("SELECT id FROM users WHERE email = ?", [email])
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: "User already exists" })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const [result] = await db.execute(
        "INSERT INTO users (email, password, name, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)",
        [email, hashedPassword, name, phone, address, role],
      )

      // Generate token
      const token = jwt.sign({ userId: result.insertId }, JWT_SECRET, { expiresIn: "7d" })

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: result.insertId,
          email,
          name,
          role,
        },
      })
    } catch (error) {
      console.error("Registration error:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },
)

// Login
router.post("/login", [body("email").isEmail().normalizeEmail(), body("password").exists()], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = users[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        rewards_points: user.rewards_points,
        wallet_balance: user.wallet_balance,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get current user
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Access token required" })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const [users] = await db.execute(
      "SELECT id, email, name, role, rewards_points, wallet_balance FROM users WHERE id = ?",
      [decoded.userId],
    )

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({ user: users[0] })
  } catch (error) {
    console.error("Get user error:", error)
    res.status(401).json({ error: "Invalid token" })
  }
})

module.exports = router
