<script setup lang="ts">
import Modal from './UI/Modal.vue';
import Cancel from './icons/Cancel.vue';
import { ref, inject, reactive, type Ref } from 'vue';
import { useStore } from '@/store_';
import type { Columns, Data, Tasks, SubTasks } from '@/types/Data';
import { useRoute } from 'vue-router';
import { selectInjectionKeys } from '@/InjectionKey';
const props = defineProps<{ show: boolean, title: string, name: string }>();
const emit = defineEmits<{ (e: 'toggle-handler'): void }>();
const store = useStore();
const tasks: Ref<Tasks> = ref([])
const data: Data[] = store.getters.data;
const boards = data[0].boards;
const route = useRoute();
console.log(route.params.children);
console.log(props.title)
const filter = boards.filter(({ name }) => name === route.params.children);
const boardIndex = boards.findIndex(({ name }) => name === route.params.children);
const selected: { val: string, isValid: boolean } = reactive({ val: '', isValid: false })
let columns: Columns = [];
for (const col of filter) {
    columns = col.columns
}
let tasks_: Tasks = [];
const filterColumn = columns.filter(({ name }) => name === props.name)
const columnIndex = columns.findIndex(({ name }) => name === props.name)
for (const col of filterColumn) {
    tasks_ = col.tasks
}
const filterTask = tasks_.filter(({ title }) => title === props.title);
const taskIndex = tasks_.findIndex(({ title }) => title === props.title)
let subTasks: SubTasks = []
for (const sub of filterTask) {
    subTasks = sub.subtasks
}
if (tasks.value.length < filterTask.length) {
    tasks.value = [];
    for (const task of filterTask) {
        tasks.value.push({ title: task.title, description: task.description, status: task.status, subtasks: task.subtasks })
    }
} else if (tasks.value.length > filterTask.length) {
    tasks.value.length = filterTask.length
}

const subtasks: Ref<{ val: string, isValid: boolean }[]> = ref([])
if (subtasks.value.length < subTasks.length) {
    subtasks.value = [];
    for (const sub of subTasks) {
        subtasks.value.push({ val: sub.title, isValid: false })
    }
} else if (subtasks.value.length > subTasks.length) {
    subtasks.value.length = subTasks.length
}

const addSubtasks = () => {
    subtasks.value.push({ val: '', isValid: false })
}
const removeSubtasks: (index: number) => void = (index) => {
    subtasks.value.splice(index, 1)
}
let isTitleValid = false;
const select = inject(selectInjectionKeys);
const editTask = () => {
    for (let i = 0; i < tasks.value.length; i++) {
        if (tasks.value[i].title === '') {
            isTitleValid = true;
            return;
        }
    }
    for (let i = 0; i < subtasks.value.length; i++) {
        if (subtasks.value[i].val === '') {
            subtasks.value[i].isValid = true;
            return;
        }
    }
    if (selected.val === '') {
        selected.isValid = true;
        return;
    }
    const newSubtasks = [];
    const maxLength = Math.max(subtasks.value.length, subTasks.length);
    for (let i = 0; i < maxLength; i++) {
        const newObj: { title: string, isCompleted: boolean } = { title: '', isCompleted: false }
        if (i < subTasks.length) {
            newObj.isCompleted = subTasks[i].isCompleted
        }
        if (i < subtasks.value.length) {
            newObj.title = subtasks.value[i].val
        }
        newSubtasks.push(newObj)
    }
    const subtasksIndexes: number[] = [];
    const subtasksInputs: { title: string; isCompleted: boolean }[] = []
    for (let i = 0; i < newSubtasks.length; i++) {
        subtasksIndexes.push(i);
        subtasksInputs.push({ title: newSubtasks[i].title, isCompleted: newSubtasks[i].isCompleted })
    }
    let title = '';
    let status = '';
    let description = '';
    let subtask: { title: string; isCompleted: boolean }[] = []
    for (let a of tasks.value) {
        title = a.title;
        status = a.status;
        description = a.description
        subtask = a.subtasks
    }
    const tasksInput = { title, description, status, subtask }
    const payload = { boardIndex: boardIndex, columnIndex: columnIndex, tasksIndex: taskIndex, tasksInput: tasksInput, subtasksIndexes: subtasksIndexes, subtasksInputs: subtasksInputs }
    store.dispatch('editTask', payload)
    emit('toggle-handler')

}
</script>
<template>
    <Modal :show="props.show" @toggle-handler="$emit('toggle-handler')" :top="3">
        <form v-for="task in tasks" v-on:submit.prevent="editTask">
            <h2>Edit</h2>
            <div class="form-control">
                <label for="title">Title</label>
                <input type="text" name="title" required v-model="task.title" :class="isTitleValid === true ? 'error' : ''"
                    placeholder="e.g Table coffee break" />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea style="width:100%;" v-model="task.description">
                    e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little.
                </textarea>
            </div>
            <div class="subtasks">
                <h4>Subtasks</h4>
                <div v-for="(subtask, index) in subtasks" :key="index" class="form-flex">
                    <div :class="subtask.isValid === true ? 'error' : ''">
                        <input type="text" v-model="subtask.val" />
                    </div>
                    <i v-on:click="removeSubtasks(index)">
                        <Cancel :is-valid='subtask.isValid' />
                    </i>
                </div>
                <button type="button" v-on:click="addSubtasks">Add new Tasks</button>
            </div>
            <div class="status">
                <h4>Status </h4>
                <select>
                    <option v-for="value in select" :key="value" :selected='value === task.status'>{{ value }}</option>
                </select>
            </div>
            <button type="submit" class="submit">Save changes</button>
        </form>
    </Modal>
</template>
<style scoped>
@import url('../assets/form.css');
</style>
