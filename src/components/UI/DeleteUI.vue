<script setup lang="ts">
import ModalView from './ModalView.vue';
defineProps<{ show: boolean, heading: string, deleteMessage: string }>()
defineEmits<{ (e: 'cancel-delete'): void, (e: 'delete'): void }>()
</script>
<template>
    <ModalView :show="show" @cancel-delete="$emit('cancel-delete')">
        <h2>Delete this {{ heading }}?</h2>
        <h5>{{ deleteMessage }}</h5>
        <div class="btn">
            <button v-on:click="$emit('delete')">Delete </button><button v-on:click="$emit('cancel-delete')">Cancel</button>
        </div>
    </ModalView>
</template>
<style scoped>
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

@media screen and (max-width:520px) {
    .btn {
        flex-direction: column;
    }
}
</style>