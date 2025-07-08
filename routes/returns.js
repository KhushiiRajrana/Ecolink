const express = require("express")
const db = require("../config/database")
const { authenticateToken, requireRole } = require("../middleware/auth")
const upload = require("../middleware/upload")

const router = express.Router()

// Submit return request
router.post("/", authenticateToken, upload.array("photos", 5), async (req, res) => {
  try {
    const { item_name, category, condition_reported, description, estimated_value } = req.body
    const photos = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : []

    const [result] = await db.execute(
      "INSERT INTO returns (user_id, item_name, category, condition_reported, description, estimated_value, photos) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [req.user.id, item_name, category, condition_reported, description, estimated_value, JSON.stringify(photos)],
    )

    // Award points for return submission
    await db.execute("UPDATE users SET rewards_points = rewards_points + 10 WHERE id = ?", [req.user.id])

    await db.execute(
      "INSERT INTO transactions (user_id, type, points, description, reference_id, reference_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [req.user.id, "return", 10, "Points for return submission", result.insertId, "return", "completed"],
    )

    res.status(201).json({
      message: "Return request submitted successfully",
      return_id: result.insertId,
      points_earned: 10,
    })
  } catch (error) {
    console.error("Return submission error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get user's returns
router.get("/my-returns", authenticateToken, async (req, res) => {
  try {
    const [returns] = await db.execute("SELECT * FROM returns WHERE user_id = ? ORDER BY created_at DESC", [
      req.user.id,
    ])

    const returnsWithPhotos = returns.map((returnItem) => ({
      ...returnItem,
      photos: returnItem.photos ? JSON.parse(returnItem.photos) : [],
    }))

    res.json({ returns: returnsWithPhotos })
  } catch (error) {
    console.error("Get returns error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all returns (admin only)
router.get("/", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const [returns] = await db.execute(`
      SELECT r.*, u.name as user_name, u.email as user_email 
      FROM returns r 
      JOIN users u ON r.user_id = u.id 
      ORDER BY r.created_at DESC
    `)

    const returnsWithPhotos = returns.map((returnItem) => ({
      ...returnItem,
      photos: returnItem.photos ? JSON.parse(returnItem.photos) : [],
    }))

    res.json({ returns: returnsWithPhotos })
  } catch (error) {
    console.error("Get all returns error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update return status (admin only)
router.put("/:id/status", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params
    const { status, condition_actual, quality_grade, actual_value, admin_notes } = req.body

    await db.execute(
      "UPDATE returns SET status = ?, condition_actual = ?, quality_grade = ?, actual_value = ?, admin_notes = ? WHERE id = ?",
      [status, condition_actual, quality_grade, actual_value, admin_notes, id],
    )

    res.json({ message: "Return status updated successfully" })
  } catch (error) {
    console.error("Update return status error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
