<script setup lang="ts">
import { UseToggle } from '@/composable/use-toggle';
import { useStore } from '../store_/index'
import { useRoute, useRouter } from 'vue-router'
import router from '../router'
import EditBoard from './EditBoard.vue'
import DeleteBoard from './DeleteBoard.vue'
import { ref, type Ref, watch, onMounted, watchEffect, onUpdated } from 'vue';
import { type Boards } from '@/types/Data';
const props = defineProps<{ content: string, show: boolean, route: string | string[] }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
const store = useStore();
const route = useRoute();
//const router = useRouter()
const show_: Ref<boolean> = ref(false);
const toggleDelete: () => boolean = () => show_.value = !show_.value;
let title: Ref<string | string[]> = ref('')
const { toggle, toggleHandler } = UseToggle()
const openEdit: () => void = () => {
    emit('toggle-handler')
    toggleHandler()
}
const openDelete: () => void = () => {
    emit('toggle-handler');
    toggleDelete()
}
const deleteHandler: () => void = () => {
    store.dispatch('deleteBoard', title.value);
    toggleDelete();
    router.back()
}
const filterData: (route_: string | string[]) => void = (route_) => {
    title.value = route_

}
watch(() => route.params.children, (newRoute, oldRoute) => {
    title.value = newRoute
})
onUpdated(() => {
    title.value = route.params.children
})
console.log(title.value)
onMounted(() => {
    title.value = route.params.children;
    console.log(title.value)
})
</script>
<template>
    <ul v-if="props.show">
        <li v-on:click="openEdit">Edit {{ props.content }} {{ title }} </li>
        <li v-on:click="openDelete">Delete {{ props.content }}</li>
    </ul>
    <EditBoard :show="toggle" @toggle-handler="toggleHandler" />
    <DeleteBoard :show="show_" :payload="title" @delete-board="deleteHandler" @cancel-delete="toggleDelete" />
</template>
<style>
@import url('../assets/toast.css');
</style>