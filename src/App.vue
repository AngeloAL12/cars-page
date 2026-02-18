<script setup lang="ts">
import './assets/global.css'
import GlassNavbar from './components/GlassNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_center,#450a0a_0%,#000000_70%)]">
    <GlassNavbar />
    <RouterView />
  </div>
</template>
