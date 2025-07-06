"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Eye, MapPin } from "lucide-react"

export default function DonationStatus() {
  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Donation Approved!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">Your donation has been processed and is now helping someone in need.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Donation Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Donation Received</p>
              <p className="text-sm text-gray-600">Item verified and processed</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Complete
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Donated Rewear Tag Applied</p>
              <p className="text-sm text-gray-600">Available for community access</p>
            </div>
            <Badge className="bg-green-600">Donated Rewear</Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Sent to Local NGO</p>
              <p className="text-sm text-gray-600">Hope Foundation, Sector 15</p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Delivered
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Item in Donated Store</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              View Item
            </Button>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <div className="flex-1">
                <p className="font-medium">Blue Cotton Shirt</p>
                <p className="text-sm text-gray-600">Size: M • Category: Shirts</p>
                <Badge className="bg-green-600 mt-1">Free</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Impact Created</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">2.3 kg</div>
              <div className="text-xs text-blue-700">CO₂ Saved</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">1</div>
              <div className="text-xs text-blue-700">Person Helped</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
