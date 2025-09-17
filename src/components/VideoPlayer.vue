<script lang="ts" setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'

defineProps({
  url: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close'])
</script>
<template>
  <div :class="`absolute left-0 right-0 ${position === 'top' ? 'top-0' : 'bottom-0'} z-10`">
    <button
      class="py-1.5 px-3 bg-red-700 uppercase font-semibold absolute right-0 top-0 cursor-pointer z-20"
      @click="emit('close')"
    >
      <CloseIcon />
    </button>
    <video :src="url" controls class="w-full h-[93vh]" autoplay></video>
  </div>
</template>
<style scoped></style>
