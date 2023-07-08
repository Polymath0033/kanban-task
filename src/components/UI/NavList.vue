<script setup lang="ts">
import type { Boards, Data } from '@/types/Data';
import Board from '../icons/Board.vue'
import AddBoard from '../AddBoard.vue';
import { type ComputedRef, computed } from 'vue';
import { useStore } from '@/store_';
defineProps<{ toggle: boolean }>()
defineEmits<{ (e: 'toggle-handler'): void, (e: 'dropdown'): void }>()
const store = useStore()
const data: ComputedRef<Data[]> = computed(() => store.getters.data)
const routes: ComputedRef<Boards> = computed(() => {
    let k: Boards = []
    data.value[0].boards.forEach((a) => {
        k.push(a)
    })
    return k
})
const board: ComputedRef<boolean> = computed(() => store.getters.board)
const toggleBoard = () => {
    store.dispatch('toggleBoard')
}
</script>
<template >
    <nav class="list">
        <p>all board{{ routes.length > 2 ? 's' : '' }} ({{ routes.length }})</p>
        <router-link @click="$emit('dropdown')" v-for="route_ in routes" :to="route_.name">
            <i>
                <Board />
            </i>
            {{ route_.name
            }}
        </router-link>
        <button v-on:click="toggleBoard">
            <i>
                <Board color="#635fc7" />
            </i>
            + Create New Board
        </button>
        <AddBoard :show="board" @toggle-handler="toggleBoard" />
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

nav a {
    text-transform: capitalize;
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