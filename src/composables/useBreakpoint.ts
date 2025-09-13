import { ref, onMounted, onUnmounted } from 'vue'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export function useBreakpoint() {
  const current = ref<Breakpoint>('sm')

  function update() {
    if (window.matchMedia('(min-width: 1536px)').matches) current.value = '2xl'
    else if (window.matchMedia('(min-width: 1280px)').matches) current.value = 'xl'
    else if (window.matchMedia('(min-width: 1024px)').matches) current.value = 'lg'
    else if (window.matchMedia('(min-width: 768px)').matches) current.value = 'md'
    else current.value = 'sm'
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { current }
}
