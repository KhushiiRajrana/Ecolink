const express = require("express")
const db = require("../config/database")
const { authenticateToken, requireRole } = require("../middleware/auth")

const router = express.Router()

// Get offers for shopkeeper
router.get("/offers", authenticateToken, requireRole(["shopkeeper"]), async (req, res) => {
  try {
    const [offers] = await db.execute(
      `
      SELECT so.*, r.item_name, r.category, r.condition_actual, r.quality_grade, r.photos, r.estimated_value
      FROM shopkeeper_offers so
      JOIN returns r ON so.return_id = r.id
      WHERE so.shopkeeper_id = ?
      ORDER BY so.created_at DESC
    `,
      [req.user.id],
    )

    const offersWithPhotos = offers.map((offer) => ({
      ...offer,
      photos: offer.photos ? JSON.parse(offer.photos) : [],
    }))

    res.json({ offers: offersWithPhotos })
  } catch (error) {
    console.error("Get offers error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Accept/Reject offer
router.put("/offers/:id", authenticateToken, requireRole(["shopkeeper"]), async (req, res) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body

    // Verify offer belongs to this shopkeeper
    const [offers] = await db.execute("SELECT * FROM shopkeeper_offers WHERE id = ? AND shopkeeper_id = ?", [
      id,
      req.user.id,
    ])

    if (offers.length === 0) {
      return res.status(404).json({ error: "Offer not found" })
    }

    await db.execute("UPDATE shopkeeper_offers SET status = ?, notes = ? WHERE id = ?", [status, notes, id])

    // If accepted, update return status
    if (status === "accepted") {
      await db.execute('UPDATE returns SET status = "sold", shopkeeper_id = ? WHERE id = ?', [
        req.user.id,
        offers[0].return_id,
      ])
    }

    res.json({ message: "Offer updated successfully" })
  } catch (error) {
    console.error("Update offer error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get shopkeeper's products
router.get("/products", authenticateToken, requireRole(["shopkeeper"]), async (req, res) => {
  try {
    const [products] = await db.execute("SELECT * FROM products WHERE shopkeeper_id = ? ORDER BY created_at DESC", [
      req.user.id,
    ])

    const productsWithPhotos = products.map((product) => ({
      ...product,
      photos: product.photos ? JSON.parse(product.photos) : [],
    }))

    res.json({ products: productsWithPhotos })
  } catch (error) {
    console.error("Get shopkeeper products error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get shopkeeper analytics
router.get("/analytics", authenticateToken, requireRole(["shopkeeper"]), async (req, res) => {
  try {
    // Get sales stats
    const [salesStats] = await db.execute(
      `
      SELECT 
        COUNT(*) as total_sales,
        SUM(price) as total_revenue,
        AVG(price) as avg_price
      FROM products 
      WHERE shopkeeper_id = ? AND status = 'sold'
    `,
      [req.user.id],
    )

    // Get monthly sales
    const [monthlySales] = await db.execute(
      `
      SELECT 
        DATE_FORMAT(updated_at, '%Y-%m') as month,
        COUNT(*) as sales_count,
        SUM(price) as revenue
      FROM products 
      WHERE shopkeeper_id = ? AND status = 'sold'
      GROUP BY DATE_FORMAT(updated_at, '%Y-%m')
      ORDER BY month DESC
      LIMIT 6
    `,
      [req.user.id],
    )

    // Get category performance
    const [categoryStats] = await db.execute(
      `
      SELECT 
        category,
        COUNT(*) as items_sold,
        SUM(price) as revenue,
        AVG(price) as avg_price
      FROM products 
      WHERE shopkeeper_id = ? AND status = 'sold'
      GROUP BY category
      ORDER BY revenue DESC
    `,
      [req.user.id],
    )

    res.json({
      sales_stats: salesStats[0],
      monthly_sales: monthlySales,
      category_stats: categoryStats,
    })
  } catch (error) {
    console.error("Get shopkeeper analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
