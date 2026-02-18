import { ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export function useNavIndicator() {
  const route = useRoute()
  const navContainer = ref<HTMLElement | null>(null)
  const indicatorLeft = ref(0)
  const indicatorRight = ref(0)

  const getTargetPos = () => {
    if (!navContainer.value) return null
    const activeEl = navContainer.value.querySelector(
      `[data-path="${route.path}"]`
    ) as HTMLElement
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

  return {
    navContainer,
    indicatorLeft,
    indicatorRight,
    updateIndicator,
  }
}
