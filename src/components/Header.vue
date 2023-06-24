<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getImageLink } from '@/lib/getImageLink';
import AddNewTask from './AddNewTask.vue';
import Toast from './Toast.vue';
defineProps<{ toggle: boolean, theme: string, show: boolean, edit: boolean }>();
defineEmits<{ (e: 'toggle-handler'): boolean, (e: 'edit-board'): void }>()
const route = useRoute();


</script>
<template>
    <header :theme="theme" :toggle="toggle" :class="toggle ? 'toggle' : 'toggle_'">
        <span v-if="toggle" style="display: flex;align-items: center;">
            <div class="logo">
                <img :src="`${theme === 'light' ? getImageLink('logo-dark') : getImageLink('logo-light')}`" />
            </div>
            <h1>{{ route.params.children }}</h1>
        </span>
        <h1 v-if="!toggle">{{ route.params.children }}</h1>
        <div class="button">
            <button v-on:click="$emit('toggle-handler')">+Add New Task</button>
            <img src="../assets/icon-vertical-ellipsis.svg" v-on:click="$emit('edit-board')" />
            <Toast content="Board" :show="edit" @toggle-handler="$emit('edit-board')" />
        </div>
        <add-new-task :show="show" @toggle-handler="$emit('toggle-handler')"></add-new-task>
    </header>
</template>
<style scoped>
header {
    background-color: var(--secondary-background);
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: 1px solid var(--line);
    align-items: center;
    position: fixed;
    z-index: 2;
}

.toggle {
    width: 100%;
    left: 0;

}

.toggle_ {
    left: 250px;

    width: calc(100% - 250px);
}

.logo {
    padding: 1rem 1rem;
    align-items: center;
    display: flex;
    background-color: var(--secondary-background);
    /* border-right: 1px solid var(--line); */
    position: relative;
}

.logo img {
    padding-right: 1rem;
    height: 25px;
}

.logo+h1 {
    padding-left: 1rem;
}

.logo::after {
    content: '';
    position: absolute;
    height: 159%;
    width: 1px;
    right: 0;
    background-color: var(--line);
    /* border-left: 1px solid var(--line); */
}

h1 {
    color: var(--primary-text);
    font-weight: 700;
    font-size: 24px;
    text-transform: capitalize;
}

.button {
    display: flex;
    gap: 1rem;
}

button {
    all: unset;
    background-color: var(--primary-purple);
    text-transform: capitalize;
    padding: 1rem 1.6rem;
    border-radius: 24px;
    font-weight: 700;
    font-size: 15px;
    color: var(--vt-c-white);
    cursor: pointer;
}

.button img {
    margin: auto 0;
    height: calc(51px - 25px);
    cursor: pointer;
}

button:disabled {
    opacity: 0.2;
    cursor: not-allowed;
}
</style>