<script setup lang="ts" generic="T extends IMovie">
import { toRefs, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Loader from '@/components/Loader.vue'
import type { IMovie } from '@/types/Movie'
import VideoPlayer from '@/components/VideoPlayer.vue'

const props = defineProps<{
  isPending: boolean
  items: T[]
  title?: string
}>()

const videoIndex = ref<number>(0)
const posterClicked = ref<boolean>(false)
const { isPending, items: posters } = toRefs(props)

const handleChangeVideoIndex = (index: number) => {
  videoIndex.value = index
  posterClicked.value = true
}

const handleCloseVideoPlayer = () => {
  videoIndex.value = 0
  posterClicked.value = false
}
</script>
<template>
  <div class="flex flex-col gap-4 py-8 px-5">
    <h2
      class="w-fit text-xl font-semibold border-b border-b-amber-300"
      v-if="posters && posters.length > 0"
    >
      {{ !title ? 'Recents Movies' : title }}
    </h2>
    <Loader v-if="isPending" />

    <div
      v-if="posters && posters.length > 0"
      class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4"
    >
      <div v-for="(poster, index) in posters">
        <div class="relative shadow-xl shadow-black rounded-lg">
          <!-- Main poster -->
          <RouterLink to="#" @click="handleChangeVideoIndex(index)">
            <div class="h-[350px]">
              <img
                :src="poster.imagePath"
                :alt="poster.title"
                class="w-full h-full rounded-lg shadow-lg object-cover"
              />
            </div>
            <div class="absolute bottom-2 left-3">
              <h3 class="font-semibold text-shadow-lg">
                {{ poster.title }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Modal Video Player -->
      <VideoPlayer
        v-if="posterClicked"
        position="bottom"
        :url="posters[videoIndex].videoPath"
        @close="handleCloseVideoPlayer"
      />
    </div>
    <div
      v-else-if="!isPending && posters.length === 0"
      class="flex flex-col items-center justify-center h-[400px]"
    >
      <p class="text-center text-white text-2xl">
        {{ !title ? "Le serveur n'est pas disponible, veuillez revenir plus tard." : '' }}
      </p>
    </div>
  </div>
</template>
