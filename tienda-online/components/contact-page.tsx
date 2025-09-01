"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  MessageSquare,
  Headphones,
  ShoppingCart,
  HelpCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const contactReasons = [
  { value: "general", label: "Consulta general", icon: MessageSquare },
  { value: "support", label: "Soporte técnico", icon: Headphones },
  { value: "order", label: "Estado de pedido", icon: ShoppingCart },
  { value: "help", label: "Ayuda con productos", icon: HelpCircle },
]

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    reason: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Por favor completa todos los campos obligatorios")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Por favor ingresa un email válido")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        reason: "",
        message: "",
      })

      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      })
    } catch {
      setError("Hubo un error al enviar el mensaje. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">info@tiendaonline.com</p>
                  <p className="text-sm text-muted-foreground">soporte@tiendaonline.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-sm text-muted-foreground">
                    123 Calle Principal
                    <br />
                    Ciudad, Estado 12345
                    <br />
                    País
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Horarios de Atención</p>
                  <p className="text-sm text-muted-foreground">
                    Lunes - Viernes: 9:00 AM - 6:00 PM
                    <br />
                    Sábados: 10:00 AM - 4:00 PM
                    <br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preguntas Frecuentes</CardTitle>
              <CardDescription>Encuentra respuestas rápidas a las consultas más comunes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="font-medium text-sm">¿Cómo rastreo mi pedido?</p>
                <p className="text-sm text-muted-foreground">
                  Puedes rastrear tu pedido desde tu cuenta o con el número de seguimiento.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">¿Cuál es la política de devoluciones?</p>
                <p className="text-sm text-muted-foreground">Aceptamos devoluciones dentro de 30 días de la compra.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">¿Hacen envíos internacionales?</p>
                <p className="text-sm text-muted-foreground">
                  Sí, enviamos a más de 50 países. Consulta las tarifas de envío.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Envíanos un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y te responderemos lo antes posible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>¡Mensaje enviado correctamente! Te responderemos pronto.</AlertDescription>
                  </Alert>
                )}

                {/* Contact Reason */}
                <div className="space-y-3">
                  <Label>Motivo de contacto</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contactReasons.map((reason) => {
                      const Icon = reason.icon
                      return (
                        <button
                          key={reason.value}
                          type="button"
                          onClick={() => handleInputChange("reason", reason.value)}
                          className={`p-3 border rounded-lg text-left transition-colors hover:bg-muted ${
                            formData.reason === reason.value ? "border-primary bg-primary/5" : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="text-sm font-medium">{reason.label}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nombre completo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Asunto <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Asunto de tu mensaje"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Mensaje <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button type="submit" className="flex-1 min-h-[48px]" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        reason: "",
                        message: "",
                      })
                    }
                    disabled={isSubmitting}
                    className="sm:shrink-0 min-h-[48px]"
                  >
                    Limpiar Formulario
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="text-destructive">*</span> Campos obligatorios
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Response Time Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center p-3 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  Consultas Generales
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Respuesta en 24-48 horas</p>
            </Card>

            <Card className="text-center p-3 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  Soporte Técnico
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Respuesta en 4-8 horas</p>
            </Card>

            <Card className="text-center p-3 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                  Pedidos Urgentes
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Respuesta inmediata</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
