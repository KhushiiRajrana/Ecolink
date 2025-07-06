"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Store, Eye } from "lucide-react"

const returnsData = [
  {
    id: "R001",
    itemName: "Vintage Denim Jacket",
    category: "Jackets",
    user: "John Doe",
    status: "pending",
    submittedDate: "2024-01-15",
    condition: "Good",
    estimatedValue: 299,
  },
  {
    id: "R002",
    itemName: "Cotton Summer Dress",
    category: "Dresses",
    user: "Sarah Smith",
    status: "approved",
    submittedDate: "2024-01-14",
    condition: "Excellent",
    estimatedValue: 199,
  },
  {
    id: "R003",
    itemName: "Formal White Shirt",
    category: "Shirts",
    user: "Mike Johnson",
    status: "offered",
    submittedDate: "2024-01-13",
    condition: "Good",
    estimatedValue: 149,
  },
  {
    id: "R004",
    itemName: "Leather Boots",
    category: "Shoes",
    user: "Emma Wilson",
    status: "rejected",
    submittedDate: "2024-01-12",
    condition: "Poor",
    estimatedValue: 0,
  },
  {
    id: "R005",
    itemName: "Wool Sweater",
    category: "Sweaters",
    user: "David Brown",
    status: "pending",
    submittedDate: "2024-01-11",
    condition: "Good",
    estimatedValue: 179,
  },
]

const shopkeepers = [
  { id: "S001", name: "TrendyTailor", location: "Sector 21" },
  { id: "S002", name: "StyleHub", location: "Sector 18" },
  { id: "S003", name: "ClassicWear", location: "Sector 22" },
  { id: "S004", name: "FashionForward", location: "Sector 15" },
]

export default function ReturnsTable() {
  const [returns, setReturns] = useState(returnsData)
  const [selectedShopkeeper, setSelectedShopkeeper] = useState<{ [key: string]: string }>({})

  const handleApprove = (returnId: string) => {
    setReturns(returns.map((item) => (item.id === returnId ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (returnId: string) => {
    setReturns(returns.map((item) => (item.id === returnId ? { ...item, status: "rejected" } : item)))
  }

  const handleOfferToShopkeeper = (returnId: string) => {
    if (selectedShopkeeper[returnId]) {
      setReturns(returns.map((item) => (item.id === returnId ? { ...item, status: "offered" } : item)))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "offered":
        return <Badge className="bg-blue-600">Offered</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Returns Management</h1>
        <p className="text-gray-600 mt-2">Review and process clothing returns</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Returns Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">{returnItem.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{returnItem.itemName}</p>
                        <p className="text-sm text-gray-600">
                          {returnItem.category} • {returnItem.condition}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{returnItem.user}</TableCell>
                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                    <TableCell>₹{returnItem.estimatedValue}</TableCell>
                    <TableCell>{returnItem.submittedDate}</TableCell>
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
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select shopkeeper" />
                              </SelectTrigger>
                              <SelectContent>
                                {shopkeepers.map((shopkeeper) => (
                                  <SelectItem key={shopkeeper.id} value={shopkeeper.id}>
                                    {shopkeeper.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              onClick={() => handleOfferToShopkeeper(returnItem.id)}
                              disabled={!selectedShopkeeper[returnItem.id]}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Store className="h-4 w-4" />
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
    </div>
  )
}
