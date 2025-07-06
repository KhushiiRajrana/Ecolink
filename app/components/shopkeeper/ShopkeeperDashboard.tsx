"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Store, Bell } from "lucide-react"
import ShopkeeperOffers from "./ShopkeeperOffers"
import ShopkeeperHome from "./ShopkeeperHome"

type ShopkeeperView = "home" | "offers"

interface ShopkeeperDashboardProps {
  onBack: () => void
}

export default function ShopkeeperDashboard({ onBack }: ShopkeeperDashboardProps) {
  const [currentView, setCurrentView] = useState<ShopkeeperView>("home")

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Store },
    { id: "offers", label: "Product Offers", icon: Package },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-600 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-[#0071ce]">TrendyTailor</h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">Sector 21, Gurgaon</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <Button
                    variant={currentView === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      currentView === item.id ? "bg-[#0071ce] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentView(item.id as ShopkeeperView)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                    {item.id === "offers" && <Bell className="h-3 w-3 ml-auto text-red-500" />}
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentView === "home" && <ShopkeeperHome />}
        {currentView === "offers" && <ShopkeeperOffers />}
      </div>
    </div>
  )
}
