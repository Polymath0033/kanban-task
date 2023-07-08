<script setup lang="ts">
import DeleteUI from './UI/DeleteUI.vue';
import { useRouter } from 'vue-router';
const props = defineProps<{ show: boolean, payload: string | string[], route: string | string[] }>();
defineEmits<{ (e: 'delete-board'): void, (e: 'cancel-delete'): boolean }>();
const router = useRouter()
</script>
<template>
    <DeleteUI :show="props.show" heading="board" v-bind:delete-message="`Are you sure you want to delete the ‘${router.currentRoute.value.params.children}’ board ? This action will remove all columns and tasks
                and cannot be reversed.`" @cancel-delete="$emit('cancel-delete')" @delete="$emit('delete-board')" />
</template>
<style scoped></style>