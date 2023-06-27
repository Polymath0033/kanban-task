<script setup lang="ts">
defineProps<{ show: boolean, payload: string | string[] }>();
defineEmits<{ (e: 'delete-board'): void, (e: 'cancel-delete'): boolean }>()
</script>
<template>
    <Teleport to='body'>
        <div v-if="show" class="backdrop">
            <div class="div" v-on:click="$emit('cancel-delete')"></div>
            <Transition name="modal">
                <dialog open v-if="show">
                    <h2>Delete this board?</h2>
                    <h5>Are you sure you want to delete the ‘{{ payload }}’ board? This action will remove all columns and
                        tasks
                        and cannot be reversed.</h5>
                    <div class="btn">
                        <button v-on:click="$emit('delete-board')">Delete </button><button
                            v-on:click="$emit('cancel-delete')">Cancel</button>
                    </div>
                </dialog>
            </Transition>
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
    z-index: 10000000000000;
    background-color: var(--secondary-background);
    width: calc(100% - 40%);
}

h2 {
    color: var(--error);
    font-size: 1.125rem;
    font-weight: 700;
}

h5 {
    color: var(--gray);
    font-weight: 500;
    font-size: 13px;
}

.btn {
    display: flex;
    width: 100%;
    gap: 1rem;
}

.btn button {
    display: flex;
    justify-content: center;
    border: none;
    border-radius: 20px;
    padding: 0.8rem 1rem;
    width: 100%;
    font-weight: 700;
    font-size: 0.82rem;
    transition: all .2s ease;
    cursor: pointer;
}

.btn button:first-child {
    background-color: var(--error);
    color: #fff;
    /* transition: all .2s ease; */
}

.btn button:first-child:hover {
    background-color: var(--error-hover);
}

.btn button:last-child {
    background-color: var(--secondary-btn);
    color: var(--primary-purple)
}

.btn button:last-child:hover {
    background-color: var(--secondary-hover);
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
</style>