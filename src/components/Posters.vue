<script setup lang="ts" generic="T extends IMovie">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import Loader from '@/components/Loader.vue'
import { RouterLink } from 'vue-router'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import type { IMovie } from '@/types/Movie'
import VideoPlayer from '@/components/VideoPlayer.vue'

const props = defineProps<{
  isPending: boolean
  posters: T[]
}>()

// keep reactivity for script usage
const { isPending, posters } = toRefs(props)
const posterClicked = ref<boolean>(false)

let timer: number | undefined // declare outside
const defaultPosterIndex = ref(0)

const length = computed(() => posters.value.length)

const leftPosterIndex = computed(() => {
  if (posters.value.length === 0) return 0
  return (defaultPosterIndex.value - 1 + posters.value.length) % posters.value.length
})

const rightPosterIndex = computed(() => {
  if (posters.value.length === 0) return 0
  return (defaultPosterIndex.value + 1) % posters.value.length
})

const decrementPosterIndex = () => {
  if (posters.value.length === 0) return
  const posterMain = document.querySelector('.poster-main') as HTMLElement
  posterMain?.classList.add('animate-slide-right')
  setTimeout(() => posterMain?.classList.remove('animate-slide-right'), 200)

  defaultPosterIndex.value =
    (defaultPosterIndex.value - 1 + posters.value.length) % posters.value.length
}

const incrementPosterIndex = () => {
  if (posters.value.length === 0) return
  const posterMain = document.querySelector('.poster-main') as HTMLElement
  posterMain?.classList.add('animate-slide-left')
  setTimeout(() => posterMain?.classList.remove('animate-slide-left'), 200)

  defaultPosterIndex.value = (defaultPosterIndex.value + 1) % posters.value.length
}

const handleClickDot = (index: number) => {
  defaultPosterIndex.value = index
}

const handleChangeVideoIndex = (index: number) => {
  defaultPosterIndex.value = index
  posterClicked.value = true
  handleClearInterval()
}

const handleCloseVideoPlayer = () => {
  posterClicked.value = false
  timer = setInterval(() => incrementPosterIndex(), 5000)
}

const handleClearInterval = () => clearInterval(timer)

watch([posters], (newVal) => {
  if (length.value > 1) {
    timer = setInterval(() => incrementPosterIndex(), 5000)
  }
})

onMounted(() => {
  if (length.value > 1) {
    handleClearInterval()
    timer = setInterval(() => incrementPosterIndex(), 5000)
  }
})

// cleanup
onUnmounted(() => {
  handleClearInterval()
})
</script>
<template>
  <div class="py-8 md:px-5">
    <Loader v-if="isPending" />

    <div class="poster-side flex justify-between gap-5" v-if="posters && posters.length > 0">
      <!-- Left posters -->
      <div class="poster-left-side-item w-[10%] opacity-30 shadow-xl shadow-black rounded-lg">
        <img
          :src="posters[leftPosterIndex].imagePath"
          :alt="posters[defaultPosterIndex].title"
          class="w-full h-full rounded-lg object-cover"
        />
      </div>

      <!-- Main poster -->
      <div class="poster-main w-full relative shadow-xl shadow-black rounded-lg">
        <!-- Chevron left -->
        <div
          class="chevron-left absolute top-[50%] -left-10 transform translate-y-[-50%] z-10 cursor-pointer"
          @click="decrementPosterIndex()"
        >
          <ChevronLeftIcon />
        </div>

        <RouterLink to="#" @click="handleChangeVideoIndex(defaultPosterIndex)">
          <div class="w-full h-[550px] rounded-lg">
            <img
              :src="posters[defaultPosterIndex].imagePath"
              :alt="posters[defaultPosterIndex].title"
              class="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div class="absolute bottom-4 left-4">
            <h3 class="text-lg font-semibold text-shadow-lg">
              {{ posters[defaultPosterIndex].title }}
            </h3>
          </div>
        </RouterLink>

        <!-- Dots -->
        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <div
            v-for="(poster, index) in posters"
            :key="poster.id"
            class="dot w-2.5 h-2.5 rounded-full cursor-pointer"
            :class="index === defaultPosterIndex ? 'bg-white' : 'bg-gray-600'"
            @click="handleClickDot(index)"
          ></div>
        </div>

        <!-- Chevron right -->
        <div
          class="chevron-right absolute top-[50%] -right-10 transform translate-y-[-50%] z-10 cursor-pointer"
          @click="incrementPosterIndex()"
        >
          <ChevronRightIcon />
        </div>
      </div>

      <!-- Right side posters -->
      <div class="poster-right-side-item w-[10%] opacity-30 shadow-xl shadow-black rounded-lg">
        <img
          :src="posters[rightPosterIndex].imagePath"
          :alt="posters[defaultPosterIndex].title"
          class="w-full h-full rounded-lg object-cover"
        />
      </div>

      <!-- Modal Video Player -->
      <VideoPlayer
        v-if="posterClicked"
        position="top"
        :url="posters[defaultPosterIndex].videoPath"
        @close="handleCloseVideoPlayer"
      />
    </div>

    <div
      v-else-if="!isPending && posters.length === 0"
      class="flex flex-col items-center justify-center h-[400px]"
    >
      <p class="text-center text-white text-2xl">
        Le serveur n'est pas disponible, veuillez revenir plus tard.
      </p>
    </div>
  </div>
</template>
<style scoped>
.poster-main {
  transition: transform 0.5s ease;
}

.animate-slide-left {
  transform: translateX(-20%);
}

.animate-slide-right {
  transform: translateX(20%);
}

.dot {
  transition: background-color 0.3s ease;
}

.chevron-left,
.chevron-right {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.chevron-left:hover,
.chevron-right:hover {
  transform: scale(1.1);
}
</style>
