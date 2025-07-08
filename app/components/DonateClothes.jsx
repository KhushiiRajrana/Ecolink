"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"
import { donationsAPI } from "../../lib/api"
import { useSocket } from "../../hooks/useSocket"
import { useAuth } from "../../hooks/useAuth"
import { useToast } from "../../components/ui/use-toast"

export default function DonateClothes({ onBack }) {
  const { user } = useAuth()
  const { emitNewSubmission } = useSocket()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    item_name: "",
    category: "",
    condition_reported: "",
    size: "",
    description: "",
  })
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = [
    "Shirts",
    "Pants",
    "Dresses",
    "Jackets",
    "Shoes",
    "Accessories",
    "Sweaters",
    "Skirts",
    "Jeans",
    "T-Shirts",
    "Uniforms",
  ]

  const conditions = [
    { value: "excellent", label: "Excellent - Like new" },
    { value: "good", label: "Good - Minor wear" },
    { value: "fair", label: "Fair - Visible wear" },
    { value: "poor", label: "Poor - Significant wear" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    if (photos.length + files.length > 5) {
      toast({
        title: "Too many photos",
        description: "You can upload maximum 5 photos",
        variant: "destructive",
      })
      return
    }
    setPhotos((prev) => [...prev, ...files])
  }

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key])
      })
      photos.forEach((photo) => {
        submitData.append("photos", photo)
      })

      const response = await donationsAPI.submit(submitData)

      // Emit socket event for real-time notification
      emitNewSubmission({
        type: "donation",
        itemId: response.data.donation_id,
        itemName: formData.item_name,
        userName: user.name,
      })

      toast({
        title: "Donation Submitted Successfully!",
        description: `You earned ${response.data.points_earned} points for your donation.`,
      })

      // Reset form
      setFormData({
        item_name: "",
        category: "",
        condition_reported: "",
        size: "",
        description: "",
      })
      setPhotos([])

      onBack()
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.response?.data?.error || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Donate Clothes</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="item_name">Item Name *</Label>
                <Input
                  id="item_name"
                  value={formData.item_name}
                  onChange={(e) => handleInputChange("item_name", e.target.value)}
                  placeholder="e.g., Winter Coat"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  value={formData.condition_reported}
                  onValueChange={(value) => handleInputChange("condition_reported", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the item, brand, any special features..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Photos (Max 5)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">Click to upload photos</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                  </label>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-[#0071ce] hover:bg-[#005bb5]">
                  {loading ? "Submitting..." : "Submit Donation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
