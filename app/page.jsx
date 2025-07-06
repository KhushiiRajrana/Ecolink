"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Heart, Store, Gift, BarChart3 } from "lucide-react"

// Import components
import ReturnClothes from "./components/ReturnClothes"
import ReturnStatus from "./components/ReturnStatus"
import DonateClothes from "./components/DonateClothes"
import DonationStatus from "./components/DonationStatus"
import RewearStore from "./components/RewearStore"
import MyRewards from "./components/MyRewards"
import AdminDashboard from "./components/admin/AdminDashboard"

// Add imports for new components
import WalmartDashboard from "./components/walmart/WalmartDashboard"
import ShopkeeperDashboard from "./components/shopkeeper/ShopkeeperDashboard"

export default function EcoLinkPlus() {
  const [currentView, setCurrentView] = useState("home")
  // Add state for different user types
  const [userType, setUserType] = useState("customer")

  const navigateTo = (view) => {
    setCurrentView(view)
  }

  const goHome = () => {
    setCurrentView("home")
  }

  // Add conditions for different user types
  if (userType === "walmart") {
    return <WalmartDashboard onBack={() => setUserType("customer")} />
  }

  if (userType === "shopkeeper") {
    return <ShopkeeperDashboard onBack={() => setUserType("customer")} />
  }

  if (userType === "admin") {
    return <AdminDashboard onBack={() => setUserType("customer")} />
  }

  if (currentView !== "home") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#0071ce] text-white p-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={goHome} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">EcoLink+</h1>
        </div>

        <div className="p-4">
          {currentView === "return" && <ReturnClothes onNext={() => navigateTo("return-status")} />}
          {currentView === "return-status" && <ReturnStatus />}
          {currentView === "donate" && <DonateClothes onNext={() => navigateTo("donation-status")} />}
          {currentView === "donation-status" && <DonationStatus />}
          {currentView === "store" && <RewearStore />}
          {currentView === "rewards" && <MyRewards />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0071ce] text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">EcoLink+</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUserType("walmart")}
            className="text-white hover:bg-white/20"
          >
            Walmart
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUserType("shopkeeper")}
            className="text-white hover:bg-white/20"
          >
            Shopkeeper
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setUserType("admin")}
            className="text-white hover:bg-white/20"
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0071ce] to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Sustainable Fashion</h2>
        <p className="text-blue-100">Return, Donate & Rewear with Local Impact</p>
      </div>

      {/* Main Navigation Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigateTo("return")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-[#0071ce]" />
              </div>
              <h3 className="font-semibold text-gray-800">Return Clothes</h3>
              <p className="text-sm text-gray-600 mt-1">Send items to Walmart</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigateTo("donate")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Donate Clothes</h3>
              <p className="text-sm text-gray-600 mt-1">Help those in need</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigateTo("store")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Store className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Rewear Store</h3>
              <p className="text-sm text-gray-600 mt-1">Shop sustainable</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigateTo("rewards")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">My Rewards</h3>
              <p className="text-sm text-gray-600 mt-1">Track your impact</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 pb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-gray-800">Community Impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#0071ce]">2.4K</div>
                <div className="text-xs text-gray-600">Items Reworn</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">1.8K</div>
                <div className="text-xs text-gray-600">CO₂ Saved (kg)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-xs text-gray-600">Local Partners</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
