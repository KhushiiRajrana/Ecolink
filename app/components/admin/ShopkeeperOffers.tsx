"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, TrendingUp, Clock } from "lucide-react"

const offersData = [
  {
    id: "O001",
    shopkeeper: "TrendyTailor",
    location: "Sector 21",
    itemName: "Vintage Denim Jacket",
    offerPrice: 299,
    status: "pending",
    sentDate: "2024-01-15",
    analytics: {
      similarItemsSold: 5,
      avgSellTime: 3,
      successRate: 85,
    },
  },
  {
    id: "O002",
    shopkeeper: "StyleHub",
    location: "Sector 18",
    itemName: "Cotton Summer Dress",
    offerPrice: 199,
    status: "accepted",
    sentDate: "2024-01-14",
    analytics: {
      similarItemsSold: 8,
      avgSellTime: 2,
      successRate: 92,
    },
  },
  {
    id: "O003",
    shopkeeper: "ClassicWear",
    location: "Sector 22",
    itemName: "Formal White Shirt",
    offerPrice: 149,
    status: "rejected",
    sentDate: "2024-01-13",
    analytics: {
      similarItemsSold: 3,
      avgSellTime: 5,
      successRate: 68,
    },
  },
  {
    id: "O004",
    shopkeeper: "FashionForward",
    location: "Sector 15",
    itemName: "Wool Sweater",
    offerPrice: 179,
    status: "pending",
    sentDate: "2024-01-12",
    analytics: {
      similarItemsSold: 6,
      avgSellTime: 4,
      successRate: 78,
    },
  },
  {
    id: "O005",
    shopkeeper: "TrendyTailor",
    location: "Sector 21",
    itemName: "Leather Boots",
    offerPrice: 249,
    status: "accepted",
    sentDate: "2024-01-11",
    analytics: {
      similarItemsSold: 4,
      avgSellTime: 6,
      successRate: 75,
    },
  },
]

export default function ShopkeeperOffers() {
  const [offers, setOffers] = useState(offersData)

  const handleAccept = (offerId: string) => {
    setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, status: "accepted" } : offer)))
  }

  const handleReject = (offerId: string) => {
    setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, status: "rejected" } : offer)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
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

  const pendingOffers = offers.filter((offer) => offer.status === "pending").length
  const acceptedOffers = offers.filter((offer) => offer.status === "accepted").length
  const rejectedOffers = offers.filter((offer) => offer.status === "rejected").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Shopkeeper Offers</h1>
        <p className="text-gray-600 mt-2">Manage offers sent to local shopkeepers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{pendingOffers}</div>
            <div className="text-sm text-gray-600">Pending Offers</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{acceptedOffers}</div>
            <div className="text-sm text-gray-600">Accepted Offers</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{rejectedOffers}</div>
            <div className="text-sm text-gray-600">Rejected Offers</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offer ID</TableHead>
                  <TableHead>Shopkeeper</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Analytics</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{offer.shopkeeper}</p>
                        <p className="text-sm text-gray-600">{offer.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>{offer.itemName}</TableCell>
                    <TableCell>₹{offer.offerPrice}</TableCell>
                    <TableCell>{getStatusBadge(offer.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="h-3 w-3 text-blue-600" />
                          <span>
                            {offer.analytics.similarItemsSold} similar sold in {offer.analytics.avgSellTime} days
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">Success rate: {offer.analytics.successRate}%</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {offer.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleAccept(offer.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(offer.id)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Shopkeepers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">StyleHub</p>
                <p className="text-sm text-green-600">Sector 18 • 92% success rate</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-800">₹12,450</p>
                <p className="text-sm text-green-600">This month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">TrendyTailor</p>
                <p className="text-sm text-blue-600">Sector 21 • 85% success rate</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-800">₹9,830</p>
                <p className="text-sm text-blue-600">This month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">FashionForward</p>
                <p className="text-sm text-purple-600">Sector 15 • 78% success rate</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-purple-800">₹8,920</p>
                <p className="text-sm text-purple-600">This month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
