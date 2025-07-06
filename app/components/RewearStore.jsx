"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Heart, MapPin, Star } from "lucide-react"
import ProductDetails from "./ProductDetails"

const rewearItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    shopkeeper: "TrendyTailor",
    location: "Sector 21",
    price: 299,
    originalPrice: 899,
    image: "/placeholder.svg?height=150&width=150",
    tag: "Rewear Label",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Cotton Summer Dress",
    shopkeeper: "StyleHub",
    location: "Sector 18",
    price: 199,
    originalPrice: 599,
    image: "/placeholder.svg?height=150&width=150",
    tag: "Rewear Label",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Formal White Shirt",
    shopkeeper: "ClassicWear",
    location: "Sector 22",
    price: 149,
    originalPrice: 449,
    image: "/placeholder.svg?height=150&width=150",
    tag: "Rewear Label",
    rating: 4.3,
  },
]

const donatedItems = [
  {
    id: 4,
    title: "Warm Winter Coat",
    ngo: "Hope Foundation",
    location: "Sector 15",
    price: 0,
    image: "/placeholder.svg?height=150&width=150",
    tag: "Donated Free",
    available: true,
  },
  {
    id: 5,
    title: "Kids School Uniform",
    ngo: "Education First",
    location: "Sector 12",
    price: 30,
    image: "/placeholder.svg?height=150&width=150",
    tag: "Donated ₹30",
    available: true,
  },
  {
    id: 6,
    title: "Sports Shoes",
    ngo: "Community Care",
    location: "Sector 19",
    price: 0,
    image: "/placeholder.svg?height=150&width=150",
    tag: "Donated Free",
    available: false,
  },
]

export default function RewearStore() {
  const [activeTab, setActiveTab] = useState("resale")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductDetails, setShowProductDetails] = useState(false)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowProductDetails(true)
  }

  const handlePurchase = () => {
    alert("Purchase successful! Thank you for choosing sustainable fashion.")
    setShowProductDetails(false)
  }

  if (showProductDetails && selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setShowProductDetails(false)}
        onPurchase={handlePurchase}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Rewear Store</h2>
        <p className="text-gray-600">Sustainable fashion for everyone</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resale" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Rewear Resale
          </TabsTrigger>
          <TabsTrigger value="donated" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Donated Rewear
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resale" className="space-y-4">
          {rewearItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <Badge className="bg-blue-600">{item.tag}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Store className="h-3 w-3 text-gray-500" />
                      <span className="text-sm text-gray-600">{item.shopkeeper}</span>
                      <MapPin className="h-3 w-3 text-gray-500 ml-2" />
                      <span className="text-sm text-gray-600">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#0071ce]">₹{item.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#0071ce] hover:bg-blue-700"
                        onClick={() => handleProductClick(item)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="donated" className="space-y-4">
          {donatedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <Badge className={item.price === 0 ? "bg-green-600" : "bg-yellow-600"}>{item.tag}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Heart className="h-3 w-3 text-gray-500" />
                      <span className="text-sm text-gray-600">{item.ngo}</span>
                      <MapPin className="h-3 w-3 text-gray-500 ml-2" />
                      <span className="text-sm text-gray-600">{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                          {item.price === 0 ? "Free" : `₹${item.price}`}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        disabled={!item.available}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                        onClick={() => handleProductClick(item)}
                      >
                        {item.available ? "Request" : "Not Available"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
