<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

export default defineComponent({
  name: 'SignUp',
  setup() {
    const authStore = useAuthStore()
    const password = ref('')
    const email = ref('')
    const name = ref('')

    const handleSignup = async () => {
      try {
        await authStore.signup({
          name: name.value,
          email: email.value,
          password: password.value,
        })
        router.push('/shop-now')
      } catch (error) {
        console.error('Signup failed:', error)
        alert('Signup failed. Please try again.')
      }
    }

    return {
      name,
      email,
      password,
      handleSignup,
    }
  },
})
</script>
