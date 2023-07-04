<script setup lang="ts">
import NavList from './UI/NavList.vue';
import { useStore } from '@/store_';
import type { Data } from '@/types/Data';
import { reactive, watch, onMounted } from 'vue';
import { UseToggle } from '@/composable/use-toggle';
import ThemeBtn from './UI/ThemeBtn.vue'

defineProps<{ dropdown: boolean }>()
defineEmits<{ (e: 'dropdown-handler'): void, (e: 'toggle-theme'): void }>()
const { toggle, toggleHandler } = UseToggle()
const store = useStore();
const data: Data[] = store.getters.data;
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
    <div class="backdrop" v-if="dropdown" v-on:click="$emit('dropdown-handler')"></div>
    <div class="container" v-if="dropdown">
        <NavList :routes="routes" :toggle="toggle" @toggle-handler="toggleHandler" />
        <div class="btn">
            <ThemeBtn @toggle-theme="$emit('toggle-theme')" />
        </div>
    </div>
</template>
<style scoped>
.backdrop {
    position: fixed;
    top: 84px;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    z-index: 100;
}

.container {
    position: fixed;
    z-index: 1000;
    border: none;
    border-radius: 20px;
    background-color: var(--secondary-background);
    width: calc(100% - 100px);
    top: 100px;
    left: 10%;
    padding: 1rem 0rem;
}

.btn {
    margin-top: 1rem;
}
</style>