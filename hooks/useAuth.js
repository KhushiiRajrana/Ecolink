"use client"

import { useState, useEffect, createContext } from "react"
import { authAPI } from "../lib/api"
import { getStoredUser, getStoredToken, setAuthData, clearAuthData } from "../lib/auth"
import socketManager from "../lib/socket"
import { useAuth as useAuthContext } from "../lib/auth"

const AuthContext = createContext()

export const useAuth = () => {
  return useAuthContext()
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = getStoredUser()
      const storedToken = getStoredToken()

      if (storedUser && storedToken) {
        try {
          // Verify token is still valid
          const response = await authAPI.getProfile()
          setUser(response.data.user)

          // Connect to socket
          socketManager.connect(response.data.user.id, response.data.user.role)
        } catch (error) {
          console.error("Token validation failed:", error)
          clearAuthData()
        }
      }
      setLoading(false)
    }

    initAuth()

    return () => {
      socketManager.disconnect()
    }
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { user: userData, token } = response.data

      setUser(userData)
      setAuthData(userData, token)

      // Connect to socket
      socketManager.connect(userData.id, userData.role)

      return { success: true, user: userData }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      const { user: newUser, token } = response.data

      setUser(newUser)
      setAuthData(newUser, token)

      // Connect to socket
      socketManager.connect(newUser.id, newUser.role)

      return { success: true, user: newUser }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      }
    }
  }

  const logout = () => {
    setUser(null)
    clearAuthData()
    socketManager.disconnect()
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    setAuthData(updatedUser, getStoredToken())
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isShopkeeper: user?.role === "shopkeeper",
    isCustomer: user?.role === "customer",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
