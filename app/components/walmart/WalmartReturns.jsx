"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Store, Eye, Send } from "lucide-react"

const returnsData = [
  {
    id: "WR001",
    itemName: "Vintage Denim Jacket",
    category: "Jackets",
    user: "John Doe",
    status: "pending",
    submittedDate: "2024-01-15",
    condition: "Good",
    estimatedValue: 299,
    photos: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: "WR002",
    itemName: "Cotton Summer Dress",
    category: "Dresses",
    user: "Sarah Smith",
    status: "quality_check",
    submittedDate: "2024-01-14",
    condition: "Excellent",
    estimatedValue: 199,
    photos: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: "WR003",
    itemName: "Formal White Shirt",
    category: "Shirts",
    user: "Mike Johnson",
    status: "approved",
    submittedDate: "2024-01-13",
    condition: "Good",
    estimatedValue: 149,
    photos: ["/placeholder.svg?height=100&width=100"],
  },
]

const shopkeepers = [
  { id: "S001", name: "TrendyTailor", location: "Sector 21", speciality: "Jackets & Formal Wear" },
  { id: "S002", name: "StyleHub", location: "Sector 18", speciality: "Casual & Trendy" },
  { id: "S003", name: "ClassicWear", location: "Sector 22", speciality: "Formal & Business" },
]

export default function WalmartReturns() {
  const [returns, setReturns] = useState(returnsData)
  const [selectedShopkeeper, setSelectedShopkeeper] = useState({})

  const handleApprove = (returnId) => {
    setReturns(returns.map((item) => (item.id === returnId ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (returnId) => {
    setReturns(returns.map((item) => (item.id === returnId ? { ...item, status: "rejected" } : item)))
  }

  const handleSendToShopkeeper = (returnId) => {
    if (selectedShopkeeper[returnId]) {
      setReturns(returns.map((item) => (item.id === returnId ? { ...item, status: "sent_to_shopkeeper" } : item)))
      alert("Offer sent to shopkeeper successfully!")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending Review
          </Badge>
        )
      case "quality_check":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Quality Check
          </Badge>
        )
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "sent_to_shopkeeper":
        return <Badge className="bg-purple-600">Sent to Shopkeeper</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Return Requests</h1>
        <p className="text-gray-600 mt-2">Review and process customer return requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Item Details</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">{returnItem.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={returnItem.photos[0] || "/placeholder.svg"}
                          alt={returnItem.itemName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{returnItem.itemName}</p>
                          <p className="text-sm text-gray-600">
                            {returnItem.category} • {returnItem.condition}
                          </p>
                          <p className="text-xs text-gray-500">{returnItem.submittedDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{returnItem.user}</TableCell>
                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                    <TableCell>₹{returnItem.estimatedValue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {returnItem.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(returnItem.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(returnItem.id)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {returnItem.status === "approved" && (
                          <div className="flex items-center gap-2">
                            <Select
                              value={selectedShopkeeper[returnItem.id] || ""}
                              onValueChange={(value) =>
                                setSelectedShopkeeper({ ...selectedShopkeeper, [returnItem.id]: value })
                              }
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select shopkeeper" />
                              </SelectTrigger>
                              <SelectContent>
                                {shopkeepers.map((shopkeeper) => (
                                  <SelectItem key={shopkeeper.id} value={shopkeeper.id}>
                                    <div>
                                      <div className="font-medium">{shopkeeper.name}</div>
                                      <div className="text-xs text-gray-500">{shopkeeper.location}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              onClick={() => handleSendToShopkeeper(returnItem.id)}
                              disabled={!selectedShopkeeper[returnItem.id]}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shopkeeper Information */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Shopkeepers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shopkeepers.map((shopkeeper) => (
              <div key={shopkeeper.id} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold">{shopkeeper.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-1">{shopkeeper.location}</p>
                <p className="text-xs text-gray-500">{shopkeeper.speciality}</p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
