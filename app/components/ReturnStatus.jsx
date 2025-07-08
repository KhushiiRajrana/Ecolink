"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { returnsAPI } from "../../lib/api"
import { useToast } from "../../components/ui/use-toast"

export default function ReturnStatus({ onBack }) {
  const [returns, setReturns] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchReturns()
  }, [])

  const fetchReturns = async () => {
    try {
      const response = await returnsAPI.getMyReturns()
      setReturns(response.data.returns)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch returns",
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
        return <Package className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "offered":
        return <Package className="h-4 w-4" />
      case "sold":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "secondary",
      quality_check: "secondary",
      approved: "default",
      rejected: "destructive",
      offered: "secondary",
      sold: "default",
    }

    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      quality_check: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      offered: "bg-purple-100 text-purple-800",
      sold: "bg-green-100 text-green-800",
    }

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace("_", " ")}</span>
      </Badge>
    )
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your return is being reviewed by our team"
      case "quality_check":
        return "Your item is undergoing quality inspection"
      case "approved":
        return "Your return has been approved and is ready for shopkeeper offers"
      case "rejected":
        return "Your return was rejected. Please check admin notes for details"
      case "offered":
        return "Your item has been offered to shopkeepers"
      case "sold":
        return "Congratulations! Your item has been sold"
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
            <h1 className="text-2xl font-bold text-gray-800">Return Status</h1>
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
          <h1 className="text-2xl font-bold text-gray-800">Return Status</h1>
        </div>

        {returns.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Returns Yet</h3>
              <p className="text-gray-500">You haven't submitted any return requests yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {returns.map((returnItem) => (
              <Card key={returnItem.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{returnItem.item_name}</CardTitle>
                    {getStatusBadge(returnItem.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Category</p>
                        <p className="text-gray-800">{returnItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Condition Reported</p>
                        <p className="text-gray-800 capitalize">{returnItem.condition_reported}</p>
                      </div>
                      {returnItem.condition_actual && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Actual Condition</p>
                          <p className="text-gray-800 capitalize">{returnItem.condition_actual}</p>
                        </div>
                      )}
                      {returnItem.quality_grade && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Quality Grade</p>
                          <Badge className="bg-blue-100 text-blue-800">Grade {returnItem.quality_grade}</Badge>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Estimated Value</p>
                        <p className="text-gray-800">₹{returnItem.estimated_value || "Not specified"}</p>
                      </div>
                      {returnItem.actual_value && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Actual Value</p>
                          <p className="text-gray-800">₹{returnItem.actual_value}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-600">Submitted Date</p>
                        <p className="text-gray-800">{new Date(returnItem.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {returnItem.photos && returnItem.photos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Photos</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {returnItem.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000"}${photo}`}
                            alt={`${returnItem.item_name} ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{getStatusMessage(returnItem.status)}</p>
                    {returnItem.admin_notes && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600">Admin Notes:</p>
                        <p className="text-sm text-gray-800">{returnItem.admin_notes}</p>
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
