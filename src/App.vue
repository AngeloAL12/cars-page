<script setup lang="ts">
import './assets/global.css'
import GlassNavbar from './components/GlassNavbar.vue'
</script>

<template>
  <!-- <div class="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-black-400">
    <GlassNavbar />
    <RouterView />
  </div> -->

  <div class="min-h-screen bg-[radial-gradient(circle_at_center,_#450a0a_0%,_#000000_70%)]">
    <GlassNavbar />
    <RouterView />
  </div>
</template>
