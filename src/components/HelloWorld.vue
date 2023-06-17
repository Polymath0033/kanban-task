<script setup lang="ts">
import { useRoute } from 'vue-router';
import { UseToggle } from '../composable/use-toggle';
//@ts-ignore
import { useStore } from '../store_/index';
import Column from './Column.vue';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { Data } from '@/types/Data';
const router = useRoute();
console.log(router.params)
const { toggle, toggleHandler } = UseToggle()
const store = useStore();
const space: ComputedRef<boolean> = computed(() => store.getters.toggle)
const data: Data[] = store.getters.data;
type T = Data['boards'];
let k: T = [];
for (const a of data) {
  k = [...a.boards]
}
const filter = k.filter(({ name }) => name === router.params.children);
console.log(filter)
console.log(k)
</script>

<template>
  <section :style="{ left: space ? 0 + 'px' : 250 + 'px' }">
    <Column v-for="x in   5" />
    <!-- <Card /> -->
  </section>
</template>

<style scoped>
section {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  position: relative;
  top: 84px;
}
</style>
