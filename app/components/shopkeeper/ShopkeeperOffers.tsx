"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, TrendingUp, Clock, DollarSign, Package, Star, Calendar } from "lucide-react"

const offersData = [
  {
    id: "SO001",
    itemName: "Vintage Denim Jacket",
    category: "Jackets",
    condition: "Good",
    qualityGrade: "B",
    estimatedValue: 299,
    suggestedPrice: 250,
    photos: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    status: "pending",
    receivedDate: "2024-01-15",
    analytics: {
      similarItemsSold: 8,
      avgSellTime: 3,
      avgSellingPrice: 275,
      demandLevel: "High",
      seasonalTrend: "Rising",
      profitMargin: 45,
    },
  },
  {
    id: "SO002",
    itemName: "Cotton Summer Dress",
    category: "Dresses",
    condition: "Excellent",
    qualityGrade: "A",
    estimatedValue: 199,
    suggestedPrice: 180,
    photos: ["/placeholder.svg?height=200&width=200"],
    status: "pending",
    receivedDate: "2024-01-14",
    analytics: {
      similarItemsSold: 12,
      avgSellTime: 2,
      avgSellingPrice: 195,
      demandLevel: "Very High",
      seasonalTrend: "Peak Season",
      profitMargin: 52,
    },
  },
  {
    id: "SO003",
    itemName: "Formal White Shirt",
    category: "Shirts",
    condition: "Good",
    qualityGrade: "B",
    estimatedValue: 149,
    suggestedPrice: 130,
    photos: ["/placeholder.svg?height=200&width=200"],
    status: "accepted",
    receivedDate: "2024-01-13",
    analytics: {
      similarItemsSold: 15,
      avgSellTime: 4,
      avgSellingPrice: 140,
      demandLevel: "Medium",
      seasonalTrend: "Stable",
      profitMargin: 38,
    },
  },
]

export default function ShopkeeperOffers() {
  const [offers, setOffers] = useState(offersData)
  const [selectedOffer, setSelectedOffer] = useState(offersData[0])

  const handleAccept = (offerId: string) => {
    setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, status: "accepted" } : offer)))
    alert("Offer accepted! The item will be delivered to your store within 2-3 business days.")
  }

  const handleReject = (offerId: string) => {
    setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, status: "rejected" } : offer)))
    alert("Offer rejected. The item will be offered to other shopkeepers.")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending Decision
          </Badge>
        )
      case "accepted":
        return <Badge className="bg-green-600">Accepted</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getDemandBadge = (level: string) => {
    const colors = {
      "Very High": "bg-green-600",
      High: "bg-blue-600",
      Medium: "bg-yellow-600",
      Low: "bg-red-600",
    }
    return <Badge className={colors[level as keyof typeof colors] || "bg-gray-600"}>{level} Demand</Badge>
  }

  const getGradeBadge = (grade: string) => {
    const gradeColors = {
      A: "bg-green-600",
      B: "bg-blue-600",
      C: "bg-yellow-600",
      D: "bg-red-600",
    }
    return <Badge className={gradeColors[grade as keyof typeof gradeColors] || "bg-gray-600"}>Grade {grade}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Product Offers</h1>
        <p className="text-gray-600 mt-2">Review offers from Walmart with detailed analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Offers List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedOffer.id === offer.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedOffer(offer)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={offer.photos[0] || "/placeholder.svg"}
                      alt={offer.itemName}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{offer.itemName}</p>
                      <p className="text-xs text-gray-600">{offer.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(offer.status)}
                        {getGradeBadge(offer.qualityGrade)}
                      </div>
                      <p className="text-sm font-bold text-[#0071ce] mt-1">₹{offer.suggestedPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Offer Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Offer Details - {selectedOffer.itemName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Item Details</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                {/* Photos */}
                <div>
                  <h3 className="font-semibold mb-3">Item Photos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedOffer.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo || "/placeholder.svg"}
                        alt={`${selectedOffer.itemName} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>

                {/* Item Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Category</h4>
                    <p className="text-gray-600">{selectedOffer.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Condition</h4>
                    <p className="text-gray-600">{selectedOffer.condition}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Quality Grade</h4>
                    <div className="mt-1">{getGradeBadge(selectedOffer.qualityGrade)}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Received Date</h4>
                    <p className="text-gray-600">{selectedOffer.receivedDate}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{selectedOffer.analytics.similarItemsSold}</div>
                      <div className="text-sm text-gray-600">Similar Items Sold</div>
                      <div className="text-xs text-gray-500">Last 30 days</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{selectedOffer.analytics.avgSellTime}</div>
                      <div className="text-sm text-gray-600">Avg. Days to Sell</div>
                      <div className="text-xs text-gray-500">For similar items</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{selectedOffer.analytics.avgSellingPrice}
                      </div>
                      <div className="text-sm text-gray-600">Avg. Selling Price</div>
                      <div className="text-xs text-gray-500">Market rate</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{selectedOffer.analytics.profitMargin}%</div>
                      <div className="text-sm text-gray-600">Expected Margin</div>
                      <div className="text-xs text-gray-500">Profit potential</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Market Demand</span>
                    {getDemandBadge(selectedOffer.analytics.demandLevel)}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Seasonal Trend</span>
                    <Badge className="bg-blue-600">{selectedOffer.analytics.seasonalTrend}</Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Pricing Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Estimated Market Value</span>
                        <span className="font-bold">₹{selectedOffer.estimatedValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span>Suggested Retail Price</span>
                        <span className="font-bold text-blue-600">₹{selectedOffer.suggestedPrice}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span>Expected Profit</span>
                        <span className="font-bold text-green-600">
                          ₹{Math.round((selectedOffer.analytics.avgSellingPrice - selectedOffer.suggestedPrice) * 0.7)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Market Comparison</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Your Store Average</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          ₹{selectedOffer.analytics.avgSellingPrice - 20} for {selectedOffer.category.toLowerCase()}
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Market Trend</span>
                        </div>
                        <p className="text-sm text-gray-600">Prices trending up 8% this month</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">Best Time to Sell</span>
                        </div>
                        <p className="text-sm text-gray-600">Current season is optimal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            {selectedOffer.status === "pending" && (
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => handleAccept(selectedOffer.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Offer
                </Button>
                <Button onClick={() => handleReject(selectedOffer.id)} variant="destructive" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Offer
                </Button>
              </div>
            )}

            {selectedOffer.status !== "pending" && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedOffer.status === "accepted" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    Offer {selectedOffer.status === "accepted" ? "Accepted" : "Rejected"}
                  </span>
                </div>
                {selectedOffer.status === "accepted" && (
                  <p className="text-sm text-gray-600 mt-1">
                    Item will be delivered to your store within 2-3 business days.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
