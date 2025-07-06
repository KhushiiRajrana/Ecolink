"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlySales = [
  { month: "Jan", sales: 12450, items: 89, avgPrice: 140 },
  { month: "Feb", sales: 15680, items: 112, avgPrice: 140 },
  { month: "Mar", sales: 18920, items: 135, avgPrice: 140 },
  { month: "Apr", sales: 22340, items: 159, avgPrice: 140 },
  { month: "May", sales: 28750, items: 205, avgPrice: 140 },
  { month: "Jun", sales: 32180, items: 230, avgPrice: 140 },
]

const categoryPerformance = [
  { category: "Shirts", sales: 8450, items: 67, avgPrice: 126 },
  { category: "Pants", sales: 6780, items: 45, avgPrice: 151 },
  { category: "Dresses", sales: 5920, items: 32, avgPrice: 185 },
  { category: "Jackets", sales: 4680, items: 18, avgPrice: 260 },
  { category: "Shoes", sales: 3890, items: 28, avgPrice: 139 },
  { category: "Accessories", sales: 2460, items: 40, avgPrice: 62 },
]

const shopkeeperPerformance = [
  { name: "TrendyTailor", value: 28, color: "#3b82f6" },
  { name: "StyleHub", value: 24, color: "#10b981" },
  { name: "ClassicWear", value: 19, color: "#f59e0b" },
  { name: "FashionForward", value: 16, color: "#ef4444" },
  { name: "Others", value: 13, color: "#8b5cf6" },
]

export default function SalesAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Sales Analytics</h1>
        <p className="text-gray-600 mt-2">Track shopkeeper performance and sales trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-[#0071ce] mb-2">₹32,180</div>
            <div className="text-sm text-gray-600">Total Sales</div>
            <div className="text-xs text-green-600 mt-1">+15% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">230</div>
            <div className="text-sm text-gray-600">Items Sold</div>
            <div className="text-xs text-green-600 mt-1">+12% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹140</div>
            <div className="text-sm text-gray-600">Avg. Price</div>
            <div className="text-xs text-purple-600 mt-1">Stable</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Active Shopkeepers</div>
            <div className="text-xs text-orange-600 mt-1">+5 new this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "sales" ? `₹${value}` : value,
                      name === "sales" ? "Sales" : "Items Sold",
                    ]}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="items" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shopkeeper Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shopkeeperPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {shopkeeperPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "sales" ? `₹${value}` : name === "avgPrice" ? `₹${value}` : value,
                    name === "sales" ? "Sales" : name === "avgPrice" ? "Avg Price" : "Items Sold",
                  ]}
                />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="items" fill="#10b981" name="Items" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 4)
                .map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">{category.category}</p>
                      <p className="text-sm text-blue-600">{category.items} items sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-800">₹{category.sales}</p>
                      <p className="text-sm text-blue-600">Avg: ₹{category.avgPrice}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50">
                <div>
                  <p className="font-medium">Vintage Denim Jacket</p>
                  <p className="text-sm text-gray-600">TrendyTailor • 2 hours ago</p>
                </div>
                <span className="font-bold text-green-600">₹299</span>
              </div>

              <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                <div>
                  <p className="font-medium">Cotton Summer Dress</p>
                  <p className="text-sm text-gray-600">StyleHub • 4 hours ago</p>
                </div>
                <span className="font-bold text-blue-600">₹199</span>
              </div>

              <div className="flex items-center justify-between p-3 border-l-4 border-purple-500 bg-purple-50">
                <div>
                  <p className="font-medium">Formal White Shirt</p>
                  <p className="text-sm text-gray-600">ClassicWear • 6 hours ago</p>
                </div>
                <span className="font-bold text-purple-600">₹149</span>
              </div>

              <div className="flex items-center justify-between p-3 border-l-4 border-orange-500 bg-orange-50">
                <div>
                  <p className="font-medium">Leather Boots</p>
                  <p className="text-sm text-gray-600">FashionForward • 8 hours ago</p>
                </div>
                <span className="font-bold text-orange-600">₹249</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
