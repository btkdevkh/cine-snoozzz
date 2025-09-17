<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import FilmIcon from '@/components/icons/FilmIcon.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import { useBreakpoint } from '@/composables/useBreakpoint'
import AdminBuildingIcon from './icons/AdminBuildingIcon.vue'
import Logo from '@/components/Logo.vue'
import { useAuthStore } from '@/stores/auth'

// import SerieIcon from '@/components/icons/SerieIcon.vue'
// import OriginalIcon from '@/components/icons/OriginalIcon.vue'
// import WatchlistIcon from '@/components/icons/WatchlistIcon.vue'

const isAdmin = ref(true)
const router = useRouter()
const { current } = useBreakpoint()
const restMenuItems = ref(false)
const pageNum = computed(() => router.currentRoute.value.params.page)
const currentPath = computed(() => router.currentRoute.value.path)
const paths = router.options.routes.map((r) => r.path)

onMounted(() => {
  if (!paths.includes(currentPath.value)) {
    restMenuItems.value = false
  }
})
</script>
<template>
  <nav
    class="navbar flex gap-6 items-center justify-between bg-[#131316] text-white sticky top-0 right-0 left-0 z-50 py-3.5 px-3"
  >
    <div class="navbar-left-center flex gap-8 items-center">
      <RouterLink
        to="/identity/member"
        class="navbar-left flex gap-0.5 justify-center items-center"
      >
        <Logo />
        <h1 class="title-logo text-lg font-bold text-shadow-xs text-shadow-white">SnooZzz</h1>
      </RouterLink>

      <div class="navbar-center flex gap-5 items-center">
        <ul class="nav-links flex gap-8 items-center">
          <li
            @click="router.push('/identity/member')"
            :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member' ? 'text-amber-300' : ''}`"
          >
            <HomeIcon />
            <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
              >ACCUEIL</span
            >
          </li>
          <li
            @click="router.push('/identity/member/search')"
            :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/search' ? 'text-amber-300' : ''}`"
          >
            <SearchIcon />
            <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
              >RECHERCHE</span
            >
          </li>

          <!-- <li
            @click="router.push('/identity/member/watchlist')"
            :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/watchlist' ? 'text-amber-300' : ''}`"
          >
            <WatchlistIcon />
            <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
              >LISTE</span
            >
          </li> -->

          <div
            :class="`flex md:flex-row flex-col gap-8 justify-center rounded-md ${current !== 'sm' ? '' : 'hidden'}`"
          >
            <li
              @click="router.push('/identity/member/movie')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === `/identity/member/movie/${pageNum}` ? 'text-amber-300' : ''}`"
            >
              <FilmIcon />
              <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
                >FILMS</span
              >
            </li>
            <!-- <li
              @click="router.push('/identity/member/series')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/series' ? 'text-amber-300' : ''}`"
            >
              <SerieIcon />
              <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
                >SERIES</span
              >
            </li> -->
            <!-- <li
              @click="router.push('/identity/member/originals')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/originals' ? 'text-amber-300' : ''}`"
            >
              <OriginalIcon />
              <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
                >ORIGINALS</span
              >
            </li> -->

            <!-- Admin -->
            <li
              v-if="isAdmin"
              @click="router.push('/identity/member/admin')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/admin' ? 'text-amber-300' : ''}`"
            >
              <AdminBuildingIcon />
              <span :class="`${current === 'sm' || current === 'md' ? 'hidden' : ''} font-semibold`"
                >ADMIN</span
              >
            </li>
          </div>
        </ul>

        <!-- Responsive menu for small screens -->
        <div
          @click="restMenuItems = !restMenuItems"
          class="md:hidden cursor-pointer relative group"
        >
          <ListIcon />

          <ul
            :class="`w-[200px] border border-gray-700 md:static absolute right-3 top-12 bg-black p-4 rounded-sm shadow-lg flex md:flex-row flex-col gap-4`"
            v-if="restMenuItems"
            @mouseleave="restMenuItems = false"
          >
            <li
              @click="router.push('/identity/member/movie')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === `/identity/member/movie/${pageNum}` ? 'text-amber-300' : ''}`"
            >
              <FilmIcon />
              <span class="font-semibold">FILMS</span>
            </li>

            <!-- <li
              @click="router.push('/identity/member/series')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/series' ? 'text-amber-300' : ''}`"
            >
              <SerieIcon />
              <span class="font-semibold">SERIES</span>
            </li> -->

            <!-- <li
              @click="router.push('/identity/member/originals')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/originals' ? 'text-amber-300' : ''}`"
            >
              <OriginalIcon />
              <span class="font-semibold">ORIGINALS</span>
            </li> -->

            <li
              v-if="isAdmin"
              @click="router.push('/identity/member/admin')"
              :class="`cursor-pointer flex gap-3 items-center ${currentPath === '/identity/member/admin' ? 'text-amber-300' : ''}`"
            >
              <AdminBuildingIcon />
              <span class="font-semibold">ADMIN</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <RouterLink to="/identity/member/profile" title="Profile">
      <div class="navbar-right">
        <div class="w-[40px] h-[40px] border border-gray-700 rounded-full">
          <img src="/duffy.png" alt="User Icon" class="user-icon" />
        </div>
      </div>
    </RouterLink>
  </nav>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap');

.title-logo {
  font-family: 'Delicious Handrawn', cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
