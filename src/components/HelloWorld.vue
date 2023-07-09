<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from '../store_/index';
import Column from './Column.vue';
import { type Ref, ref } from 'vue';
import type { Data, Boards, Columns } from '@/types/Data';
import { computed, type ComputedRef } from 'vue';
import Button from '../components/UI/Button.vue'

const router = useRoute();
const store = useStore();
const drag: Ref<boolean> = ref(false)
const space: ComputedRef<boolean> = computed(() => store.getters.toggle)
const data: ComputedRef<Data[]> = computed(() => store.getters.data);
const columns: ComputedRef<Columns> = computed(() => {
  const filtered = (data.value[0].boards.filter(({ name }) => name === router.params.children))
  let columns: Columns = []
  for (const a of filtered) {
    columns = a.columns
  }

  return columns
});
const hasRoute: ComputedRef<number> = computed(() => data.value[0].boards.findIndex(({ name }) => name === router.params.children))
const addTask = () => {
  store.dispatch('toggleModal')
}
const createBoard = () => {
  store.dispatch('toggleBoard')
}
const modal: ComputedRef<boolean> = computed(() => store.getters.modal)
</script>

<template>
  <section v-if="hasRoute === -1" :style="{ left: space ? 0 + 'px' : 250 + 'px' }" :class="!space ? 'space' : ''">
    <div class="div">
      <Button value="Add New Board" @click-handler="createBoard" />
    </div>
  </section>
  <section v-else-if="columns.length < 1" :style="{ left: space ? 0 + 'px' : 250 + 'px' }" :class="!space ? 'space' : ''"
    class="div">
    <p>This board is empty,Create new column to get started.</p>
    <Button value="+ Add new column" @click-handler="addTask" />
  </section>
  <section v-else :class="!space ? 'left' : ''">

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

.space {
  width: calc(100% - 250px) !important;
  left: 250px;
}

.left {
  left: 250px !important;
}

@media screen and (max-width:768px) {
  .space {
    width: calc(100% - 200px) !important;
    left: 200px;
  }

  .left {
    left: 200px !important;
  }
}

@media screen and (max-width: 520px) {
  .space {
    width: 100% !important;
    left: 0 !important;
  }

  .left {
    left: 0px !important;
  }
}

.div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 84px);
  position: relative;
  gap: 1rem;
}

.div p {
  text-align: center;
}

.div {
  color: var(--gray);
  font-weight: 700;
  font-size: 1.125;
}
</style>
