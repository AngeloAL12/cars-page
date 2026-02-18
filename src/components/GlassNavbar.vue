<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)
const navContainer = ref<HTMLElement | null>(null)
const indicatorLeft = ref(0)
const indicatorRight = ref(0)

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Services', to: '/services' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
]

const getTargetPos = () => {
  if (!navContainer.value) return null
  const activeEl = navContainer.value.querySelector(`[data-path="${route.path}"]`) as HTMLElement
  if (!activeEl) return null
  const containerRect = navContainer.value.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()
  return {
    left: activeRect.left - containerRect.left,
    right: containerRect.right - activeRect.right,
  }
}

const updateIndicator = (animate = true) => {
  nextTick(() => {
    const pos = getTargetPos()
    if (!pos) return
    if (!animate) {
      indicatorLeft.value = pos.left
      indicatorRight.value = pos.right
      return
    }
    const movingRight = pos.left > indicatorLeft.value
    if (movingRight) {
      indicatorRight.value = pos.right
      setTimeout(() => {
        indicatorLeft.value = pos.left
      }, 80)
    } else {
      indicatorLeft.value = pos.left
      setTimeout(() => {
        indicatorRight.value = pos.right
      }, 80)
    }
  })
}

onMounted(() => {
  setTimeout(() => updateIndicator(false), 50)
})

watch(
  () => route.path,
  () => updateIndicator(),
)

watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 md:top-4 md:left-1/2 md:-translate-x-1/2">
    <div
      class="glass-nav"
      :class="[
        'flex items-center justify-between',
        'px-4 py-3',
        'md:px-2 md:py-2 md:rounded-2xl md:justify-center',
      ]"
    >
      <div
        class="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none hidden md:block"
      />

      <RouterLink to="/" class="flex items-center gap-2 md:hidden z-10" @click="isOpen = false">
        <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
          />
        </svg>
        <span class="text-lg font-semibold text-white">Brand</span>
      </RouterLink>

      <div ref="navContainer" class="hidden md:flex items-center gap-1 relative">
        <div
          class="indicator"
          :style="{
            left: `${indicatorLeft}px`,
            right: `${indicatorRight}px`,
          }"
        />
        <RouterLink
          to="/"
          data-path="/"
          class="relative z-10 px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-xl transition-colors duration-200"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            />
          </svg>
        </RouterLink>
        <RouterLink
          v-for="item in navItems.slice(1)"
          :key="item.name"
          :to="item.to"
          :data-path="item.to"
          class="relative z-10 px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-xl transition-colors duration-200"
        >
          {{ item.name }}
        </RouterLink>
      </div>

      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-2 -mr-2 text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-200 z-10"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen" class="fixed inset-0 top-[60px] glass-nav md:hidden">
        <div class="flex flex-col p-4 gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.to"
            class="px-4 py-3 text-base font-medium text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-200"
            :class="{ 'bg-white/15 text-white': route.path === item.to }"
            @click="isOpen = false"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.glass-nav {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .glass-nav {
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
}

.indicator {
  position: absolute;
  top: 0;
  height: calc(100% - 8px);
  margin-top: 4px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    left 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
    right 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
