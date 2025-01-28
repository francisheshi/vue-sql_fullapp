<template>
  <transition name="fade">
    <div v-if="!showSignin">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </transition>

  <transition name="slide">
    <div v-if="showSignin">
      <SignIn />
    </div>
  </transition>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { defineComponent, ref } from 'vue'
import SignIn from './SignIn.vue'

export default defineComponent({
  name: 'SignUp',
  components: { SignIn },
  setup() {
    const authStore = useAuthStore()
    const showSignin = ref(false)
    const username = ref('')
    const password = ref('')
    const email = ref('')

    const handleSignup = async () => {
      try {
        const response = await authStore.signup({
          username: username.value,
          password: password.value,
          email: email.value,
        })

        if (response.success) {
          alert('User Registered successfully! Redirecting...')
          window.location.href = '/shop-now'
        } else {
          alert(response.message)
        }
      } catch (error) {
        console.error('Signin failed:', error)
        alert('Signin failed. Please try again.')
      }
    }

    return { username, email, password, showSignin, handleSignup }
  },
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
