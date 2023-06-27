<script setup lang="ts">
import { UseToggle } from '@/composable/use-toggle';
import { useStore } from '../store_/index'
import EditBoard from './EditBoard.vue'
import DeleteBoard from './DeleteBoard.vue'
import { useRoute } from 'vue-router';
import { ref, type Ref } from 'vue';
const props = defineProps<{ content: string, show: boolean }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
console.log(props.show)
const store = useStore();
const route = useRoute();
const routeName = route.params.children;
const show_: Ref<boolean> = ref(false);
const toggleDelete: () => boolean = () => show_.value = !show_.value;
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
    const payload = route.params.children;
    store.dispatch('deleteBoard', payload);
    toggleDelete();
}
console.log(routeName);
</script>
<template>
    <ul v-if="props.show">
        <li v-on:click="openEdit">Edit {{ props.content }}</li>
        <li v-on:click="openDelete">Delete {{ props.content }}</li>
    </ul>
    <EditBoard :show="toggle" @toggle-handler="toggleHandler" />
    <DeleteBoard :show="show_" :payload="routeName" @delete-board="deleteHandler" @cancel-delete="toggleDelete" />
</template>
<style>
@import url('../assets/toast.css');
</style>