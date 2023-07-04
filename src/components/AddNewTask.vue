<script setup lang="ts">
import Modal from './UI/Modal.vue';
import Cancel from './icons/Cancel.vue';
import { selectInjectionKeys } from '../InjectionKey';
import { inject, onUpdated, reactive, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Ref } from 'vue';
import { useStore } from '../store_';
import type { Boards, Columns, Data } from '@/types/Data';
const props = defineProps<{ show: boolean, route: string | string[] }>();
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
const route = useRoute();
const store = useStore();
let select_: string[] = []
const title: { val: string, isValid: boolean } = reactive({ val: '', isValid: false })
const description: Ref<string> = ref('')
let k: Boards = [];
const data: Data[] = store.getters.data

console.log(data)
for (const a of data) {
    k = [...a.boards]
}

console.log(props.route)
const filterData: (route: string | string[]) => void = (route) => {
    let column: Columns = []
    let filter = (k.filter(({ name }) => name === route)).filter(({ columns }) => columns);
    for (const a of filter) {
        column = a.columns
    }
    let s: string[] = [];
    column.forEach(({ name }) => {
        s.push(name)
        select_ = [...s]
    }
    )
}
watch(() => route.params.children, (newRoute, oldRoute) => {
    filterData(newRoute)
})
onMounted(() => {
    const initialRoute = route.params.children;
    filterData(initialRoute)
})
// const filter = k.filter((k_) => k_.name === props.route)
// for (const a of filter) {
//     column = (a.columns)
// }
// console.log(column)
// for (const a of column) {
//     console.log(a.name)
//     select_.push(a.name)
// }
console.log(select_)
console.log(select_)
const subtasks: Ref<{ val: '', isValid: boolean }[]> = ref([{ val: '', isValid: false }, { val: "", isValid: false }]);
const addSubtasks: () => void = () => {
    subtasks.value.push({ val: '', isValid: false })
}
const selected: { val: string, isValid: boolean } = reactive({ val: '', isValid: false })
const removeSubtasks: (position: number) => void = (position) => {
    subtasks.value.splice(position, 1)
    console.log(position)
}
const blurHandler: (index: number) => void = (index) => {
    console.log(index)
    if (index === -1) {
        title.isValid = false;
    }
    subtasks.value[index].isValid = false
    if (index === -2) {
        selected.isValid = false
    }

}
const addNewTask = () => {
    if (title.val === '') {
        title.isValid = true;
        return;
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
    let subtask: { title: string, isCompleted: boolean }[] = []
    if (subtask.length < subtasks.value.length) {
        subtask = []
        for (const sub of subtasks.value) {
            subtask.push({ title: sub.val, isCompleted: false })
        }
    } else if (subtask.length > subtasks.value.length) {
        subtask.length = subtasks.value.length
    }
    const routeName = route.params.children
    const payload_task = { title: title.val, description: description.value, status: selected.val, subtasks: subtask }
    const payload = { routeName, column: selected.val, payload: payload_task };
    store.dispatch('addTask', payload);
    console.log(store.getters.data)
    title.val = '';
    title.isValid = false
    description.value = '';
    for (const subtask of subtasks.value) {
        subtask.val = ''
        subtask.isValid = false
    }
    selected.val = ''
    emit('toggle-handler')
}

onUpdated(() => {

})

</script>
<template>
    <modal :show="props.show" @toggle-handler="$emit('toggle-handler')" :top="3">
        <form v-on:submit.prevent="addNewTask">
            <h2>Add new task</h2>
            <div class="form-control" :class="title.isValid ? 'title-error' : ''">
                <label for="title">Title</label>
                <input type="text" name="title" v-model="title.val" @blur="blurHandler(-1)"
                    placeholder="e.g Table coffee break" />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea style="width:100%;" v-model="description" placeholder=" e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little.">
                </textarea>
            </div>
            <div class="subtasks">
                <h4>Subtasks</h4>
                <div v-for="(subtask, index) in subtasks" :key="index" class="form-flex">
                    <div :class="subtask.isValid ? 'error' : ''">
                        <input type="text" v-model="subtask.val" @blur="blurHandler(index)" />
                    </div>
                    <i v-on:click="removeSubtasks(index)">
                        <Cancel :is-valid="subtask.isValid" />
                    </i>
                </div>
                <button type="button" v-on:click="addSubtasks">Add new Tasks</button>
            </div>
            <div class="status">
                <h4>Status</h4>
                <select v-model="selected.val" @blur="blurHandler(-2)" :class="selected.isValid === true ? 'error' : ''">
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