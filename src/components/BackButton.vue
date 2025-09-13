<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <button
    @click="router.back()"
    class="py-2 px-5 w-fit bg-green-600 rounded font-semibold cursor-pointer"
  >
    Retour
  </button>
</template>
