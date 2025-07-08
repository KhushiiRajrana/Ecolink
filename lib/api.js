import axios from "axios"
import toast from "react-hot-toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      window.location.href = "/login"
    } else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.")
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error)
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getCurrentUser: () => api.get("/auth/me"),
}

// Returns API
export const returnsAPI = {
  submit: (formData) =>
    api.post("/returns", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getMyReturns: () => api.get("/returns/my-returns"),
  getAllReturns: () => api.get("/returns"),
  updateStatus: (id, data) => api.put(`/returns/${id}/status`, data),
}

// Donations API
export const donationsAPI = {
  submit: (formData) =>
    api.post("/donations", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getMyDonations: () => api.get("/donations/my-donations"),
  getAllDonations: () => api.get("/donations"),
  updateStatus: (id, data) => api.put(`/donations/${id}/status`, data),
  getNGOs: () => api.get("/donations/ngos"),
}

// Products API
export const productsAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  purchase: (id, purchaseData) => api.post(`/products/${id}/purchase`, purchaseData),
  addReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
  getCategories: () => api.get("/products/categories/list"),
}

// Shopkeepers API
export const shopkeepersAPI = {
  getDashboard: () => api.get("/shopkeepers/dashboard"),
  getOffers: () => api.get("/shopkeepers/offers"),
  respondToOffer: (id, data) => api.put(`/shopkeepers/offers/${id}`, data),
  getProducts: () => api.get("/shopkeepers/products"),
  getAll: () => api.get("/shopkeepers"),
  getAnalytics: () => api.get("/shopkeepers/analytics"),
}

// Admin API
export const adminAPI = {
  getDashboard: () => api.get("/admin/dashboard"),
  sendOffer: (data) => api.post("/admin/offers", data),
  getUsers: (params) => api.get("/admin/users", { params }),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  getHealth: () => api.get("/admin/health"),
  getShopkeepers: () => api.get("/admin/shopkeepers"),
}

// Analytics API
export const analyticsAPI = {
  getUserAnalytics: (id) => api.get(`/analytics/user/${id}`),
  getSystemAnalytics: () => api.get("/analytics/system"),
}

// Upload API
export const uploadAPI = {
  single: (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return api.post("/upload/single", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
  multiple: (files) => {
    const formData = new FormData()
    files.forEach((file) => formData.append("files", file))
    return api.post("/upload/multiple", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
}

export default api
