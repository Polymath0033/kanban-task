<script setup lang="ts">
import { ref, type Ref } from 'vue';

import EditTask from '../EditTask.vue'
const props = defineProps<{ show: boolean, title: string, name: string }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()

const edit: Ref<boolean> = ref(false)
const delete_: Ref<boolean> = ref(false);
const editHandler: () => boolean = () => edit.value = !edit.value;
const deleteHandler: () => boolean = () => delete_.value = !delete_.value;
const openEdit: () => void = () => {
    editHandler();
    emit('toggle-handler')
    console.log(props.show)
    console.log(edit.value)

}
const openDelete: () => void = () => {
    emit('toggle-handler');
    deleteHandler()
}
</script>
<template>
    <ul v-if="props.show">
        <li v-on:click="openEdit">Edit Task</li>
        <li v-on:click="deleteHandler">Delete Task</li>
    </ul>
    <EditTask :show="edit" :title="props.title" :name="props.name" @toggle-handler="editHandler" />
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