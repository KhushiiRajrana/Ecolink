"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const co2Data = [
  { name: "CO₂ Saved", value: 2840, color: "#10b981" },
  { name: "CO₂ Potential", value: 1160, color: "#e5e7eb" },
]

const reuseData = [
  { name: "Items Reused", value: 2139, color: "#3b82f6" },
  { name: "Items Disposed", value: 861, color: "#ef4444" },
]

const monthlyImpact = [
  { month: "Jan", co2Saved: 180, itemsReused: 145, waterSaved: 2400 },
  { month: "Feb", co2Saved: 220, itemsReused: 178, waterSaved: 2890 },
  { month: "Mar", co2Saved: 280, itemsReused: 234, waterSaved: 3650 },
  { month: "Apr", co2Saved: 320, itemsReused: 267, waterSaved: 4200 },
  { month: "May", co2Saved: 380, itemsReused: 298, waterSaved: 4850 },
  { month: "Jun", co2Saved: 420, itemsReused: 345, waterSaved: 5400 },
]

const COLORS = ["#10b981", "#e5e7eb", "#3b82f6", "#ef4444"]

export default function ImpactChart() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Environmental Impact</h1>
        <p className="text-gray-600 mt-2">Track the positive environmental effects of the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2,840</div>
            <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
            <div className="text-xs text-green-600 mt-1">+18% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2,139</div>
            <div className="text-sm text-gray-600">Items Reused</div>
            <div className="text-xs text-blue-600 mt-1">71% reuse rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">28,450</div>
            <div className="text-sm text-gray-600">Water Saved (L)</div>
            <div className="text-xs text-purple-600 mt-1">+22% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">Families Helped</div>
            <div className="text-xs text-orange-600 mt-1">Through donations</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CO₂ Impact Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={co2Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {co2Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} kg`, "CO₂"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Saved (71%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm">Potential (29%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Item Reuse Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reuseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {reuseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, "Items"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Reused (71%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Disposed (29%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Impact Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyImpact}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="co2Saved" fill="#10b981" name="CO₂ Saved (kg)" />
                <Bar dataKey="itemsReused" fill="#3b82f6" name="Items Reused" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
