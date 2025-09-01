import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            Descubre los Mejores Productos
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Encuentra todo lo que necesitas en nuestra tienda online. Calidad garantizada y envío rápido a todo el país.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto min-h-[48px]">
              <Link href="/catalogo">Ver Catálogo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 bg-transparent w-full sm:w-auto min-h-[48px]"
            >
              <Link href="/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
