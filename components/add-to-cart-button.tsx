"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  image: string
  inStock: boolean
}

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
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

  return (
    <Button className={`w-full ${className}`} disabled={!product.inStock} onClick={handleAddToCart}>
      {product.inStock ? "Agregar al Carrito" : "Agotado"}
    </Button>
  )
}
