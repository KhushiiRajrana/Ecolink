"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Camera } from "lucide-react"

export default function ReturnClothes({ onNext }) {
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
            <Camera className="h-5 w-5 text-[#0071ce]" />
            Return Your Clothes
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
            <Label htmlFor="condition">Condition Notes (Optional)</Label>
            <Input id="condition" placeholder="Describe the condition of the item" className="mt-2" />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || !category || isSubmitting}
            className="w-full bg-[#0071ce] hover:bg-blue-700"
          >
            {isSubmitting ? "Sending to Walmart Center..." : "Send to Walmart Center"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Upload a clear photo of your item</li>
            <li>2. Select the appropriate category</li>
            <li>3. We'll verify and find local partners</li>
            <li>4. Earn Walmart Cash for approved returns</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
