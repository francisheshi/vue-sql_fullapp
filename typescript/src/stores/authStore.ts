import { defineStore } from 'pinia'
import axios from 'axios'

interface AuthState {
  isAuthenticated: false
  user: [] | null
  token: string | []
  username: string | []
}

interface SignupData {
  username: string
  password: string
  email: string
}

interface SigninCredentials {
  username: string
  password: string
}

interface AuthResponse {
  message(message: []): unknown
  success: [] | ''
  token: string
  user: []
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || null,
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async signup(userData: SignupData) {
      try {
        const response = await axios.post<AuthResponse>(
          'http://localhost:5000/api/register',
          userData,
        )
        return response.data
      } catch (error) {
        console.error('Error during signup:', error)
        throw error
      }
    },
    async signin(credentials: SigninCredentials) {
      const response = await axios.post<AuthResponse>(
        'http://localhost:5000/api/signin',
        credentials,
      )
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      return response.data
    },
    setToken(token: string, username: string) {
      this.token = token
      this.username = username
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    logout(): void {
      this.token = null
      this.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})
