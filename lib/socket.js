import { io } from "socket.io-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000"

class SocketManager {
  constructor() {
    this.socket = null
    this.isConnected = false
  }

  connect(userId, userRole) {
    if (this.socket) {
      this.disconnect()
    }

    this.socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    })

    this.socket.on("connect", () => {
      console.log("Connected to server")
      this.isConnected = true

      // Join appropriate rooms based on user role
      if (userId) {
        this.socket.emit("join-user-room", userId)
      }

      if (userRole === "admin") {
        this.socket.emit("join-admin-room")
      } else if (userRole === "shopkeeper") {
        this.socket.emit("join-shopkeeper-room", userId)
      }
    })

    this.socket.on("disconnect", () => {
      console.log("Disconnected from server")
      this.isConnected = false
    })

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data)
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }

  // Convenience methods for common events
  onReturnStatusChanged(callback) {
    this.on("return-status-changed", callback)
  }

  onDonationStatusChanged(callback) {
    this.on("donation-status-changed", callback)
  }

  onOfferReceived(callback) {
    this.on("offer-received", callback)
  }

  onNotification(callback) {
    this.on("notification", callback)
  }

  // Admin specific events
  onNewItemSubmitted(callback) {
    this.on("new-item-submitted", callback)
  }

  onOfferResponded(callback) {
    this.on("offer-responded", callback)
  }

  // Emit events
  notifyReturnStatusUpdate(data) {
    this.emit("return-status-update", data)
  }

  notifyDonationStatusUpdate(data) {
    this.emit("donation-status-update", data)
  }

  notifyNewOffer(data) {
    this.emit("new-offer", data)
  }

  notifyOfferResponse(data) {
    this.emit("offer-response", data)
  }

  notifyNewSubmission(data) {
    this.emit("new-submission", data)
  }

  sendNotification(data) {
    this.emit("send-notification", data)
  }
}

// Create singleton instance
const socketManager = new SocketManager()

export default socketManager
