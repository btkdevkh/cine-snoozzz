<script setup lang="ts"></script>
<template>
  <main class="app-home">
    <header class="p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-1 w-[35px]">
          <img src="/logo.png" alt="logo" />
          <h1 class="title-logo text-xl font-bold text-shadow-xs text-shadow-white">CinéSnooZzz</h1>
        </div>
        <nav>
          <RouterLink
            to="/identity/login"
            class="border border-white text-white py-2 px-4 bg-[rgba(0,0,0,0.5)] hover:bg-[#ccc] hover:border-none hover:text-black transition text-xl"
            >S'IDENTIFIER
          </RouterLink>
        </nav>
      </div>
    </header>
  </main>
</template>
<style scoped>
.app-home {
  min-height: 100vh;
  background: url('/bg.jpg') no-repeat center center / cover;
}
</style>
