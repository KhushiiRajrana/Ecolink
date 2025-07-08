const express = require("express")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")
const path = require("path")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const returnsRoutes = require("./routes/returns")
const donationsRoutes = require("./routes/donations")
const productsRoutes = require("./routes/products")
const shopkeepersRoutes = require("./routes/shopkeepers")
const adminRoutes = require("./routes/admin")
const uploadRoutes = require("./routes/upload")
const analyticsRoutes = require("./routes/analytics")
const { handleSocketConnection } = require("./utils/socketHandlers")

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)
  handleSocketConnection(socket, io)
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/returns", returnsRoutes)
app.use("/api/donations", donationsRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/shopkeepers", shopkeepersRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/analytics", analyticsRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "EcoLink+ API is running" })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
