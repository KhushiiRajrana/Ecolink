const express = require("express")
const db = require("../config/database")
const { authenticateToken, requireRole } = require("../middleware/auth")

const router = express.Router()

// Get user analytics
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id

    // Get user stats
    const [userStats] = await db.execute(
      `
      SELECT 
        (SELECT COUNT(*) FROM returns WHERE user_id = ?) as total_returns,
        (SELECT COUNT(*) FROM donations WHERE user_id = ?) as total_donations,
        (SELECT SUM(points) FROM transactions WHERE user_id = ? AND status = 'completed') as total_points_earned,
        (SELECT rewards_points FROM users WHERE id = ?) as current_points
    `,
      [userId, userId, userId, userId],
    )

    // Get monthly activity
    const [monthlyActivity] = await db.execute(
      `
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count,
        'returns' as type
      FROM returns 
      WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      
      UNION ALL
      
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count,
        'donations' as type
      FROM donations 
      WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      
      ORDER BY month DESC
    `,
      [userId, userId],
    )

    // Get category breakdown
    const [categoryBreakdown] = await db.execute(
      `
      SELECT 
        category,
        COUNT(*) as count,
        'returns' as type
      FROM returns 
      WHERE user_id = ?
      GROUP BY category
      
      UNION ALL
      
      SELECT 
        category,
        COUNT(*) as count,
        'donations' as type
      FROM donations 
      WHERE user_id = ?
      GROUP BY category
    `,
      [userId, userId],
    )

    res.json({
      user_stats: userStats[0],
      monthly_activity: monthlyActivity,
      category_breakdown: categoryBreakdown,
    })
  } catch (error) {
    console.error("Get user analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get system analytics (admin only)
router.get("/system", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    // Get overall stats
    const [overallStats] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE role = 'customer') as total_customers,
        (SELECT COUNT(*) FROM users WHERE role = 'shopkeeper') as total_shopkeepers,
        (SELECT COUNT(*) FROM returns) as total_returns,
        (SELECT COUNT(*) FROM donations) as total_donations,
        (SELECT COUNT(*) FROM products WHERE status = 'available') as available_products,
        (SELECT SUM(price) FROM products WHERE status = 'sold') as total_sales_value
    `)

    // Get growth metrics
    const [growthMetrics] = await db.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as new_users
      FROM users 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
    `)

    // Get top categories
    const [topCategories] = await db.execute(`
      SELECT 
        category,
        COUNT(*) as total_items,
        SUM(CASE WHEN 'returns' THEN 1 ELSE 0 END) as returns_count,
        SUM(CASE WHEN 'donations' THEN 1 ELSE 0 END) as donations_count
      FROM (
        SELECT category, 'returns' as type FROM returns
        UNION ALL
        SELECT category, 'donations' as type FROM donations
      ) combined
      GROUP BY category
      ORDER BY total_items DESC
      LIMIT 10
    `)

    res.json({
      overall_stats: overallStats[0],
      growth_metrics: growthMetrics,
      top_categories: topCategories,
    })
  } catch (error) {
    console.error("Get system analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
