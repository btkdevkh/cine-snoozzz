<script setup lang="ts">
import Posters from '@/components/Posters.vue'
import { API_URL } from '@/config'
import { useQuery } from '@tanstack/vue-query'
import MovieList from '@/components/MovieList.vue'

const getTenMovies = async () => {
  try {
    const res = await fetch(`${API_URL}/movie/ten`)

    if (!res.ok) {
      throw new Error('Not OK')
    }

    const data = await res.json()
    return data.movies
  } catch (error) {
    console.log('error :', error)
  }
}

const getMovieData = async () => {
  try {
    const res = await fetch(`${API_URL}/movie`)
    if (!res.ok) {
      throw new Error('Not OK')
    }
    const data = await res.json()
    return data.movies
  } catch (error) {
    console.log('error :', error)
  }
}

const {
  isPending: isPendingMovieTenData,
  data: movieTenData,
  error: errorMovieTenData,
} = useQuery({
  queryKey: ['movies/ten'],
  queryFn: getTenMovies,
})

const {
  isPending: isPendingMovieData,
  data: movieData,
  error: errorMovieData,
} = useQuery({
  queryKey: ['movies'],
  queryFn: getMovieData,
})
</script>
<template>
  <div class="member-view bg-[#17171B] min-h-screen text-white relative">
    <Posters :posters="movieTenData ?? []" :isPending="isPendingMovieTenData" />
    <MovieList :items="movieData ?? []" :isPending="isPendingMovieData" />
  </div>
</template>
