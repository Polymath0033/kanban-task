<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getImageLink } from '@/lib/getImageLink';
import { useStore } from '../store_/index'
import AddNewTask from './AddNewTask.vue';
import Toast from './Toast.vue';
import { ref, type Ref, computed, type ComputedRef } from 'vue';
import { type Columns } from '@/types/Data';
import Dropdown from './Dropdown.vue';
import { type Data } from '@/types/Data';
defineProps<{ toggle: boolean, theme: string, show: boolean, edit: boolean, columns: Columns }>();
defineEmits<{ (e: 'toggle-handler'): boolean, (e: 'edit-board'): void, (e: 'toggle-theme'): void }>();
const dropdown: Ref<boolean> = ref(false);
const dropdownHandler: () => boolean = () => dropdown.value = !dropdown.value;
const route = useRoute();
const store = useStore()
const data: ComputedRef<Data[]> = computed(() => store.getters.data)
const hasRoute = computed(() => data.value[0].boards.findIndex(({ name }) => name === route.params.children))
</script>
<template>
    <header :theme="theme" :toggle="toggle" :class="toggle ? 'toggle' : 'toggle_'">
        <span v-if="toggle" :class="toggle ? 'span' : ''" style="display: flex;align-items: center;">
            <div class="logo">
                <img :src="`${theme === 'light' ? getImageLink('logo-dark') : getImageLink('logo-light')}`" />
            </div>
            <h1>{{ hasRoute !== -1 ? route.params.children : '' }} </h1>
        </span>
        <span class="mobile">
            <div>
                <img :src="getImageLink('logo-mobile')" />
            </div>
            <h1>{{ hasRoute !== -1 ? route.params.children : "" }} <img v-on:click="dropdownHandler" class="caret"
                    :src="`${dropdown ? getImageLink('icon-chevron-up') : getImageLink('icon-chevron-down')}`" />
                <Dropdown @dropdown-handler="dropdownHandler" @toggle-theme="$emit('toggle-theme')" :dropdown="dropdown" />
            </h1>
        </span>
        <h1 v-if="!toggle" class="h1">{{ hasRoute !== -1 ? route.params.children : "" }}</h1>
        <div class="button">
            <button :disabled="columns.length < 1" v-on:click="$emit('toggle-handler')">+Add New Task</button>
            <button :disabled="columns.length < 1" v-on:click="$emit('toggle-handler')">+</button>
            <img src="../assets/icon-vertical-ellipsis.svg" :disabled="columns.length < 1"
                :class="columns.length < 1 ? 'img' : ''" v-on:click="$emit('edit-board')" />
            <Toast content="Board" :show="edit" :route="route.params.children" @toggle-handler="$emit('edit-board')" />
        </div>
        <add-new-task :show="show" :route="route.params.children" @toggle-handler="$emit('toggle-handler')"></add-new-task>
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

.logo,
.mobile {
    padding: 1rem 1rem;
    align-items: center;
    display: flex;
    background-color: var(--secondary-background);
    /* border-right: 1px solid var(--line); */
    position: relative;
}

.mobile {
    display: none;
}

.logo img,
.mobile img {
    padding-right: 1rem;
    height: 25px;
}

.logo+h1,
.mobile+h1 {
    padding-left: 1rem;
}

.logo::after {
    content: '';
    position: absolute;
    height: 159%;
    width: 1px;
    right: 0;
    background-color: var(--line);
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

.button button:last-of-type {
    display: none;
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

button:disabled,
img:disabled,
.img {
    opacity: 0.2;
    cursor: not-allowed !important;
}

.caret {
    height: initial !important;
}

@media screen and (max-width:768px) {
    .toggle_ {
        left: 200px;
        width: calc(100% - 200px);
    }

    .logo {
        padding: 0.2rem 0.2rem;
    }
}

@media screen and (max-width: 520px) {
    .toggle_ {
        left: 0;
        width: 100%;
    }

    .logo+h1 {
        display: none;
    }

    .mobile {
        padding: 0.4rem 0.4rem;
    }

    .mobile h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        font-size: 18px;
    }

    .span {
        display: none !important;
    }

    .caret {
        height: initial;
        cursor: pointer;
    }

    .h1 {
        display: none;
    }

    .mobile {
        display: flex;
    }

    .button button:first-of-type {
        display: none;
    }

    .button button:last-of-type {
        display: flex;
    }

    .logo {
        display: none;
    }
}
</style>