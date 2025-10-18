// Authentication utilities
export interface User {
  id: number
  username: string
  email: string
  roleName: string
  status: string
}

export interface AuthResponse {
  token: string
  user: User
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token)
}

export function getAuthToken(): string | null {
  return localStorage.getItem("token")
}

export function removeAuthToken() {
  localStorage.removeItem("token")
}

export function setUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user))
}

export function getUser(): User | null {
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

export function removeUser() {
  localStorage.removeItem("user")
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export function hasRole(role: string): boolean {
  const user = getUser()
  return user?.roleName === role
}
