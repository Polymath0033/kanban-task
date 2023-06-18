<script setup lang="ts">
import Card from './UI/Card.vue';
import type { Columns } from '@/types/Data';

defineProps<{ columns: Columns }>();


</script>
<template>
    <menu v-for="col in columns" :key="col.name">
        <h6 class="title"> <span></span>{{ col.name }} ({{ col.tasks.length }})</h6>
        <Card v-for="task in col.tasks" :key="task.title" :title="task.title" :subtasks="task.subtasks"
            :columns="columns" />
    </menu>
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
}

.title span {
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 50%;
    margin-right: 0.5rem;
}
</style>