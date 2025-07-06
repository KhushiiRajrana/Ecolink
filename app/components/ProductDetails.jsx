"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Heart, Share2, MapPin, Store, Truck, Shield, Leaf } from "lucide-react"

export default function ProductDetails({ product, onBack, onPurchase }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const sizes = ["XS", "S", "M", "L", "XL"]
  const reviews = [
    { name: "Priya S.", rating: 5, comment: "Great quality! Looks brand new.", date: "2 days ago" },
    { name: "Rahul M.", rating: 4, comment: "Good condition, fast delivery.", date: "1 week ago" },
    { name: "Anita K.", rating: 5, comment: "Perfect fit, sustainable choice!", date: "2 weeks ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0071ce] text-white p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Product Details</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Product Images */}
        <Card>
          <CardContent className="p-0">
            <div className="aspect-square bg-gray-200 rounded-t-lg relative">
              <img
                src={product.image || "/placeholder.svg?height=300&width=300"}
                alt={product.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={product.tag === "Rewear Label" ? "bg-blue-600" : "bg-green-600"}>{product.tag}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Info */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating || 4.5) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{product.rating || 4.5} (24 reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#0071ce]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{product.shopkeeper || product.ngo}</span>
              <MapPin className="h-4 w-4 text-gray-500 ml-2" />
              <span className="text-sm text-gray-600">{product.location}</span>
            </div>

            {/* Size Selection */}
            {product.tag === "Rewear Label" && (
              <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-[#0071ce]" : ""}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="font-medium">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onPurchase}
                className="w-full bg-[#0071ce] hover:bg-blue-700"
                disabled={product.tag === "Rewear Label" && !selectedSize}
              >
                {product.price === 0 ? "Request Item" : "Buy Now"}
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="sustainability">Impact</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 text-gray-600">Jackets</span>
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span>
                    <span className="ml-2 text-gray-600">Excellent</span>
                  </div>
                  <div>
                    <span className="font-medium">Material:</span>
                    <span className="ml-2 text-gray-600">100% Cotton</span>
                  </div>
                  <div>
                    <span className="font-medium">Brand:</span>
                    <span className="ml-2 text-gray-600">Levi's</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Free delivery within 2-3 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Quality verified by Walmart</span>
                </div>
              </TabsContent>

              <TabsContent value="sustainability" className="p-4 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Environmental Impact</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">2.3 kg</div>
                    <div className="text-xs text-green-700">CO₂ Saved</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">890 L</div>
                    <div className="text-xs text-blue-700">Water Saved</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  By choosing this rewear item, you're contributing to sustainable fashion and reducing environmental
                  impact.
                </p>
              </TabsContent>

              <TabsContent value="reviews" className="p-4 space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
