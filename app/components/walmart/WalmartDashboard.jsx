"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Heart, CheckSquare, BarChart3 } from "lucide-react"
import WalmartReturns from "./WalmartReturns"
import WalmartDonations from "./WalmartDonations"
import QualityCheck from "./QualityCheck"
import WalmartHome from "./WalmartHome"

export default function WalmartDashboard({ onBack }) {
  const [currentView, setCurrentView] = useState("home")

  const menuItems = [
    { id: "home", label: "Dashboard", icon: BarChart3 },
    { id: "returns", label: "Return Requests", icon: Package },
    { id: "donations", label: "Donation Requests", icon: Heart },
    { id: "quality", label: "Quality Check", icon: CheckSquare },
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
            <h1 className="text-xl font-bold text-[#0071ce]">Walmart Employee</h1>
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
                    onClick={() => setCurrentView(item.id)}
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
        {currentView === "home" && <WalmartHome />}
        {currentView === "returns" && <WalmartReturns />}
        {currentView === "donations" && <WalmartDonations />}
        {currentView === "quality" && <QualityCheck />}
      </div>
    </div>
  )
}
