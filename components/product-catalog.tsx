"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Star, Grid, List } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

// Mock data for products
const allProducts = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: 599.99,
    originalPrice: 699.99,
    image: "/modern-smartphone.png",
    rating: 4.8,
    reviews: 124,
    category: "Electrónicos",
    brand: "TechBrand",
    inStock: true,
    description: "Smartphone de última generación con cámara profesional",
  },
  {
    id: 2,
    name: "Auriculares Inalámbricos",
    price: 149.99,
    originalPrice: 199.99,
    image: "/wireless-headphones.png",
    rating: 4.6,
    reviews: 89,
    category: "Audio",
    brand: "SoundTech",
    inStock: true,
    description: "Auriculares con cancelación de ruido activa",
  },
  {
    id: 3,
    name: "Laptop Gaming",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "/gaming-laptop.png",
    rating: 4.9,
    reviews: 67,
    category: "Computadoras",
    brand: "GamePro",
    inStock: true,
    description: "Laptop gaming de alto rendimiento",
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    price: 249.99,
    originalPrice: 299.99,
    image: "/sport-smartwatch.png",
    rating: 4.7,
    reviews: 156,
    category: "Wearables",
    brand: "FitTech",
    inStock: true,
    description: "Smartwatch resistente al agua con GPS",
  },
  {
    id: 5,
    name: "Tablet Pro",
    price: 449.99,
    originalPrice: 549.99,
    image: "/modern-tablet.png",
    rating: 4.5,
    reviews: 203,
    category: "Electrónicos",
    brand: "TechBrand",
    inStock: true,
    description: "Tablet profesional con stylus incluido",
  },
  {
    id: 6,
    name: "Cámara Digital",
    price: 899.99,
    originalPrice: 999.99,
    image: "/professional-camera.png",
    rating: 4.8,
    reviews: 78,
    category: "Fotografía",
    brand: "PhotoPro",
    inStock: false,
    description: "Cámara digital profesional 4K",
  },
  {
    id: 7,
    name: "Altavoz Bluetooth",
    price: 79.99,
    originalPrice: 99.99,
    image: "/bluetooth-speaker.png",
    rating: 4.4,
    reviews: 145,
    category: "Audio",
    brand: "SoundTech",
    inStock: true,
    description: "Altavoz portátil resistente al agua",
  },
  {
    id: 8,
    name: "Monitor 4K",
    price: 329.99,
    originalPrice: 399.99,
    image: "/4k-monitor.png",
    rating: 4.6,
    reviews: 92,
    category: "Computadoras",
    brand: "DisplayTech",
    inStock: true,
    description: "Monitor 4K de 27 pulgadas",
  },
]

const categories = ["Todos", "Electrónicos", "Audio", "Computadoras", "Wearables", "Fotografía"]
const brands = ["Todos", "TechBrand", "SoundTech", "GamePro", "FitTech", "PhotoPro", "DisplayTech"]

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedBrand, setSelectedBrand] = useState("Todos")
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [sortBy, setSortBy] = useState("featured")
  const [showInStock, setShowInStock] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { dispatch } = useCart()

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    if (!product.inStock) return

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inStock: product.inStock,
      },
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
      const matchesBrand = selectedBrand === "Todos" || product.brand === selectedBrand
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStock = !showInStock || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for "featured"
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy, showInStock])

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox checked={selectedCategory === category} onCheckedChange={() => setSelectedCategory(category)} />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Marcas</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox checked={selectedBrand === brand} onCheckedChange={() => setSelectedBrand(brand)} />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Rango de Precio</h3>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1500} min={0} step={50} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <Checkbox checked={showInStock} onCheckedChange={setShowInStock} />
          <span className="text-sm">Solo productos en stock</span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
        <p className="text-muted-foreground">Descubre nuestra amplia selección de productos</p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="rating">Mejor Valorados</SelectItem>
            <SelectItem value="name">Nombre A-Z</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode */}
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Filter */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Filtra los productos según tus preferencias</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Filtros</h2>
                <FilterContent />
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">Mostrando {filteredProducts.length} productos</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron productos</p>
              <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardContent className={`p-0 ${viewMode === "list" ? "flex flex-row w-full" : ""}`}>
                    <div
                      className={`relative overflow-hidden ${viewMode === "list" ? "w-48 shrink-0" : "rounded-t-lg"}`}
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-32" : "w-full h-48"
                        }`}
                      />
                      {!product.inStock && (
                        <Badge className="absolute top-2 left-2" variant="destructive">
                          Agotado
                        </Badge>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-balance">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl font-bold text-primary">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      {viewMode === "list" && (
                        <Button className="w-full" disabled={!product.inStock} onClick={() => handleAddToCart(product)}>
                          {product.inStock ? "Agregar al Carrito" : "Agotado"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                  {viewMode === "grid" && (
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" disabled={!product.inStock} onClick={() => handleAddToCart(product)}>
                        {product.inStock ? "Agregar al Carrito" : "Agotado"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
