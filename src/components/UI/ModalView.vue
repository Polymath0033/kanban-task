<script setup lang="ts">
defineEmits<{ (e: "cancel-delete"): void }>()
defineProps<{ show: boolean }>()
</script>
<template>
    <Teleport to="body">
        <div v-if="show" class="backdrop">
            <div class="div" v-on:click="$emit('cancel-delete')"></div>
            <dialog>
                <slot></slot>
            </dialog>
        </div>

    </Teleport>
</template>
<style scoped>
.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
}

.div {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    border: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    opacity: 0.5;
}

dialog {
    position: relative;
    border: none;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border-radius: 12px;
    z-index: 10000;
    background-color: var(--secondary-background);
    width: calc(100% - 60%);
}
</style>