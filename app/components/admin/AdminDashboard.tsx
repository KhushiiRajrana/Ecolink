"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, Package, Heart, Store, TrendingUp, Users, Settings } from "lucide-react"
import DashboardHome from "./DashboardHome"
import ReturnsTable from "./ReturnsTable"
import DonationsTable from "./DonationsTable"
import InventoryChart from "./InventoryChart"
import ImpactChart from "./ImpactChart"
import ShopkeeperOffers from "./ShopkeeperOffers"
import SalesAnalytics from "./SalesAnalytics"

type AdminView = "dashboard" | "returns" | "donations" | "inventory" | "impact" | "offers" | "sales"

interface AdminDashboardProps {
  onBack: () => void
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "returns", label: "Returns", icon: Package },
    { id: "donations", label: "Donations", icon: Heart },
    { id: "inventory", label: "Inventory", icon: Store },
    { id: "impact", label: "Impact", icon: TrendingUp },
    { id: "offers", label: "Shopkeeper Offers", icon: Users },
    { id: "sales", label: "Sales Analytics", icon: Settings },
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
            <h1 className="text-xl font-bold text-[#0071ce]">EcoLink+ Admin</h1>
          </div>
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
                    onClick={() => setCurrentView(item.id as AdminView)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentView === "dashboard" && <DashboardHome />}
        {currentView === "returns" && <ReturnsTable />}
        {currentView === "donations" && <DonationsTable />}
        {currentView === "inventory" && <InventoryChart />}
        {currentView === "impact" && <ImpactChart />}
        {currentView === "offers" && <ShopkeeperOffers />}
        {currentView === "sales" && <SalesAnalytics />}
      </div>
    </div>
  )
}
