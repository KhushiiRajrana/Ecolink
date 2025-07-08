const express = require("express")
const db = require("../config/database")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

// Get all available products
router.get("/", async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice, search } = req.query

    let query = `
      SELECT p.*, u.name as shopkeeper_name 
      FROM products p 
      LEFT JOIN users u ON p.shopkeeper_id = u.id 
      WHERE p.status = 'available'
    `
    const params = []

    if (category) {
      query += " AND p.category = ?"
      params.push(category)
    }

    if (condition) {
      query += " AND p.condition_grade = ?"
      params.push(condition)
    }

    if (minPrice) {
      query += " AND p.price >= ?"
      params.push(minPrice)
    }

    if (maxPrice) {
      query += " AND p.price <= ?"
      params.push(maxPrice)
    }

    if (search) {
      query += " AND (p.name LIKE ? OR p.description LIKE ?)"
      params.push(`%${search}%`, `%${search}%`)
    }

    query += " ORDER BY p.created_at DESC"

    const [products] = await db.execute(query, params)

    const productsWithPhotos = products.map((product) => ({
      ...product,
      photos: product.photos ? JSON.parse(product.photos) : [],
    }))

    res.json({ products: productsWithPhotos })
  } catch (error) {
    console.error("Get products error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [products] = await db.execute(
      `
      SELECT p.*, u.name as shopkeeper_name, u.phone as shopkeeper_phone 
      FROM products p 
      LEFT JOIN users u ON p.shopkeeper_id = u.id 
      WHERE p.id = ?
    `,
      [id],
    )

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" })
    }

    const product = {
      ...products[0],
      photos: products[0].photos ? JSON.parse(products[0].photos) : [],
    }

    res.json({ product })
  } catch (error) {
    console.error("Get product error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get categories
router.get("/categories/list", async (req, res) => {
  try {
    const [categories] = await db.execute(`
      SELECT DISTINCT category, COUNT(*) as count 
      FROM products 
      WHERE status = 'available' 
      GROUP BY category 
      ORDER BY count DESC
    `)

    res.json({ categories })
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
