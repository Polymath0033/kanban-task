<script setup lang="ts">
import Modal from './UI/Modal.vue';
import type { Ref, ComputedRef } from 'vue';
import { ref, computed } from 'vue';
import { useStore } from '@/store_';
import Cancel from './icons/Cancel.vue';
import type { Board, Columns } from '@/types/Data';
import { useRouter, useRoute } from 'vue-router';
defineProps<{ show: boolean }>();
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
const store = useStore();
const route = useRoute()
const board: ComputedRef<boolean> = computed(() => store.getters.board)
const toggleBoard = () => {
    store.dispatch('toggleBoard')
}
const router = useRouter();
const title: Ref<string> = ref('')
const columns: Ref<{ val: '', isValid: boolean }[]> = ref([{ val: '', isValid: false }, { val: '', isValid: false }]);
const addColumns: () => void = () => {
    columns.value.push({ val: '', isValid: false })
}
let isTitleValid = false;

const removeColumns: (position: number) => void = (position) => {
    columns.value.splice(position, 1)
}

const addBoard = () => {
    if (title.value === '') {
        isTitleValid = true;
        return
    }
    for (let i = 0; i < columns.value.length; i++) {
        if (columns.value[i].val === '') {
            columns.value[i].isValid = true;
            return
        }
    }
    let task = [];
    for (let i = 0; i < columns.value.length; i++) {
        task.push({ name: columns.value[i].val, tasks: [] })
    }
    const payload: Board = { name: title.value, columns: task }
    store.dispatch('addBoard', payload);
    store.dispatch('toggleBoard')
    emit('toggle-handler')
    title.value = '';
    for (let i = 0; i < columns.value.length; i++) {
        columns.value[i].val = '';
    }
    router.replace(`/${payload.name}`)
}
const blurHandler: (index: number) => void = (index) => {
    isTitleValid = false;
    columns.value[index].isValid = false;
}

</script>
<template>
    <modal v-on:toggle-handler="toggleBoard" :show="board">
        <form v-on:submit.prevent="addBoard">
            <h2>Add new board</h2>
            <div class="form-control" :class="isTitleValid === true ? 'error' : ''">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="title" placeholder="e.g Web Design" required
                    @blur="blurHandler(-1)" />
            </div>
            <div class="subtasks">
                <h4>Columns</h4>
                <div v-for="(column, index) in columns" :key="index" class="form-flex">
                    <div :class="column.isValid === true ? 'error' : ''">
                        <input type="text" v-model="column.val" @blur="blurHandler(index)" />
                    </div>
                    <i v-on:click="removeColumns(index)">
                        <Cancel :is-valid="column.isValid" />
                    </i>
                </div>
                <button type="button" v-on:click="addColumns">Add Columns</button>
            </div>
            <button type="submit" class="submit">Create Board</button>
        </form>
    </modal>
</template>
<style scoped>
@import '../assets/form.css';

form {
    gap: 1rem !important;
}
</style>