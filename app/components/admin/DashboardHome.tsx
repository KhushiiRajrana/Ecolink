"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Heart, Store, TrendingUp, Users, Leaf } from "lucide-react"

export default function DashboardHome() {
  const stats = [
    {
      title: "Total Returns",
      value: "1,247",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Donations",
      value: "892",
      change: "+8%",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Rewear Sales",
      value: "₹45,230",
      change: "+15%",
      icon: Store,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Shopkeepers",
      value: "156",
      change: "+5%",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "CO₂ Saved (kg)",
      value: "2,840",
      change: "+18%",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Items Reused",
      value: "2,139",
      change: "+10%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Monitor your sustainable fashion platform performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New return submitted</p>
                  <p className="text-xs text-gray-600">Denim jacket from user #1247</p>
                </div>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Donation approved</p>
                  <p className="text-xs text-gray-600">Winter coat sent to Hope Foundation</p>
                </div>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Store className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Shopkeeper accepted offer</p>
                  <p className="text-xs text-gray-600">TrendyTailor accepted cotton shirt</p>
                </div>
                <span className="text-xs text-gray-500">12m ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Shopkeepers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">TrendyTailor</p>
                  <p className="text-sm text-gray-600">Sector 21</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹12,450</p>
                  <p className="text-sm text-green-600">+23%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">StyleHub</p>
                  <p className="text-sm text-gray-600">Sector 18</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹9,830</p>
                  <p className="text-sm text-green-600">+18%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">ClassicWear</p>
                  <p className="text-sm text-gray-600">Sector 22</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹8,920</p>
                  <p className="text-sm text-green-600">+15%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
