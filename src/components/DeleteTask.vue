<script setup lang="ts">
import DeleteUI from './UI/DeleteUI.vue';
const props = defineProps<{ show: boolean, title: string, }>()
defineEmits<{ (e: 'cancel-delete'): void, (e: 'delete-task'): void }>()
const sub = `Are you sure you want to delete the ‘${props.title}’ and it's subtasks?. This action cannot be reversed`
</script>
<template>
    <DeleteUI :show="props.show" heading="task" :delete-message="sub" @cancel-delete="$emit('cancel-delete')"
        @delete="$emit('delete-task')" />
</template>