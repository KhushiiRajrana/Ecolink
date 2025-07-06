"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const inventoryData = [
  { category: "Shirts", shortage: 45, available: 120, demand: 165 },
  { category: "Pants", shortage: 32, available: 89, demand: 121 },
  { category: "Dresses", shortage: 28, available: 67, demand: 95 },
  { category: "Jackets", shortage: 15, available: 34, demand: 49 },
  { category: "Shoes", shortage: 38, available: 78, demand: 116 },
  { category: "Accessories", shortage: 12, available: 45, demand: 57 },
]

export default function InventoryChart() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Inventory Analysis</h1>
        <p className="text-gray-600 mt-2">Track clothing shortages and demand patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">170</div>
            <div className="text-sm text-gray-600">Total Shortage</div>
            <div className="text-xs text-red-600 mt-1">Items needed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">433</div>
            <div className="text-sm text-gray-600">Available Items</div>
            <div className="text-xs text-blue-600 mt-1">In inventory</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">603</div>
            <div className="text-sm text-gray-600">Total Demand</div>
            <div className="text-xs text-green-600 mt-1">Community need</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clothing Shortage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="shortage" fill="#ef4444" name="Shortage" />
                <Bar dataKey="available" fill="#3b82f6" name="Available" />
                <Bar dataKey="demand" fill="#10b981" name="Demand" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Critical Shortages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryData
                .sort((a, b) => b.shortage - a.shortage)
                .slice(0, 4)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">{item.category}</p>
                      <p className="text-sm text-red-600">{item.shortage} items needed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Demand: {item.demand}</p>
                      <p className="text-sm text-gray-600">Available: {item.available}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Well Stocked Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryData
                .sort((a, b) => a.shortage - b.shortage)
                .slice(0, 4)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{item.category}</p>
                      <p className="text-sm text-green-600">Good availability</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Available: {item.available}</p>
                      <p className="text-sm text-gray-600">Shortage: {item.shortage}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
