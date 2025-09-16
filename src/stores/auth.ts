import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('admin', () => {
  const isAdmin = ref(true)
  return { isAdmin }
})
