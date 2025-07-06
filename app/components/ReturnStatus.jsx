"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Store, Tag } from "lucide-react"

export default function ReturnStatus() {
  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Return Approved!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">Your item has been verified and approved for the Rewear program.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Return Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Return Approved</p>
              <p className="text-sm text-gray-600">Item verified by Walmart team</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Complete
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Store className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Offer Sent to Shopkeeper</p>
              <p className="text-sm text-gray-600">TrendyTailor, Sector 21</p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              In Progress
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Shopkeeper Accepted</p>
              <p className="text-sm text-gray-600">Ready for resale</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Complete
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Tag className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Rewear Label Applied</p>
              <p className="text-sm text-gray-600">Item now available in store</p>
            </div>
            <Badge className="bg-blue-600">Rewear Label</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">₹</span>
            </div>
            <h3 className="font-semibold text-yellow-800">Reward Earned</h3>
          </div>
          <p className="text-yellow-700">You've earned ₹50 Walmart Cash for this return!</p>
        </CardContent>
      </Card>
    </div>
  )
}
