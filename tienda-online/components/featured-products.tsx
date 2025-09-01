import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

const featuredProducts = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: 599.99,
    originalPrice: 699.99,
    image: "/modern-smartphone.png",
    rating: 4.8,
    reviews: 124,
    badge: "Más Vendido",
    inStock: true,
  },
  {
    id: 2,
    name: "Auriculares Inalámbricos",
    price: 149.99,
    originalPrice: 199.99,
    image: "/wireless-headphones.png",
    rating: 4.6,
    reviews: 89,
    badge: "Oferta",
    inStock: true,
  },
  {
    id: 3,
    name: "Laptop Gaming",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "/gaming-laptop.png",
    rating: 4.9,
    reviews: 67,
    badge: "Nuevo",
    inStock: true,
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    price: 249.99,
    originalPrice: 299.99,
    image: "/sport-smartwatch.png",
    rating: 4.7,
    reviews: 156,
    badge: "Destacado",
    inStock: true,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Productos Destacados
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestros productos más populares con las mejores ofertas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
                    {product.badge}
                  </Badge>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-balance line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-4 pt-0">
                <AddToCartButton product={product} className="text-sm sm:text-base min-h-[40px] sm:min-h-[44px]" />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button asChild variant="outline" size="lg" className="min-h-[48px] bg-transparent">
            <Link href="/catalogo">Ver Todos los Productos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
