import { useState, useEffect, createContext, useContext } from 'react'
import { LocalAuth, type User } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session from local auth
    const session = LocalAuth.getSession()
    setUser(session?.user ?? null)
    setLoading(false)

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_session') {
        const session = LocalAuth.getSession()
        setUser(session?.user ?? null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const session = await LocalAuth.signIn(email, password)
      setUser(session.user)
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      await LocalAuth.signOut()
      setUser(null)
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}