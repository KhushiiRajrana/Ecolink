"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Heart } from "lucide-react"

export default function DonateClothes({ onNext }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      // Reset form after submission
      setSelectedFile(null)
      setCategory("")
      onNext()
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Donate Your Clothes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="photo">Upload Photo of Item</Label>
            <div className="mt-2">
              <Input id="photo" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <Label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">{selectedFile ? selectedFile : "Click to upload photo"}</span>
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select clothing category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shirts">Shirts</SelectItem>
                <SelectItem value="pants">Pants</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="jackets">Jackets</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="size">Size</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
                <SelectItem value="xxl">XXL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || !category || isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Sending to Donation Center..." : "Send to Donation Center"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 mb-2">Your donation helps:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Provide clothing to underserved communities</li>
            <li>• Support local NGOs and charities</li>
            <li>• Reduce textile waste in landfills</li>
            <li>• Create sustainable fashion cycles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
