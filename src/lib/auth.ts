// Local Authentication System
// Replace this with your actual authentication logic

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  created_at?: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expires_at: string;
}

// Mock user database - replace with your actual database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@cgmis.local',
    name: 'Administrator',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: '2', 
    email: 'counselor@cgmis.local',
    name: 'Career Counselor',
    role: 'counselor',
    created_at: new Date().toISOString()
  }
];

// Simple session storage
let currentSession: AuthSession | null = null;

export class LocalAuth {
  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<AuthSession> {
    // DEVELOPMENT MODE: Accept any email and password for testing
    // TODO: Replace with actual authentication when database endpoints are ready
    
    // Basic validation
    if (!email || email.length < 1) {
      throw new Error('Email is required');
    }
    
    if (!password || password.length < 1) {
      throw new Error('Password is required');
    }

    // Create a dynamic user based on the email provided
    // This allows any email/password combination to work
    let user = mockUsers.find(u => u.email === email);
    
    // If user doesn't exist in mock data, create a temporary one
    if (!user) {
      user = {
        id: `temp_${Date.now()}`,
        email: email,
        name: email.split('@')[0], // Use part before @ as name
        role: 'user',
        created_at: new Date().toISOString()
      };
    }

    const session: AuthSession = {
      user,
      token: `dev_token_${user.id}_${Date.now()}`,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    currentSession = session;
    
    // Store in localStorage for persistence
    localStorage.setItem('auth_session', JSON.stringify(session));
    
    return session;
  }

  // Sign out
  static async signOut(): Promise<void> {
    currentSession = null;
    localStorage.removeItem('auth_session');
  }

  // Get current session
  static getSession(): AuthSession | null {
    if (currentSession) {
      return currentSession;
    }

    // Try to restore from localStorage
    const storedSession = localStorage.getItem('auth_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession) as AuthSession;
        
        // Check if session is expired
        if (new Date(session.expires_at) > new Date()) {
          currentSession = session;
          return session;
        } else {
          // Session expired, remove it
          localStorage.removeItem('auth_session');
        }
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem('auth_session');
      }
    }

    return null;
  }

  // Get current user
  static getCurrentUser(): User | null {
    const session = this.getSession();
    return session?.user || null;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  // Register new user (optional - implement based on your needs)
  static async register(email: string, password: string, name?: string): Promise<User> {
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      created_at: new Date().toISOString()
    };

    // Add to mock database - replace with actual database insert
    mockUsers.push(newUser);

    return newUser;
  }
}