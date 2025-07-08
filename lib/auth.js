"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { authAPI } from "./api"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setLoading(false)
        return
      }

      const response = await authAPI.getCurrentUser()
      setUser(response.data.user)
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { token, user } = response.data

      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_data", JSON.stringify(user))
      setUser(user)

      return { success: true, user }
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
      const { token, user } = response.data

      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_data", JSON.stringify(user))
      setUser(user)

      return { success: true, user }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
    localStorage.setItem("user_data", JSON.stringify({ ...user, ...userData }))
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
// ...existing code...

// Utility functions for auth data management
export function getStoredUser() {
  const user = localStorage.getItem("user_data")
  return user ? JSON.parse(user) : null
}

export function getStoredToken() {
  return localStorage.getItem("auth_token")
}

export function setAuthData({ token, user }) {
  localStorage.setItem("auth_token", token)
  localStorage.setItem("user_data", JSON.stringify(user))
}

export function clearAuthData() {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user_data")
}
