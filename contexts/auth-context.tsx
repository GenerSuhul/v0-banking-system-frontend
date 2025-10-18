"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type User,
  getUser,
  setUser as saveUser,
  removeUser,
  setAuthToken,
  removeAuthToken,
  getAuthToken,
} from "@/lib/auth"
import { apiRequest } from "@/lib/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (username: string, email: string, password: string, roleName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = getAuthToken()
    if (token) {
      const savedUser = getUser()
      if (savedUser) {
        setUser(savedUser)
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const response = await apiRequest<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    if (response.success && response.data) {
      setAuthToken(response.data.token)
      saveUser(response.data.user)
      setUser(response.data.user)
    }
  }

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" })
    } catch (error) {
      // Continue with logout even if API call fails
    }
    removeAuthToken()
    removeUser()
    setUser(null)
  }

  const register = async (username: string, email: string, password: string, roleName: string) => {
    await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password, roleName }),
    })
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
