<script setup lang="ts">
import type { Columns } from '@/types/Data';
import Card from './UI/Card.vue';
const props = defineProps<{ columns: Columns }>()
// v-if="col.tasks.length > 0"
</script>
<template>
    <menu v-for="col in props.columns" :key="col.name">
        <h6 class="title"> <span></span>{{ col.name }} ({{ col.tasks.length }})</h6>
        <Card v-for="task in col.tasks" :key="task.title" :title="task.title" :subtasks="task.subtasks" :columns="columns"
            :col="col.name" />
    </menu>
    <aside>
        <h2>+ New Column</h2>
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

aside h2 {
    font-size: 1.2rem;
    font-weight: 700;
}
</style>