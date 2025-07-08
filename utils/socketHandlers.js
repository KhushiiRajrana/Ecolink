const handleSocketConnection = (socket, io) => {
  console.log(`User connected: ${socket.id}`)

  // Join user-specific room
  socket.on("join-user-room", (userId) => {
    socket.join(`user-${userId}`)
    console.log(`User ${userId} joined their room`)
  })

  // Join admin room
  socket.on("join-admin-room", () => {
    socket.join("admin-room")
    console.log("Admin joined admin room")
  })

  // Join shopkeeper room
  socket.on("join-shopkeeper-room", (shopkeeperId) => {
    socket.join(`shopkeeper-${shopkeeperId}`)
    socket.join("shopkeepers-room")
    console.log(`Shopkeeper ${shopkeeperId} joined shopkeeper rooms`)
  })

  // Handle new submission notifications
  socket.on("new-submission", (data) => {
    // Notify admins of new submissions
    io.to("admin-room").emit("new-item-submitted", {
      type: data.type,
      itemId: data.itemId,
      itemName: data.itemName,
      userName: data.userName,
      timestamp: new Date(),
    })
  })

  // Handle status updates
  socket.on("status-update", (data) => {
    // Notify specific user of status change
    io.to(`user-${data.userId}`).emit(`${data.type}-status-changed`, {
      itemId: data.itemId,
      status: data.status,
      message: data.message,
      timestamp: new Date(),
    })
  })

  // Handle new offers
  socket.on("new-offer", (data) => {
    // Notify specific shopkeeper of new offer
    io.to(`shopkeeper-${data.shopkeeperId}`).emit("offer-received", {
      offerId: data.offerId,
      returnId: data.returnId,
      itemName: data.itemName,
      offerPrice: data.offerPrice,
      timestamp: new Date(),
    })
  })

  // Handle offer responses
  socket.on("offer-response", (data) => {
    // Notify admins of offer response
    io.to("admin-room").emit("offer-responded", {
      offerId: data.offerId,
      shopkeeperId: data.shopkeeperId,
      status: data.status,
      timestamp: new Date(),
    })
  })

  // Handle general notifications
  socket.on("send-notification", (data) => {
    if (data.target === "all") {
      io.emit("notification", data)
    } else if (data.target.startsWith("user-")) {
      io.to(data.target).emit("notification", data)
    } else if (data.target === "admins") {
      io.to("admin-room").emit("notification", data)
    } else if (data.target === "shopkeepers") {
      io.to("shopkeepers-room").emit("notification", data)
    }
  })

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
  })
}

module.exports = {
  handleSocketConnection,
}
