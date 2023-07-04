import { useStore } from '../store_/index'
import type { Boards, Data } from '@/types/Data'
import { watch, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
export const UseData = () => {
  const data: Data[] = store.getters.data
  let k: Boards = []
  for (const a of data) {
    k = [...a.boards]
  }
  let filter: Boards = []
  const filterHandler: (route_: string | string[]) => void = (route_) => {
    filter = k.filter(({ name }) => name === route_)
  }
  watch(
    () => route.params.children,
    (newRoute, oldRoute) => {
      filterHandler(newRoute)
    }
  )
  onMounted(() => {
    const initialRoute = route.params.children
    filterHandler(initialRoute)
  })
  return filter
}
