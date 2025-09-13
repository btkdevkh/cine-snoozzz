<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const isAdmin = ref(true)
const router = useRouter()

onMounted(() => {
  if (!isAdmin.value) {
    router.push('/identity')
  } else {
    router.push('/identity/member')
  }
})
</script>
<template>
  <Navbar v-if="isAdmin" />
  <RouterView />
</template>
