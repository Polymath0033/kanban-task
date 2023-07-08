<script setup lang="ts">
import type { Columns } from '@/types/Data';
import Card from './UI/Card.vue';
import { useStore } from '../store_/index'
const props = defineProps<{ columns: Columns }>()
const store = useStore()
const addColumn = () => {
    store.dispatch('toggleModal')
}
// v-if="col.tasks.length > 0"
</script>
<template>
    <menu v-for="col in props.columns" :key="col.name">
        <h2 class="title"> <span></span>{{ col.name }} ({{ col.tasks.length }})</h2>
        <Card v-for="task in col.tasks" :key="task.title" :title="task.title" :subtasks="task.subtasks" :columns="columns"
            :col="col.name" />
    </menu>
    <aside role="cell">
        <button @click="addColumn">+ New Column</button>
    </aside>
</template>
<style scoped>
menu {
    display: grid;
    gap: 1rem;
}

.title {
    display: flex;
    letter-spacing: 2.4px;
    color: var(--gray);
    align-items: center;
    width: 250px;
    text-transform: uppercase;
}

.title span {
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 50%;
    margin-right: 0.5rem;
}

menu:nth-of-type(1) .title span {
    background-color: #49C4E5;
}

menu:nth-of-type(2) .title span {
    background-color: #8471F2;
}

menu:nth-of-type(3) .title span {
    background-color: #67E2AE;
}

aside {
    height: calc(100vh - 120px);
    border-radius: 6px;
    background: var(--aside);
    color: #828FA3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px
}

aside button {
    all: unset;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
}
</style>