<script setup lang="ts">
import { UseToggle } from '@/composable/use-toggle';
import { useStore } from '../store_/index'
import EditBoard from './EditBoard.vue'
const props = defineProps<{ content: string, show: boolean }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
console.log(props.show)

const store = useStore();
// const show = store.getters.edit;
const { toggle, toggleHandler } = UseToggle()
const openEdit: () => void = () => {
    emit('toggle-handler')
    toggleHandler()
    console.log(props.show)

}
</script>
<template>
    <ul v-if="props.show">
        <li v-on:click="openEdit">Edit {{ props.content }}</li>
        <li>Delete {{ props.content }}</li>
    </ul>
    <EditBoard :show="toggle" @toggle-handler="toggleHandler" />
</template>
<style>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    position: absolute;
    bottom: 0;
    z-index: 10000;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    background-color: var(--secondary-background);
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    width: 200px;
    right: 1rem;
    bottom: -100%;

}

ul li {
    font-weight: 700;
    font-size: 13px;
    color: var(--gray);
    padding: 0.4rem 0;
    cursor: pointer;
}

ul li:last-of-type {
    color: var(--error);
}
</style>