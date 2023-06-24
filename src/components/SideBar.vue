<script setup lang="ts">
import { getImageLink } from '@/lib/getImageLink';
import ThemeBtn from './UI/ThemeBtn.vue';
import IconEye from './icons/IconEye.vue';
import { useStore } from '../store_/index'
import type { Data } from '@/types/Data';
import { UseToggle } from '@/composable/use-toggle';
import AddBoard from './AddBoard.vue';
import { watch, reactive, onMounted } from 'vue';
const { toggle, toggleHandler } = UseToggle()
defineProps<{ theme: string }>()
defineEmits<{ (e: 'toggle-theme'): void, (e: 'toggle-btn'): void }>()
const store = useStore();
const data: Data[] = store.state.data;
type T = Data['boards']
let routes: T = reactive([]);

watch(() => data, (newRoutes, oldRoutes) => {

    let arr: T = []
    for (const a of data) {
        arr = [...a.boards]
    }

    const fil = (arr.filter((g) => g))
    routes = [...fil];
    if (newRoutes.length > oldRoutes.length) {
        console.log('New items added to array')
    }
}, { deep: true })
// console.log(fil);
onMounted(() => {
    let arr: T = []
    for (const a of data) {
        arr = [...a.boards]
    }

    const fil = (arr.filter((g) => g))
    routes = [...fil];
})
</script>
<template>
    <aside>
        <span>
            <div class="image">
                <img :src="`${theme === 'light' ? getImageLink('logo-dark') : getImageLink('logo-light')}`" />
            </div>
            <nav class="list">
                <p>all board</p>
                <router-link v-for="route_ in routes" :to="route_.name"><img src="../assets/icon-board.svg" />{{ route_.name
                }}</router-link>
                <button v-on:click="toggleHandler"><img src="../assets/icon-board.svg" /> + Create New Board</button>
                <AddBoard :show="toggle" @toggle-handler="toggleHandler" />
            </nav>
        </span>
        <div class="btn">
            <ThemeBtn @toggle-theme="$emit('toggle-theme')" />
            <button v-on:click="$emit('toggle-btn')">
                <IconEye />
                Hide Sidebar
            </button>
        </div>
    </aside>
</template>
<style scoped>
.image {
    position: relative;
    top: 0;
    padding: 1rem;
    height: 84px;
    display: flex;
    align-items: center;
}

.image img {
    height: 25px;
}

aside {
    background-color: var(--secondary-background);
    position: relative;
    min-height: 100vh;
    border-right: 1px solid var(--line);
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 1rem;
    gap: 2rem;
}

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

nav img {
    height: calc(100% - 5px);
    margin: auto 0;
}

.btn button {
    all: unset;
    cursor: pointer;
    width: calc(100% - 2rem);
    color: var(--gray);
    display: flex;
    margin: 1rem auto 0.5rem auto;
    align-items: center;
    gap: 0.4rem;
    justify-content: start;
    font-size: 15px;
    font-weight: 700;
}
</style>