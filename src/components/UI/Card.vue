<script setup lang="ts">
import type { Columns, SubTasks, Data, Boards, Tasks } from '@/types/Data';
import { useStore } from '../../store_/index'
import { useRoute } from 'vue-router';
import Detail from '../Detail.vue';
import { UseToggle } from '@/composable/use-toggle';
import { ref, onUpdated, watch } from 'vue';
import type { Ref } from 'vue';
defineProps<{ title: string, subtasks: SubTasks, columns: Columns }>();
const store = useStore();
const data: Data[] = store.getters.data;
const route = useRoute()
let routeName = route.params.children;
const { toggle, toggleHandler } = UseToggle();
let title_: Ref<string> = ref('');
let k: Boards = [];
let columns: Columns = [];
for (const a of data) {
    k = [...a.boards]
}
let filter = (k.filter(({ name }) => name === routeName)).filter(({ columns }) => columns);
for (const a of filter) {
    columns = a.columns
}

let gh: Tasks = []
columns.forEach((h) => {
    gh.push(...h.tasks);
}
)
const clickHandler: (title: string) => void = (title) => {
    title_.value = title;
    let fh = gh.filter((g) => g.title === title)
    toggleHandler()
    store.dispatch('toggleModal', title)
}

</script>

<template>
    <div v-on:click="clickHandler(title)" class="card">
        <h2>{{ title }}</h2>
        <p>{{ (subtasks.filter((k) => k.isCompleted === true)).length }} of {{ subtasks.length }} subtasks</p>
    </div>
    <Detail @toggle-handler="toggleHandler" :show="toggle" :title="title_" />
</template>
<style scoped>
.card {
    background-color: var(--secondary-background);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(54, 78, 126, 0.101545);
    padding: 1rem;
    width: 250px;
    display: grid;
    gap: 0.5rem;
    cursor: pointer;
}

.card h2 {
    color: var(--primary-text);
    font-weight: 700;
    font-size: 15px;
    text-align: start;
}

.card p {
    color: var(--gray);
    font-weight: 700;
    font-size: 12px;
    text-align: start;
}
</style>