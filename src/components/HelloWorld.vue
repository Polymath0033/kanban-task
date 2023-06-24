<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from '../store_/index';
import Column from './Column.vue';
import type { ComputedRef } from 'vue';
import type { Data, Boards, Columns } from '@/types/Data';
import { ref, watch, computed, onMounted } from 'vue';
import type { Ref } from 'vue';
const router = useRoute();
const store = useStore();
const space: ComputedRef<boolean> = computed(() => store.getters.toggle)
const data: Data[] = store.getters.data;
let k: Boards = [];
for (const a of data) {
  k = [...a.boards]
}
let columns: Ref<Columns> = ref([]);
const filterData: (route: string | string[]) => void = (route) => {
  let filter = (k.filter(({ name }) => name === route)).filter(({ columns }) => columns);
  for (const a of filter) {
    columns.value = a.columns
  }
}
watch(

  () => router.params.children, (newRoute: string | string[], oldRoute) => {
    filterData(newRoute)
  }
)
onMounted(() => {
  const initialRoute = router.params.children;
  filterData(initialRoute)
})
</script>

<template>
  <section :style="{ left: space ? 0 + 'px' : 250 + 'px' }">
    <Column :columns="columns" />
  </section>
</template>

<style scoped>
section {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  position: relative;
  top: 84px;
  align-items: flex-start;
}
</style>
