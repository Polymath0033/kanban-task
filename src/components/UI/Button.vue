<script setup lang="ts">
defineProps<{ value: string }>()
defineEmits<{ (e: 'click-handler'): void }>()
</script>
<template>
    <button v-on:click="$emit('click-handler')">
        {{ value }}
    </button>
</template>
<style scoped>
button {
    display: flex;
    background-color: var(--primary-purple);
    color: #ffffff;
    border: none;
    border-radius: 24px;
    text-transform: capitalize;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    padding: 1rem 1.6rem;
}
</style>