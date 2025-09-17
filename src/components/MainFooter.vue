<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const { isAdmin } = useAuthStore()
const currentPath = computed(() => router.currentRoute.value.path)
const pageNum = computed(() => router.currentRoute.value.params.page)
const actualYear = new Date().getFullYear()

const menus = computed(() => {
  return [
    { label: 'Accueil', path: '/identity/member' },
    { label: 'Films', path: `/identity/member/movie/${pageNum.value}` },
    { label: 'Admin', path: '/identity/member/admin' },
  ]
})
</script>
<template>
  <div class="h-[200px] bg-gray-950 p-5 flex items-center justify-between">
    <div class="flex flex-col justify-center gap-1">
      <ul v-if="isAdmin" v-for="menu in menus">
        <li :class="`font-semibold underline ${currentPath === menu.path ? 'text-amber-300' : ''}`">
          <RouterLink :to="menu.path">
            {{ menu.label }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <span class="self-end">&copy; {{ actualYear }} CinexSnooZzz</span>
  </div>
</template>
<style scoped></style>
