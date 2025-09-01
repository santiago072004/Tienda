"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ShoppingCartPage() {
  const { state, dispatch } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó del carrito",
    })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
    toast({
      title: "Carrito vaciado",
      description: "Se eliminaron todos los productos del carrito",
    })
  }

  const applyPromoCode = () => {
    // Mock promo code functionality
    if (promoCode.toLowerCase() === "descuento10") {
      toast({
        title: "Código aplicado",
        description: "Se aplicó un descuento del 10%",
      })
    } else if (promoCode) {
      toast({
        title: "Código inválido",
        description: "El código promocional no es válido",
        variant: "destructive",
      })
    }
  }

  const shipping = state.total > 100 ? 0 : 15.99
  const tax = state.total * 0.08 // 8% tax
  const finalTotal = state.total + shipping + tax

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8">Agrega algunos productos para comenzar tu compra</p>
          <Button asChild size="lg" className="min-h-[48px]">
            <Link href="/catalogo">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Carrito de Compras</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-muted-foreground">
            {state.itemCount} {state.itemCount === 1 ? "producto" : "productos"} en tu carrito
          </p>
          <Button variant="outline" size="sm" onClick={clearCart} className="self-start sm:self-auto bg-transparent">
            <Trash2 className="h-4 w-4 mr-2" />
            Vaciar Carrito
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="xl:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-20 md:w-24 h-20 md:h-24 rounded-lg overflow-hidden bg-muted mx-auto sm:mx-0 max-w-[120px] sm:max-w-none">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                      <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                        <p className="text-xl sm:text-2xl font-bold text-primary">${item.price}</p>
                        {!item.inStock && (
                          <Badge variant="destructive" className="mt-2">
                            Producto agotado
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-2 min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <p className="text-base sm:text-lg font-semibold">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="xl:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Código Promocional</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Ingresa tu código"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={applyPromoCode} className="sm:shrink-0 bg-transparent">
                    Aplicar
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <div className="text-xs sm:text-sm text-primary">¡Envío gratis en compras mayores a $100!</div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <Button className="w-full" size="lg" style={{ minHeight: "48px" }}>
                Proceder al Checkout
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild style={{ minHeight: "48px" }}>
                <Link href="/catalogo">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
