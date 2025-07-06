"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Heart, CheckSquare, Clock } from "lucide-react"

export default function WalmartHome() {
  const stats = [
    {
      title: "Pending Returns",
      value: "23",
      change: "+5 today",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Donations",
      value: "18",
      change: "+3 today",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Quality Checks",
      value: "12",
      change: "Awaiting review",
      icon: CheckSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Processing Time",
      value: "2.3 hrs",
      change: "Average",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Walmart Employee Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage returns, donations, and quality checks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
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
                  <p className="text-sm font-medium">New return request</p>
                  <p className="text-xs text-gray-600">Denim jacket from John Doe</p>
                </div>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Donation approved</p>
                  <p className="text-xs text-gray-600">Winter coat from Sarah Smith</p>
                </div>
                <span className="text-xs text-gray-500">12m ago</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Quality check completed</p>
                  <p className="text-xs text-gray-600">Cotton shirt - Grade A</p>
                </div>
                <span className="text-xs text-gray-500">25m ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-red-800">Urgent Quality Check</span>
                  <span className="text-xs text-red-600">2 hours overdue</span>
                </div>
                <p className="text-sm text-red-700">Leather boots - Customer complaint</p>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-yellow-800">High Value Return</span>
                  <span className="text-xs text-yellow-600">₹2,500</span>
                </div>
                <p className="text-sm text-yellow-700">Designer jacket - Needs verification</p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">Bulk Donation</span>
                  <span className="text-xs text-blue-600">15 items</span>
                </div>
                <p className="text-sm text-blue-700">School uniforms from corporate donor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
