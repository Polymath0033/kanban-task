<script setup lang="ts">
import DeleteUI from './UI/DeleteUI.vue';
import { useRoute } from 'vue-router';
import { watch, ref, type Ref, onMounted, onUpdated } from 'vue';
const props = defineProps<{ show: boolean, payload: string | string[] }>();
defineEmits<{ (e: 'delete-board'): void, (e: 'cancel-delete'): boolean }>();
const route = useRoute()
let title: Ref<string | string[]> = ref('')
console.log(props.payload)
watch(() => route.params.children, (newRoute, oldRoute) => {
    title.value = newRoute
}, { immediate: true })
onUpdated(() => {
    title.value = route.params.children
})
onMounted(() => {
    title.value = route.params.children
})
console.log(title.value)
const sub = `Are you sure you want to delete the ‘${title.value, props.payload}’ board? This action will remove all columns and
            tasks
            and cannot be reversed.`
</script>
<template>
    <DeleteUI :show="props.show" heading="board" :delete-message="sub" @cancel-delete="$emit('cancel-delete')"
        @delete="$emit('delete-board')" />
</template>
<style scoped></style>