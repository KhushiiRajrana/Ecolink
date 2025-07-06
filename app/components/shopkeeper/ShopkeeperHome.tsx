"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, DollarSign, Users, Star, Calendar } from "lucide-react"

export default function ShopkeeperHome() {
  const stats = [
    {
      title: "Monthly Sales",
      value: "₹12,450",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Items Sold",
      value: "89",
      change: "+15%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Customer Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Pending Offers",
      value: "3",
      change: "New",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome, TrendyTailor!</h1>
        <p className="text-gray-600 mt-2">Your sustainable fashion business dashboard</p>
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
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Vintage Denim Jacket</p>
                  <p className="text-sm text-gray-600">Sold 2 hours ago</p>
                </div>
                <span className="font-bold text-green-600">₹299</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Cotton Summer Dress</p>
                  <p className="text-sm text-gray-600">Sold 1 day ago</p>
                </div>
                <span className="font-bold text-blue-600">₹199</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium">Formal White Shirt</p>
                  <p className="text-sm text-gray-600">Sold 2 days ago</p>
                </div>
                <span className="font-bold text-purple-600">₹149</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Top Category</span>
                </div>
                <p className="text-sm text-yellow-700">Jackets are your best-selling category this month</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Customer Satisfaction</span>
                </div>
                <p className="text-sm text-green-700">95% positive feedback this month</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Avg. Sale Time</span>
                </div>
                <p className="text-sm text-blue-700">Items sell within 3 days on average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sustainability Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">156</div>
              <div className="text-sm text-green-700">Items Given New Life</div>
              <div className="text-xs text-gray-600 mt-1">This month</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">2.8 kg</div>
              <div className="text-sm text-blue-700">CO₂ Emissions Saved</div>
              <div className="text-xs text-gray-600 mt-1">Per item average</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">1,240 L</div>
              <div className="text-sm text-purple-700">Water Saved</div>
              <div className="text-xs text-gray-600 mt-1">Through reuse</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
