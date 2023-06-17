import { ref } from 'vue'
import type { Ref } from 'vue'
export const UseToggle = () => {
  const toggle: Ref<boolean> = ref(false)
  const toggleHandler = () => (toggle.value = !toggle.value)
  return {
    toggle: toggle,
    toggleHandler: toggleHandler
  }
}
