<script setup lang="ts">
import Modal from './UI/Modal.vue';
import Cancel from './icons/Cancel.vue';
import { selectInjectionKeys } from '../InjectionKey';
import { inject, onUpdated, ref } from 'vue';
import type { Ref } from 'vue';
defineProps<{ show: boolean }>();
defineEmits<{ (e: 'toggle-handler'): void }>()
const select_ = inject(selectInjectionKeys);
const subtasks: Ref<{ val: '', isValid: boolean }[]> = ref([{ val: '', isValid: false }, { val: "", isValid: false }]);
const addSubtasks: () => void = () => {
    subtasks.value.push({ val: '', isValid: false })
}
const removeSubtasks: (position: number) => void = (position) => {
    subtasks.value.splice(position, 1)
    console.log(position)
}
onUpdated(() => {

})

</script>
<template>
    <modal :show="show" @toggle-handler="$emit('toggle-handler')" :top="3">
        <form>
            <h2>Add new task</h2>
            <div class="form-control">
                <label for="title">Title</label>
                <input type="text" name="title" placeholder="e.g Table coffee break" />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea style="width:100%;">
                    e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little.
                </textarea>
            </div>
            <div class="subtasks">
                <h4>Subtasks</h4>
                <div v-for="(subtask, index) in subtasks" :key="index" class="form-flex">
                    <input type="text" v-model="subtask.val" /><i v-on:click="removeSubtasks(index)">
                        <Cancel />
                    </i>
                    {{ subtask.val }}
                </div>
                <button type="button" v-on:click="addSubtasks">Add new Tasks</button>
            </div>
            <div class="status">
                <h4>Status</h4>
                <select>
                    <option v-for="value in select_" :key="value">{{ value }}</option>
                </select>
            </div>
            <button type="submit" class="submit">Create Task</button>
        </form>
    </modal>
</template>
<style scoped>
@import '../assets/form.css';
</style>