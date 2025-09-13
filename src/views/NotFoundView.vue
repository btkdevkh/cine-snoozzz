<script setup lang="ts"></script>
<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for doesn’t exist.</p>
    <RouterLink to="/identity">⬅ Go back home</RouterLink>
  </div>
</template>
<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}
.not-found h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #e74c3c;
}
.not-found p {
  margin-bottom: 1.5rem;
  color: #555;
}
.not-found a {
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}
</style>
