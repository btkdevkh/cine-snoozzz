<script lang="ts" setup>
import { ref } from 'vue'
import { API_URL } from '@/config'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import MovieList from '@/components/MovieList.vue'
import { useRouter } from 'vue-router'

const queryClient = useQueryClient()

const router = useRouter()
const term = ref<string>('')
const pageNum = router.currentRoute.value.params.page
const currentPage = ref<number>(Number(pageNum) ? Number(pageNum) : 1)

const searchMovieData = async (searchTerm: string) => {
  try {
    const res = await fetch(`${API_URL}/movie/search/${searchTerm}?page=${currentPage.value}`, {
      method: 'POST',
    })
    if (!res.ok) throw new Error('Not OK')
    return await res.json()
  } catch (error) {
    console.log('error :', error)
    return []
  }
}
const {
  mutate: searchMovieMutate,
  isPending: isPendingMovieData,
  data: movieData,
} = useMutation({
  mutationFn: searchMovieData,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['movies', currentPage, term] })
  },
  onError: (err: any) => {
    console.log(err)
  },
})

const handleClickPage = (nb: number) => {
  currentPage.value = nb
  router.replace(`/identity/member/search/${nb}`)
  searchMovieMutate(term.value)
}

const handleSearch = () => {
  searchMovieMutate(term.value)
}
</script>
<template>
  <main class="relative min-h-screen text-white">
    <div class="flex flex-col justify-center">
      <form @submit.prevent="handleSearch" class="flex justify-center gap-2 p-4">
        <div class="w-[500px]">
          <input
            type="search"
            name="search-movie"
            id="search-movie"
            placeholder="Rechercher le nom du film..."
            class="w-full py-2 px-4 border border-amber-300 rounded-2xl"
            v-model="term"
          />
        </div>
        <button
          type="submit"
          class="py-2 px-4 bg-blue-800 rounded-2xl hover:bg-blue-700 font-semibold uppercase cursor-pointer"
        >
          Rechercher
        </button>
      </form>

      <!-- Results -->
      <div class="flex flex-col gap-5">
        <MovieList
          :items="movieData?.movies ?? []"
          :isPending="isPendingMovieData"
          title="Films Trouvés"
        />

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
  </main>
</template>
<style scoped></style>
