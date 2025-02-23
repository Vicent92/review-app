"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log("Form submitted:", activeTab)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{activeTab === "login" ? "Iniciar sesión" : "Registrarse"}</DialogTitle>
          <DialogDescription>
            {activeTab === "login"
              ? "Ingresa tus credenciales para acceder a tu cuenta."
              : "Crea una nueva cuenta para acceder a todas las funciones."}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-login">Correo electrónico</Label>
                  <Input id="email-login" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-login">Contraseña</Label>
                  <Input id="password-login" type="password" required />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name-register">Nombre</Label>
                  <Input id="name-register" type="text" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-register">Correo electrónico</Label>
                  <Input id="email-register" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-register">Contraseña</Label>
                  <Input id="password-register" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password-register">Confirmar contraseña</Label>
                  <Input id="confirm-password-register" type="password" required />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

