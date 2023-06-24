<script setup lang="ts">
defineEmits<{ (e: 'toggle-handler'): void }>()
defineProps<{ show: boolean; top?: number }>();

</script>
<template>
    <Teleport to="body">
        <div class="backdrop" v-if="show" v-on:click="$emit('toggle-handler')"></div>
        <Transition name="modal">
            <dialog open v-if="show" :style="{ top: top + 'rem' }">
                <slot></slot>
            </dialog>
        </Transition>
    </Teleport>
</template>
<style  scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    z-index: 100;
}


dialog {
    position: fixed;
    z-index: 1000;
    border: none;
    border-radius: 20px;
    background-color: var(--secondary-background);
    padding: 1.5rem;
    width: 80%;
    top: 20vh;
    left: 10%;
    /* overflow: hidden; */
}


.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.modal-enter-active {
    transition: all 0.4s ease-out;
}

.modal-leave-active {
    transition: all 0.4s ease-in;
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
    transform: scale(1);
}

@media screen and (min-width:768px) {
    dialog {
        left: calc(50% - 20rem);
        width: 40rem;
    }
}
</style>