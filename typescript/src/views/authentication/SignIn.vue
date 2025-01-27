<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SignIn',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const password = ref('')
    const email = ref('')

    const handleSignin = async () => {
      try {
        await authStore.signin({ email: email.value, password: password.value })
        router.push('/shop-now')
      } catch (error) {
        console.error('Sign-in failed:', error)
        alert('Invalid credentials. Please try again.')
      }
    }

    return {
      email,
      password,
      handleSignin,
    }
  },
})
</script>
