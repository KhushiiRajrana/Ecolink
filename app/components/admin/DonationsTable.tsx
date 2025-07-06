"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Heart, Eye } from "lucide-react"

const donationsData = [
  {
    id: "D001",
    itemName: "Warm Winter Coat",
    category: "Jackets",
    user: "Alice Johnson",
    status: "pending",
    submittedDate: "2024-01-15",
    condition: "Excellent",
    size: "L",
  },
  {
    id: "D002",
    itemName: "Kids School Uniform",
    category: "Uniforms",
    user: "Robert Davis",
    status: "approved",
    submittedDate: "2024-01-14",
    condition: "Good",
    size: "M",
  },
  {
    id: "D003",
    itemName: "Sports Shoes",
    category: "Shoes",
    user: "Lisa Wilson",
    status: "tagged",
    submittedDate: "2024-01-13",
    condition: "Good",
    size: "8",
  },
  {
    id: "D004",
    itemName: "Summer T-Shirt",
    category: "Shirts",
    user: "Tom Brown",
    status: "rejected",
    submittedDate: "2024-01-12",
    condition: "Poor",
    size: "S",
  },
  {
    id: "D005",
    itemName: "Formal Pants",
    category: "Pants",
    user: "Mary Garcia",
    status: "pending",
    submittedDate: "2024-01-11",
    condition: "Excellent",
    size: "M",
  },
]

const ngos = [
  { id: "N001", name: "Hope Foundation", location: "Sector 15" },
  { id: "N002", name: "Education First", location: "Sector 12" },
  { id: "N003", name: "Community Care", location: "Sector 19" },
  { id: "N004", name: "Helping Hands", location: "Sector 8" },
]

export default function DonationsTable() {
  const [donations, setDonations] = useState(donationsData)
  const [selectedNGO, setSelectedNGO] = useState<{ [key: string]: string }>({})

  const handleApprove = (donationId: string) => {
    setDonations(donations.map((item) => (item.id === donationId ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (donationId: string) => {
    setDonations(donations.map((item) => (item.id === donationId ? { ...item, status: "rejected" } : item)))
  }

  const handleApplyTag = (donationId: string) => {
    if (selectedNGO[donationId]) {
      setDonations(donations.map((item) => (item.id === donationId ? { ...item, status: "tagged" } : item)))
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
      case "tagged":
        return <Badge className="bg-purple-600">Tagged</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Donations Management</h1>
        <p className="text-gray-600 mt-2">Review and process clothing donations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donations Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{donation.itemName}</p>
                        <p className="text-sm text-gray-600">
                          {donation.category} • {donation.condition}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{donation.user}</TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell>{donation.size}</TableCell>
                    <TableCell>{donation.submittedDate}</TableCell>
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

                        {donation.status === "approved" && (
                          <div className="flex items-center gap-2">
                            <Select
                              value={selectedNGO[donation.id] || ""}
                              onValueChange={(value) => setSelectedNGO({ ...selectedNGO, [donation.id]: value })}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select NGO" />
                              </SelectTrigger>
                              <SelectContent>
                                {ngos.map((ngo) => (
                                  <SelectItem key={ngo.id} value={ngo.id}>
                                    {ngo.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              onClick={() => handleApplyTag(donation.id)}
                              disabled={!selectedNGO[donation.id]}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <Heart className="h-4 w-4" />
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
