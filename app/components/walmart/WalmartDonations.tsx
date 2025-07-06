"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Eye, Heart } from "lucide-react"

const donationsData = [
  {
    id: "WD001",
    itemName: "Warm Winter Coat",
    category: "Jackets",
    user: "Alice Johnson",
    status: "pending",
    submittedDate: "2024-01-15",
    condition: "Excellent",
    size: "L",
    photos: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: "WD002",
    itemName: "Kids School Uniform",
    category: "Uniforms",
    user: "Robert Davis",
    status: "quality_check",
    submittedDate: "2024-01-14",
    condition: "Good",
    size: "M",
    photos: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: "WD003",
    itemName: "Sports Shoes",
    category: "Shoes",
    user: "Lisa Wilson",
    status: "approved",
    submittedDate: "2024-01-13",
    condition: "Good",
    size: "8",
    photos: ["/placeholder.svg?height=100&width=100"],
  },
]

export default function WalmartDonations() {
  const [donations, setDonations] = useState(donationsData)

  const handleApprove = (donationId: string) => {
    setDonations(donations.map((item) => (item.id === donationId ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (donationId: string) => {
    setDonations(donations.map((item) => (item.id === donationId ? { ...item, status: "rejected" } : item)))
  }

  const getStatusBadge = (status: string) => {
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
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Donation Requests</h1>
        <p className="text-gray-600 mt-2">Review and process customer donation requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Item Details</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={donation.photos[0] || "/placeholder.svg"}
                          alt={donation.itemName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{donation.itemName}</p>
                          <p className="text-sm text-gray-600">
                            {donation.category} • {donation.condition}
                          </p>
                          <p className="text-xs text-gray-500">{donation.submittedDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{donation.user}</TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell>{donation.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {donation.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(donation.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(donation.id)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-600" />
              Donation Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">142</div>
                <div className="text-sm text-green-700">Items Donated</div>
                <div className="text-xs text-gray-600">This month</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">89</div>
                <div className="text-sm text-blue-700">Families Helped</div>
                <div className="text-xs text-gray-600">This month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner NGOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">Hope Foundation</p>
                  <p className="text-sm text-green-600">Sector 15 • 45 items received</p>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Education First</p>
                  <p className="text-sm text-blue-600">Sector 12 • 32 items received</p>
                </div>
                <Badge className="bg-blue-600">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-800">Community Care</p>
                  <p className="text-sm text-purple-600">Sector 19 • 28 items received</p>
                </div>
                <Badge className="bg-purple-600">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
