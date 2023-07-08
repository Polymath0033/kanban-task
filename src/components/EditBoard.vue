<script setup lang="ts">
import Modal from './UI/Modal.vue';
import { useStore } from '@/store_';
import type { Data, Columns, Tasks } from '@/types/Data';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, type ComputedRef, computed } from 'vue';
import type { Ref } from 'vue';
import Cancel from './icons/Cancel.vue'

const route = useRoute();
const store = useStore();

const router = useRouter()
let isTitleValid = false;
const title: Ref<string | string[]> = ref('');
let tasks: Ref<{ val: string; isValid: boolean }[]> = ref([])
const data: ComputedRef<Data[]> = computed(() => store.getters.data);
const modal: ComputedRef<boolean> = computed(() => store.state.modal)
const toggleModal = () => {
    store.dispatch('toggleModal')
}
const filterTask: (routeName: string | string[]) => { val: string; isValid: boolean }[] = (routeName) => {
    const filtered = (data.value[0].boards.filter(({ name }) => name === routeName))
    let columns: Columns = []
    for (const a of filtered) {
        columns = a.columns
    }
    let tasks_: { val: string; isValid: boolean }[] = []
    if (tasks_.length < columns.length) {
        tasks_ = [];
        for (const col of columns) {
            tasks_.push({ val: col.name, isValid: false })
        }
    } else if (tasks_.length > columns.length) {
        tasks_.length = columns.length
    }
    return tasks_
}
watch(() => route.params.children, (newRoute, oldRoute) => {
    title.value = newRoute
    tasks.value = filterTask(newRoute)
}, { immediate: true })

onMounted(() => {
    const initialRoute = route.params.children;
    title.value = initialRoute;
    console.log(modal.value)
})
const filterData = computed(() => {
    const k = data.value[0].boards.filter(({ name }) => name === route.params.children)
    let col: Columns = []
    for (const a of k) {
        col = a.columns
    }
    return col
})
console.log(tasks.value)
const blurHandler: (index: number) => void = (index) => {
    tasks.value[index].isValid = false;
    isTitleValid = false
}
const addColumns: () => void = () => {
    tasks.value.push({ val: '', isValid: false })
}
const removeColumns: (index: number) => void = index => {
    tasks.value.splice(index, 1)
}
const editBoard: () => void = () => {
    const boardIndex = data.value[0].boards.findIndex(({ name }) => name === route.params.children);
    const newArray = [];
    const maxLength = Math.max(tasks.value.length, filterData.value.length)
    for (let i = 0; i < maxLength; i++) {
        const newObj: { name: string, task: Tasks } = { name: '', task: [] }
        if (i < filterData.value.length) {
            newObj.task = filterData.value[i].tasks
        }
        if (i < tasks.value.length) {
            newObj.name = tasks.value[i].val
        }
        newArray.push(newObj)
    }
    const columnIndexes: number[] = [];
    const columnNames: string[] = []
    for (let i = 0; i < newArray.length; i++) {
        columnIndexes.push(i);
        columnNames.push(newArray[i].name)
    }
    const payload = { boardIndex: boardIndex, boardName: title.value, columnIndexes: columnIndexes, columnNames: columnNames };
    store.dispatch('editBoard', payload)
    route.params.children = title.value;
    router.replace({ path: `/${title.value}` })
    toggleModal()
}


</script>
<template>
    <modal :show="modal" v-on:toggle-handler="toggleModal">
        <form v-on:submit.prevent="editBoard">
            <h2>Edit board
            </h2>
            <div class="form-control" :class="isTitleValid === true ? 'error' : ''">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="title" placeholder="e.g Web Design" required
                    @blur="blurHandler(-1)" />
            </div>
            <div class="subtasks">
                <h4>Columns</h4>
                <div v-for="(task, index) in tasks" :key="index" class="form-flex">
                    <div :class="task.isValid === true ? 'error' : ''">
                        <input type="text" v-model="task.val" @blur="blurHandler(index)" />
                    </div>
                    <i v-on:click="removeColumns(index)">
                        <Cancel :is-valid="task.isValid" />
                    </i>
                </div>
                <button type="button" v-on:click="addColumns">Add new column</button>
            </div>
            <button type="submit" class="submit">Edit Board</button>
        </form>
    </modal>
</template>
<style scoped>
@import '../assets/form.css'
</style>