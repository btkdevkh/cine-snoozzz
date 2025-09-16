<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from './stores/auth'
import MainFooter from '@/components/MainFooter.vue'

const { isAdmin } = useAuthStore()
</script>
<template>
  <Navbar v-if="isAdmin" />
  <RouterView />
  <MainFooter />
</template>
