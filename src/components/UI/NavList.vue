<script setup lang="ts">
import type { Boards } from '@/types/Data';
import Board from '../icons/Board.vue'
import AddBoard from '../AddBoard.vue';
defineProps<{ toggle: boolean, routes: Boards }>()
defineEmits<{ (e: 'toggle-handler'): void }>()
</script>
<template >
    <nav class="list">
        <p>all board{{ routes.length > 2 ? 's' : '' }} ({{ routes.length }})</p>
        <router-link v-for="route_ in routes" :to="route_.name">
            <i>
                <Board />
            </i>
            {{ route_.name
            }}
        </router-link>
        <button v-on:click="$emit('toggle-handler')">
            <i>
                <Board color="#635fc7" />
            </i>
            + Create New Board
        </button>
        <AddBoard :show="toggle" @toggle-handler="$emit('toggle-handler')" />
    </nav>
</template>
<style scoped>
.list {
    padding-top: 1rem;
}

.list p {
    color: var(--gray);
    letter-spacing: 2.4px;
    margin-left: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
}

nav {
    display: flex;
    flex-direction: column;
}

nav a,
.list button,
.btn button:hover {
    all: unset;
    padding: 0.5rem 1rem;
    display: flex;
    gap: 1rem;
    font-weight: 700;
    font-size: 15px;
    width: 80%;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    color: var(--gray);
    cursor: pointer;
}

.list button {
    color: var(--primary-purple)
}

nav a.router-link-exact-active {
    background-color: var(--primary-purple);
    color: var(--vt-c-white);
}

nav a.router-link-exact-active:hover {
    background-color: var(--hover);
}

nav a:hover,
.btn button:hover {
    background-color: var(--hover-btn);
    color: var(--primary-purple);
}

.btn button:hover {
    margin-top: 1rem;
}

nav i {
    margin: auto 0;
}
</style>