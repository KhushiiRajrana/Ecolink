const express = require("express")
const db = require("../config/database")
const { authenticateToken, requireRole } = require("../middleware/auth")

const router = express.Router()

// Get dashboard stats
router.get("/dashboard", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    // Get total counts
    const [totalReturns] = await db.execute("SELECT COUNT(*) as count FROM returns")
    const [totalDonations] = await db.execute("SELECT COUNT(*) as count FROM donations")
    const [totalUsers] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "customer"')
    const [totalShopkeepers] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "shopkeeper"')

    // Get pending items
    const [pendingReturns] = await db.execute('SELECT COUNT(*) as count FROM returns WHERE status = "pending"')
    const [pendingDonations] = await db.execute('SELECT COUNT(*) as count FROM donations WHERE status = "pending"')

    // Get monthly stats
    const [monthlyReturns] = await db.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM returns 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
    `)

    const [monthlyDonations] = await db.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM donations 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
    `)

    // Get category breakdown
    const [returnCategories] = await db.execute(`
      SELECT category, COUNT(*) as count 
      FROM returns 
      GROUP BY category 
      ORDER BY count DESC
    `)

    const [donationCategories] = await db.execute(`
      SELECT category, COUNT(*) as count 
      FROM donations 
      GROUP BY category 
      ORDER BY count DESC
    `)

    res.json({
      totals: {
        returns: totalReturns[0].count,
        donations: totalDonations[0].count,
        users: totalUsers[0].count,
        shopkeepers: totalShopkeepers[0].count,
      },
      pending: {
        returns: pendingReturns[0].count,
        donations: pendingDonations[0].count,
      },
      monthly: {
        returns: monthlyReturns,
        donations: monthlyDonations,
      },
      categories: {
        returns: returnCategories,
        donations: donationCategories,
      },
    })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Send offer to shopkeeper
router.post("/offers", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const { return_id, shopkeeper_id, offer_price, notes } = req.body

    await db.execute(
      "INSERT INTO shopkeeper_offers (return_id, shopkeeper_id, offer_price, notes) VALUES (?, ?, ?, ?)",
      [return_id, shopkeeper_id, offer_price, notes],
    )

    // Update return status
    await db.execute('UPDATE returns SET status = "offered" WHERE id = ?', [return_id])

    res.json({ message: "Offer sent to shopkeeper successfully" })
  } catch (error) {
    console.error("Send offer error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all shopkeepers
router.get("/shopkeepers", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const [shopkeepers] = await db.execute(`
      SELECT 
        u.*,
        COUNT(so.id) as total_offers,
        COUNT(CASE WHEN so.status = 'accepted' THEN 1 END) as accepted_offers
      FROM users u
      LEFT JOIN shopkeeper_offers so ON u.id = so.shopkeeper_id
      WHERE u.role = 'shopkeeper'
      GROUP BY u.id
      ORDER BY u.name
    `)

    res.json({ shopkeepers })
  } catch (error) {
    console.error("Get shopkeepers error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
