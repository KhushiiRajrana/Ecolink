const express = require("express")
const db = require("../config/database")
const { authenticateToken, requireRole } = require("../middleware/auth")
const upload = require("../middleware/upload")

const router = express.Router()

// Submit donation request
router.post("/", authenticateToken, upload.array("photos", 5), async (req, res) => {
  try {
    const { item_name, category, condition_reported, size, description } = req.body
    const photos = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : []

    const [result] = await db.execute(
      "INSERT INTO donations (user_id, item_name, category, condition_reported, size, description, photos) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [req.user.id, item_name, category, condition_reported, size, description, JSON.stringify(photos)],
    )

    // Award points for donation submission
    await db.execute("UPDATE users SET rewards_points = rewards_points + 20 WHERE id = ?", [req.user.id])

    await db.execute(
      "INSERT INTO transactions (user_id, type, points, description, reference_id, reference_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [req.user.id, "donation", 20, "Points for donation submission", result.insertId, "donation", "completed"],
    )

    res.status(201).json({
      message: "Donation request submitted successfully",
      donation_id: result.insertId,
      points_earned: 20,
    })
  } catch (error) {
    console.error("Donation submission error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get user's donations
router.get("/my-donations", authenticateToken, async (req, res) => {
  try {
    const [donations] = await db.execute("SELECT * FROM donations WHERE user_id = ? ORDER BY created_at DESC", [
      req.user.id,
    ])

    const donationsWithPhotos = donations.map((donation) => ({
      ...donation,
      photos: donation.photos ? JSON.parse(donation.photos) : [],
    }))

    res.json({ donations: donationsWithPhotos })
  } catch (error) {
    console.error("Get donations error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all donations (admin only)
router.get("/", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const [donations] = await db.execute(`
      SELECT d.*, u.name as user_name, u.email as user_email 
      FROM donations d 
      JOIN users u ON d.user_id = u.id 
      ORDER BY d.created_at DESC
    `)

    const donationsWithPhotos = donations.map((donation) => ({
      ...donation,
      photos: donation.photos ? JSON.parse(donation.photos) : [],
    }))

    res.json({ donations: donationsWithPhotos })
  } catch (error) {
    console.error("Get all donations error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update donation status (admin only)
router.put("/:id/status", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params
    const { status, condition_actual, ngo_id, admin_notes } = req.body

    await db.execute(
      "UPDATE donations SET status = ?, condition_actual = ?, ngo_id = ?, admin_notes = ? WHERE id = ?",
      [status, condition_actual, ngo_id, admin_notes, id],
    )

    res.json({ message: "Donation status updated successfully" })
  } catch (error) {
    console.error("Update donation status error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get NGOs
router.get("/ngos", authenticateToken, async (req, res) => {
  try {
    const [ngos] = await db.execute('SELECT * FROM ngos WHERE status = "active"')
    res.json({ ngos })
  } catch (error) {
    console.error("Get NGOs error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
