<script setup lang="ts">
import { ref } from 'vue'
import { API_URL } from '@/config'
import type { IMovie } from '@/types/Movie'
import Loader from '@/components/Loader.vue'
import BackButton from '@/components/BackButton.vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

// Component states
const dataMovie = ref<{ title: string; moviePosterFile: File | null; movieFile: File | null }>({
  title: '',
  moviePosterFile: null,
  movieFile: null,
})

/**
 * Movie stuff
 * @handleMovieFileChange
 * @getMovieData
 * @deleteMovie
 * @createMovie
 */
const handleMovieFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement // Type assertion
  const file = target.files?.[0] // Get the first file

  if (file && target.name === 'movie-poster-file') {
    dataMovie.value.moviePosterFile = file
  }

  if (file && target.name === 'movie-file') {
    dataMovie.value.movieFile = file
  }
}

// Get movie
const getMovieData = async () => {
  try {
    const res = await fetch(`${API_URL}/movie`)
    if (!res.ok) throw new Error('Not OK')
    const data = await res.json()
    return data.movies as IMovie[]
  } catch (error) {
    console.log('error :', error)
    return [] // return empty array on error
  }
}
const { data: movieData, isPending: isPendingMovies } = useQuery<IMovie[]>({
  queryKey: ['movies'],
  queryFn: getMovieData,
})

// Delete movie
const deleteMovie = async (id: number) => {
  const res = await fetch(`${API_URL}/movie/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete movie')
  return res.json()
}
const { mutate: deleteMovieMutate } = useMutation({
  mutationFn: deleteMovie,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] })
  },
  onError: (err: any) => {
    console.log(err)
  },
})
const handleDeleteMovie = async (id: number) => {
  if (!confirm('You are about to delete this movie !')) return
  deleteMovieMutate(id)
}

// Create movie
const createMovie = async (formData: FormData) => {
  const res = await fetch(`${API_URL}/movie`, {
    method: 'POST',
    body: formData,
  })

  if (res.status === 409) throw new Error('Fichiers existent déjà!')
  if (!res.ok) throw new Error("Une erreur s'est produite.")
  return res.json()
}

const {
  mutate: createMovieMutate,
  isPending: isPendingCreateMovie,
  error: errorCreateMovie,
} = useMutation({
  mutationFn: createMovie,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] })
    // reset form after success
    dataMovie.value = { title: '', moviePosterFile: null, movieFile: null }
    const formEl = document.querySelector('[data-movie-form]') as HTMLFormElement
    formEl.reset()
  },
  onError: (err: any) => {
    console.log(err)
  },
})
const handleCreateMovie = () => {
  if (!dataMovie.value.title) return

  const formData = new FormData()
  formData.append('title', dataMovie.value.title)
  if (dataMovie.value.moviePosterFile) {
    formData.append('moviePosterFile', dataMovie.value.moviePosterFile)
  }
  if (dataMovie.value.movieFile) {
    formData.append('movieFile', dataMovie.value.movieFile)
  }

  createMovieMutate(formData)
}
</script>
<template>
  <div class="member-admin-view bg-[#17171B] min-h-[80vh] text-white">
    <div class="grid md:grid-cols-2 gap-7">
      <!-- Movie -->
      <div>
        <Loader v-if="isPendingMovies" />
        <!-- Movie List -->
        <div class="h-[450px] overflow-auto pr-1" v-if="movieData && movieData.length > 0">
          <table class="w-full">
            <thead class="bg-green-700 gap-3 p-2.5 sticky top-0">
              <tr class="flex gap-1 p-1">
                <th class="flex-1">ID</th>
                <th class="flex-10">Title</th>
                <th class="flex-1">Actions</th>
              </tr>
            </thead>
            <tbody v-for="movie in movieData">
              <tr class="flex gap-1 p-1">
                <td class="flex-1 text-center">{{ movie.id }}</td>
                <td class="flex-10">{{ movie.title }}</td>
                <td class="bg-red-700 px-2 uppercase font-semibold flex-1 rounded-xl">
                  <button class="cursor-pointer" @click="handleDeleteMovie(movie.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        @submit.prevent="handleCreateMovie"
        class="flex flex-col gap-3"
        data-movie-form
        enctype="multipart/form-data"
      >
        <h2 class="text-xl font-semibold">Create Movie</h2>
        <label for="movie-title">
          Title
          <input
            v-model="dataMovie.title"
            type="text"
            name="movie-title"
            id="movie-title"
            placeholder="Movie Title"
            class="w-full border border-gray-300 p-3 rounded"
          />
        </label>
        <label for="movie-poster-file"
          >Poster
          <input
            type="file"
            name="movie-poster-file"
            id="movie-poster-file"
            class="w-full border border-gray-300 p-3 rounded"
            @change="handleMovieFileChange"
          />
        </label>
        <label for="movie-file"
          >Movie
          <input
            type="file"
            name="movie-file"
            id="movie-file"
            class="w-full border border-gray-300 p-3 rounded"
            @change="handleMovieFileChange"
          />
        </label>
        <button
          type="submit"
          :class="`${isPendingCreateMovie ? 'p-1' : 'p-3'} bg-blue-700 rounded uppercase font-semibold cursor-pointer`"
        >
          <Loader v-if="isPendingCreateMovie" />
          <span v-else>Add Movie</span>
        </button>
        <p class="text-red-700" v-show="errorCreateMovie">{{ errorCreateMovie }}</p>

        <br />
        <BackButton />
      </form>
    </div>
  </div>
</template>
<style scoped>
.member-admin-view {
  max-width: 1024px;
  margin: 2rem auto;
  padding: 0 1rem;
}

table,
th,
td {
  width: 100%;
  padding: 0.2rem 0.4rem;
  border: 1px solid #2e2e2e;
}
</style>
