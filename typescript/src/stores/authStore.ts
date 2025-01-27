import { defineStore } from 'pinia'
import axios from 'axios'

interface AuthState {
  token: string
  user: unknown | null
}

interface SignupData {
  name: string
  email: string
  password: string
}

interface SigninCredentials {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: unknown // Change this if the backend returns a specific user object
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async signup(userData: SignupData): Promise<void> {
      await axios.post('http://localhost:5000/api/register', userData)
    },
    async signin(credentials: SigninCredentials): Promise<void> {
      const response = await axios.post<AuthResponse>(
        'http://localhost:5000/api/signin',
        credentials,
      )
      this.token = response.data.token ?? '' // Ensure `token` is always a string
      this.user = response.data.user ?? null // Store user data if available
      localStorage.setItem('token', this.token)
    },
    logout(): void {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
