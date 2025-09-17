<script setup lang="ts">
import { ref } from 'vue'
import { API_URL } from '@/config'
import Posters from '@/components/Posters.vue'
import { useQuery } from '@tanstack/vue-query'
import MovieList from '@/components/MovieList.vue'

const currentPage = ref<number>(1)

const getTenMovies = async () => {
  try {
    const res = await fetch(`${API_URL}/movie/ten`)
    if (!res.ok) throw new Error('Not OK')
    const data = await res.json()
    return data.movies
  } catch (error) {
    console.log('error :', error)
    return []
  }
}
const { isPending: isPendingMovieTenData, data: movieTenData } = useQuery({
  queryKey: ['movies/ten'],
  queryFn: getTenMovies,
})

const getMovieData = async () => {
  try {
    const res = await fetch(`${API_URL}/movie?page=${currentPage.value}`)
    if (!res.ok) throw new Error('Not OK')
    return await res.json()
  } catch (error) {
    console.log('error :', error)
    return []
  }
}
const { isPending: isPendingMovieData, data: movieData } = useQuery({
  queryKey: ['movies', currentPage],
  queryFn: getMovieData,
})

const handleClickPage = (nb: number) => {
  currentPage.value = nb
}
</script>
<template>
  <div class="member-view bg-[#17171B] min-h-screen text-white relative py-5">
    <div class="flex flex-col gap-5">
      <Posters :posters="movieTenData ?? []" :isPending="isPendingMovieTenData" />
      <MovieList :items="movieData?.movies ?? []" :isPending="isPendingMovieData" />

      <!-- Pagination -->
      <div v-show="movieData?.pagination?.totalPages > 1" class="flex justify-center gap-1.5">
        <ul
          v-for="(n, index) in Array.from(
            { length: movieData?.pagination?.totalPages },
            (_, i) => i + 1,
          )"
        >
          <li
            class="py-2 px-4 bg-amber-300 text-black font-bold rounded-2xl cursor-pointer hover:opacity-100"
            :class="
              index + 1 === movieData?.pagination?.currentPage ? 'bg-amber-400' : 'opacity-30'
            "
            @click="handleClickPage(n)"
          >
            {{ n }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
