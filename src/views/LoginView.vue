<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
  // Handle login logic here

  // Redirect to "/identity/member" page after login
  router.push('/identity/member')
}
</script>
<template>
  <div class="login-view min-h-screen flex items-center justify-center text-black">
    <form
      @submit.prevent="login"
      class="bg-gray-100 px-8 py-16 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-5"
    >
      <div class="flex items-end gap-1 w-[50px] mb-8">
        <img src="/logo.png" alt="Disney+ Logo" class="w-full" />
        <h1 class="title-logo text-xl font-bold text-shadow-xs text-shadow-white">CinéSnooZzz</h1>
      </div>

      <h2 class="text-2xl mb-6 font-[600]">Entrez votre adresse e⁠-⁠mail⁠ pour continuer</h2>
      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Adresse e⁠-⁠mail"
          class="w-full p-3 rounded bg-[#e9ebf0] focus:outline-none border-b-2 border-[#858585] focus:border-[#333] transition"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full transition duration-300 cursor-pointer"
      >
        Continuer
      </button>

      <hr />
    </form>
  </div>
</template>
<style scoped>
.login-view {
  min-height: 100vh;
  background: url('/bg.jpg') no-repeat center center / cover;
}
</style>
