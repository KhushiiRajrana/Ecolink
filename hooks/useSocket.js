"use client"

import { useEffect, useRef } from "react"
import socketManager from "../lib/socket"
import { useAuth } from "./useAuth"

export const useSocket = () => {
  const { user } = useAuth()
  const socketRef = useRef(null)

  useEffect(() => {
    if (user) {
      socketRef.current = socketManager.connect(user.id, user.role)
    }

    return () => {
      if (socketRef.current) {
        socketManager.disconnect()
      }
    }
  }, [user])

  const emit = (event, data) => {
    socketManager.emit(event, data)
  }

  const on = (event, callback) => {
    socketManager.on(event, callback)
  }

  const off = (event, callback) => {
    socketManager.off(event, callback)
  }

  // Convenience methods
  const emitNewSubmission = (data) => {
    emit("new-submission", data)
  }

  const emitStatusUpdate = (data) => {
    emit("status-update", data)
  }

  const emitNewOffer = (data) => {
    emit("new-offer", data)
  }

  const emitOfferResponse = (data) => {
    emit("offer-response", data)
  }

  const sendNotification = (data) => {
    emit("send-notification", data)
  }

  return {
    socket: socketRef.current,
    emit,
    on,
    off,
    emitNewSubmission,
    emitStatusUpdate,
    emitNewOffer,
    emitOfferResponse,
    sendNotification,
  }
}
