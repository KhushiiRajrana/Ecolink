"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Leaf, Package, Heart, TrendingUp, Award } from "lucide-react"

export default function MyRewards() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My Impact</h2>
        <p className="text-gray-600">Track your sustainable fashion journey</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="h-6 w-6 text-[#0071ce]" />
            </div>
            <div className="text-2xl font-bold text-[#0071ce]">12</div>
            <div className="text-sm text-gray-600">Items Returned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Items Donated</div>
          </CardContent>
        </Card>
      </div>

      {/* Walmart Cash */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Gift className="h-5 w-5" />
            Walmart Cash Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-600 mb-2">₹650</div>
          <p className="text-yellow-700 text-sm">Available for your next purchase</p>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to next reward</span>
              <span>₹350 more</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Leaf className="h-5 w-5" />
            Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-green-700">CO₂ Saved</span>
            <span className="text-2xl font-bold text-green-600">28.5 kg</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-700">Water Saved</span>
            <span className="text-2xl font-bold text-green-600">1,240 L</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-700">Items Reused</span>
            <span className="text-2xl font-bold text-green-600">20</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Returned Denim Jacket</p>
              <p className="text-xs text-gray-600">2 days ago</p>
            </div>
            <Badge className="bg-blue-600">+₹50</Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Donated Winter Coat</p>
              <p className="text-xs text-gray-600">5 days ago</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Impact
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Returned Cotton Shirt</p>
              <p className="text-xs text-gray-600">1 week ago</p>
            </div>
            <Badge className="bg-blue-600">+₹30</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl mb-1">🌟</div>
              <div className="text-sm font-medium text-yellow-800">First Return</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl mb-1">💚</div>
              <div className="text-sm font-medium text-green-800">Kind Heart</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl mb-1">♻️</div>
              <div className="text-sm font-medium text-blue-800">Eco Warrior</div>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg border border-gray-200">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-sm font-medium text-gray-600">Coming Soon</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
