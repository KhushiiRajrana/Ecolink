"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Star } from "lucide-react"

const qualityCheckItems = [
  {
    id: "QC001",
    itemName: "Vintage Denim Jacket",
    category: "Jackets",
    submittedBy: "John Doe",
    type: "return",
    photos: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    condition: "Good",
    estimatedValue: 299,
    status: "pending",
  },
  {
    id: "QC002",
    itemName: "Cotton Summer Dress",
    category: "Dresses",
    submittedBy: "Sarah Smith",
    type: "return",
    photos: ["/placeholder.svg?height=200&width=200"],
    condition: "Excellent",
    estimatedValue: 199,
    status: "pending",
  },
  {
    id: "QC003",
    itemName: "Kids School Uniform",
    category: "Uniforms",
    submittedBy: "Robert Davis",
    type: "donation",
    photos: ["/placeholder.svg?height=200&width=200"],
    condition: "Good",
    estimatedValue: 0,
    status: "pending",
  },
]

export default function QualityCheck() {
  const [items, setItems] = useState(qualityCheckItems)
  const [selectedItem, setSelectedItem] = useState(qualityCheckItems[0])
  const [qualityGrade, setQualityGrade] = useState("")
  const [notes, setNotes] = useState("")

  const handleApprove = () => {
    if (!qualityGrade) {
      alert("Please select a quality grade")
      return
    }

    setItems(
      items.map((item) => (item.id === selectedItem.id ? { ...item, status: "approved", qualityGrade, notes } : item)),
    )

    alert("Item approved and quality grade assigned!")
    setQualityGrade("")
    setNotes("")
  }

  const handleReject = () => {
    if (!notes) {
      alert("Please provide rejection notes")
      return
    }

    setItems(items.map((item) => (item.id === selectedItem.id ? { ...item, status: "rejected", notes } : item)))

    alert("Item rejected with notes!")
    setNotes("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending Check
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
        <h1 className="text-3xl font-bold text-gray-800">Quality Check</h1>
        <p className="text-gray-600 mt-2">Inspect and grade items for quality assurance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle>Items for Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedItem.id === item.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.photos[0] || "/placeholder.svg"}
                      alt={item.itemName}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.itemName}</p>
                      <p className="text-xs text-gray-600">{item.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(item.status)}
                        {item.qualityGrade && getGradeBadge(item.qualityGrade)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Item Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quality Inspection - {selectedItem.itemName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photos */}
            <div>
              <h3 className="font-semibold mb-3">Item Photos</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo || "/placeholder.svg"}
                    alt={`${selectedItem.itemName} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>

            {/* Item Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Category</h4>
                <p className="text-gray-600">{selectedItem.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Submitted By</h4>
                <p className="text-gray-600">{selectedItem.submittedBy}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Type</h4>
                <p className="text-gray-600 capitalize">{selectedItem.type}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Reported Condition</h4>
                <p className="text-gray-600">{selectedItem.condition}</p>
              </div>
            </div>

            {/* Quality Assessment */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quality Assessment</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality Grade</label>
                <Select value={qualityGrade} onValueChange={setQualityGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Grade A - Excellent (Like New)</SelectItem>
                    <SelectItem value="B">Grade B - Good (Minor Wear)</SelectItem>
                    <SelectItem value="C">Grade C - Fair (Visible Wear)</SelectItem>
                    <SelectItem value="D">Grade D - Poor (Significant Wear)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inspector Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add detailed notes about the item condition, any defects, or special observations..."
                  rows={4}
                />
              </div>
            </div>

            {/* Action Buttons */}
            {selectedItem.status === "pending" && (
              <div className="flex gap-3">
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Item
                </Button>
                <Button onClick={handleReject} variant="destructive" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Item
                </Button>
              </div>
            )}

            {selectedItem.status !== "pending" && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {selectedItem.status === "approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    Item {selectedItem.status === "approved" ? "Approved" : "Rejected"}
                  </span>
                </div>
                {selectedItem.qualityGrade && (
                  <p className="text-sm text-gray-600 mb-1">Quality Grade: {selectedItem.qualityGrade}</p>
                )}
                {selectedItem.notes && <p className="text-sm text-gray-600">Notes: {selectedItem.notes}</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quality Standards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Quality Grading Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-600">Grade A</Badge>
              </div>
              <p className="text-sm text-green-800">Excellent condition, like new, no visible wear</p>
            </div>
            <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-600">Grade B</Badge>
              </div>
              <p className="text-sm text-blue-800">Good condition, minor wear, fully functional</p>
            </div>
            <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-600">Grade C</Badge>
              </div>
              <p className="text-sm text-yellow-800">Fair condition, visible wear but usable</p>
            </div>
            <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-600">Grade D</Badge>
              </div>
              <p className="text-sm text-red-800">Poor condition, significant wear, may need repair</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
