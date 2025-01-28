<template>
  <h2>Sign In</h2>
  <form @submit.prevent="handleSignin">
    <input v-model="username" type="username" placeholder="Username" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Sign In</button>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export default {
  name: 'SignIn',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')

    const handleSignin = async () => {
      try {
        const response = await authStore.signin({
          username: username.value,
          password: password.value,
        })

        if (response.success) {
          localStorage.setItem('token', response.token)
          alert('Signin successful! Redirecting...')
          router.push('/shop-now')
        } else {
          alert(response.message)
        }
      } catch (error) {
        console.error('Signin failed:', error)
        alert('Signin failed. Please try again.')
      }
    }

    return { username, password, handleSignin }
  },
}
</script>
