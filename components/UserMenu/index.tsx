"use client"

import { useState } from "react"
import Link from "next/link"
import { User, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthModal from "../AuthModal"
import styles from "./UserMenu.module.css"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulamos el estado de autenticación

  const handleLogin = () => {
    setIsOpen(false)
    setIsAuthModalOpen(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsOpen(false)
  }

  return (
    <div className={styles.userMenu}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className={styles.avatarButton} aria-label="Menú de usuario">
            <Avatar>
              <AvatarImage src={isLoggedIn ? "https://github.com/shadcn.png" : undefined} alt="@shadcn" />
              <AvatarFallback>{isLoggedIn ? "CN" : "?"}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={styles.menuContent}>
          {isLoggedIn ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/profile" className={styles.menuItem}>
                  <User className={styles.menuIcon} />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className={styles.menuItem}>
                  <Settings className={styles.menuIcon} />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className={styles.menuItem}>
                <LogOut className={styles.menuIcon} />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={handleLogin} className={styles.menuItem}>
              <User className={styles.menuIcon} />
              <span>Iniciar sesión / Registrarse</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}

