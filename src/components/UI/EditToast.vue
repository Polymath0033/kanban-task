<script setup lang="ts">
import { ref, type Ref, } from 'vue';
import EditTask from '../EditTask.vue'
import DeleteTask from '../DeleteTask.vue';
import { useStore } from '@/store_';
const props = defineProps<{ show: boolean, title: string, name: string, status: string[], routeName: string | string[] }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void, (e: 'toggle-modal'): void }>()
const edit: Ref<boolean> = ref(false)
const delete_: Ref<boolean> = ref(false);
const store = useStore();
const editHandler: () => boolean = () => edit.value = !edit.value;
const deleteHandler: () => boolean = () => delete_.value = !delete_.value;
const openEdit: () => void = () => {
    editHandler();
    emit('toggle-handler')
}

const openDelete: () => void = () => {
    emit('toggle-handler');
    deleteHandler();
}
const deleteTask = () => {
    const payload = { routeName: props.routeName, column: props.name, title: props.title }
    store.dispatch('deleteTask', payload)
    emit('toggle-modal')
}
</script>
<template>
    <ul v-if="props.show">
        <li v-on:click="openEdit">Edit Task</li>
        <li v-on:click="openDelete">Delete Task</li>
    </ul>
    <EditTask :show="edit" :title="props.title" :name="props.name" :status="props.status" @toggle-handler="editHandler" />
    <DeleteTask :show="delete_" :title="props.title" @cancel-delete="deleteHandler" @delete-task="deleteTask" />
</template>
<style  scoped>
@import url('../../assets/toast.css');

ul {
    bottom: 0;
    right: -90px;
    top: 100%;
    height: 90px;
}
</style>