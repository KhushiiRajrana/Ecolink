"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Clock, CheckCircle, XCircle } from "lucide-react"
import { donationsAPI } from "../../lib/api"
import { useToast } from "../../components/ui/use-toast"

export default function DonationStatus({ onBack }) {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      const response = await donationsAPI.getMyDonations()
      setDonations(response.data.donations)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch donations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "quality_check":
        return <Heart className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "tagged":
        return <Heart className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      quality_check: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      tagged: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
    }

    return (
      <Badge className={colors[status]}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace("_", " ")}</span>
      </Badge>
    )
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your donation is being reviewed by our team"
      case "quality_check":
        return "Your item is undergoing quality inspection"
      case "approved":
        return "Your donation has been approved and is ready for NGO assignment"
      case "rejected":
        return "Your donation was rejected. Please check admin notes for details"
      case "tagged":
        return "Your donation has been tagged for an NGO"
      case "delivered":
        return "Your donation has been successfully delivered to the NGO"
      default:
        return "Status unknown"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Donation Status</h1>
          </div>
          <div className="text-center py-8">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Donation Status</h1>
        </div>

        {donations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Donations Yet</h3>
              <p className="text-gray-500">You haven't submitted any donation requests yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{donation.item_name}</CardTitle>
                    {getStatusBadge(donation.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Category</p>
                        <p className="text-gray-800">{donation.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Condition Reported</p>
                        <p className="text-gray-800 capitalize">{donation.condition_reported}</p>
                      </div>
                      {donation.condition_actual && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Actual Condition</p>
                          <p className="text-gray-800 capitalize">{donation.condition_actual}</p>
                        </div>
                      )}
                      {donation.size && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Size</p>
                          <p className="text-gray-800">{donation.size}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Submitted Date</p>
                        <p className="text-gray-800">{new Date(donation.created_at).toLocaleDateString()}</p>
                      </div>
                      {donation.description && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Description</p>
                          <p className="text-gray-800">{donation.description}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {donation.photos && donation.photos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Photos</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {donation.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000"}${photo}`}
                            alt={`${donation.item_name} ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{getStatusMessage(donation.status)}</p>
                    {donation.admin_notes && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600">Admin Notes:</p>
                        <p className="text-sm text-gray-800">{donation.admin_notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
