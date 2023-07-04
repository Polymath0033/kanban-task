<script setup lang="ts">
import { getImageLink } from '@/lib/getImageLink';
import ThemeBtn from './UI/ThemeBtn.vue';
import IconEye from './icons/IconEye.vue';
import { useStore } from '../store_/index'
import type { Data } from '@/types/Data';
import { UseToggle } from '@/composable/use-toggle';
import AddBoard from './AddBoard.vue';
import { watch, reactive, onMounted } from 'vue';

import NavList from './UI/NavList.vue';
const { toggle, toggleHandler } = UseToggle()
defineProps<{ theme: string }>()
defineEmits<{ (e: 'toggle-theme'): void, (e: 'toggle-btn'): void }>()
const store = useStore();
const data: Data[] = store.state.data;
type T = Data['boards']
let routes: T = reactive([]);

watch(() => store, (newRoutes, oldRoutes) => {
    let arr: T = []
    for (const a of data) {
        arr = [...a.boards]
    }
    const fil = (arr.filter((g) => g))
    routes = [...fil];
}, { deep: true, immediate: true })

onMounted(() => {
    let arr: T = []
    for (const a of data) {
        arr = [...a.boards]
    }

    const fil = (arr.filter((g) => g))
    routes = [...fil];
})
console.log(routes)
</script>
<template>
    <aside>
        <span>
            <div class="image">
                <img :src="`${theme === 'light' ? getImageLink('logo-dark') : getImageLink('logo-light')}`" />
            </div>
            <NavList :toggle="toggle" :routes="routes" @toggle-handler="toggleHandler" />
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

@media screen and (max-width:768px) {
    aside {
        width: 200px
    }

}
</style>