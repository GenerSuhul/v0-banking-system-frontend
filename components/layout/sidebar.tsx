"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2,
  LayoutDashboard,
  Users,
  UserCircle,
  Wallet,
  CreditCard,
  DollarSign,
  ArrowLeftRight,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "CAJERO", "GERENTE"] },
  { name: "Usuarios", href: "/usuarios", icon: Users, roles: ["ADMIN"] },
  { name: "Clientes", href: "/clientes", icon: UserCircle, roles: ["ADMIN", "CAJERO", "GERENTE"] },
  { name: "Cuentas", href: "/cuentas", icon: Wallet, roles: ["ADMIN", "CAJERO", "GERENTE"] },
  { name: "Tarjetas", href: "/tarjetas", icon: CreditCard, roles: ["ADMIN", "CAJERO"] },
  { name: "Transacciones", href: "/transacciones", icon: ArrowLeftRight, roles: ["ADMIN", "CAJERO", "GERENTE"] },
  { name: "Monedas", href: "/monedas", icon: DollarSign, roles: ["ADMIN", "GERENTE"] },
  { name: "Tasas de Interés", href: "/interes", icon: TrendingUp, roles: ["ADMIN", "GERENTE"] },
  { name: "Documentos", href: "/documentos", icon: FileText, roles: ["ADMIN", "CAJERO", "GERENTE"] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredNavigation = navigation.filter((item) => user && item.roles.includes(user.roleName))

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Building2 className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">Sistema Bancario</span>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-border p-4 space-y-2">
        <Link href="/configuracion">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="h-5 w-5" />
            Configuración
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          onClick={() => logout()}
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
