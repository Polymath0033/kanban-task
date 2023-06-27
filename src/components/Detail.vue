<script setup lang="ts">
import Modal from './UI/Modal.vue'
import type { Columns, Data, Boards, Tasks, Task, SubTasks } from '@/types/Data';
import { onUpdated, onMounted, watch } from 'vue';
import VerticalEllipsis from './icons/VerticalEllipsis.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store_';
import type { Ref } from 'vue';
import { ref } from 'vue';
import EditToast from './UI/EditToast.vue';
import { UseToggle } from '@/composable/use-toggle';
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
const { toggle, toggleHandler } = UseToggle()
const props = defineProps<{ show: boolean; title: string }>()
const route = useRoute();
const routeName = route.params.children;
const store = useStore();
const data: Data[] = store.getters.data;
let fh: Ref<Tasks> = ref([]);
const toggleToast = () => {
    // toggleHandler();
    emit('toggle-handler')
}
const toggleCompleted: (param: Task, title_: string) => void = (param, title_) => {
    const boardIndex = data[0].boards.findIndex(({ name }) => name === route.params.children);
    const filterBoard = data[0].boards.filter(({ name }) => name === route.params.children);
    let columns: Columns = [];
    for (const col of filterBoard) {
        columns = col.columns
    }
    const filterColumns = columns.filter(({ name }) => name === param.status)
    const columnIndex = columns.findIndex(({ name }) => name === param.status)
    let tasks: Tasks = []
    for (const task of filterColumns) {
        tasks = task.tasks
    }
    const filterTasks = tasks.filter(({ title }) => title === param.title);
    const taskIndex = tasks.findIndex(({ title }) => title === param.title);
    let subtasks: SubTasks = [];
    for (const subtask of filterTasks) {
        subtasks = subtask.subtasks
    }
    const subTaskIndex = subtasks.findIndex(({ title }) => title === title_)
    const payload = { boardIndex: boardIndex, columnIndex: columnIndex, taskIndex: taskIndex, subtaskIndex: subTaskIndex }
    store.dispatch('toggleCompleted', payload)
}
let status: string[] = []
const filterHandler: (router: string | string[]) => void = (router) => {
    let k: Boards = [];
    let columns: Columns = [];
    for (const a of data) {
        k = [...a.boards]
    }
    let filter = (k.filter(({ name }) => name === router)).filter(({ columns }) => columns);
    for (const a of filter) {
        columns = a.columns;
    }
    columns.forEach(({ name }) => {
        status.push(name)
    })
}
onUpdated(() => {
    let k: Boards = [];
    let columns: Columns = [];
    for (const a of data) {
        k = [...a.boards]
    }
    let filter = (k.filter(({ name }) => name === routeName)).filter(({ columns }) => columns);
    for (const a of filter) {

        columns = a.columns
    }
    let gh: Tasks = []
    columns.forEach(({ name, tasks }) => {
        gh.push(...tasks)
    }
    )
    fh.value = gh.filter((g) => g.title === props.title)
})
watch(() => props.title, (newTitle, oldTitle) => {

})
watch(() => route.params.children, (newRoute, oldRoute) => {
    filterHandler(newRoute)
})
onMounted(() => {
    fh.value
    const router = route.params.children;
    filterHandler(router)
})

</script>
<template>
    <modal :show="props.show" @toggle-handler="$emit('toggle-handler')">
        <div v-for="detail in fh" class="grid">
            <div class="top" role="alert">
                <h2> {{ detail.title }} </h2>
                <i role="button" v-on:click="toggleHandler">
                    <VerticalEllipsis />
                </i>
                <edit-toast :show="toggle" :title="detail.title" :name="detail.status"
                    @toggle-handler="toggleHandler"></edit-toast>
            </div>
            <p>{{ detail.description }}</p>
            <div class=" form">
                <h4>Subtasks ({{ detail.subtasks.filter((g) => g.isCompleted === true).length }} of {{
                    detail.subtasks.length
                }})
                </h4>
                <form>
                    <div class="form-control" v-for="subtask in detail.subtasks">
                        <input type="checkbox" v-on:change="toggleCompleted(detail, subtask.title)"
                            :checked="subtask.isCompleted" name="" id="">
                        <label
                            :style="{ textDecoration: subtask.isCompleted === true ? 'line-through' : '', opacity: !subtask.isCompleted ? 1 : 0.5 }">{{
                                subtask.title
                            }}</label>
                    </div>
                </form>
            </div>
            <div class="select">
                <h4>Current status {{ status.length }}</h4>
                <select name="" id="">
                    <option v-for="option in status" :value="option" :selected="option === detail.status">{{ option }}
                    </option>
                </select>
            </div>
        </div>

    </modal>
</template>
<style scoped>
.grid {
    display: grid;
    gap: 1.5rem;
}

.top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.top h2 {
    font-weight: 700;
    font-size: 18px;
    color: var(--primary-text)
}

.top i {
    cursor: pointer;
}

p {
    color: var(--gray);
    font-size: 13px;
    font-weight: 500;
    text-align: start;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form h4 {
    color: var(--gray);
    font-weight: 700;
    font-size: 12px;

}

.form form {
    display: grid;
    gap: 0.5rem;
}

.form-control {
    display: flex;
    background-color: var(--primary-bg);
    border-radius: 4px;
    padding: 0.5rem;
    gap: 0.5rem;
    align-items: center;
    position: relative;
}

.form-control label {
    color: var(--primary-text);
    opacity: 0.5;
    font-weight: 700;
    font-size: 12px;
    line-height: 1.5;
}

.form input {
    appearance: none;
    width: 25px;
    height: 25px;
    background-color: var(--secondary-background);
    border: 1px solid hsl(233, 11%, 84%);
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.form input:checked {
    background-color: var(--main-purple);
    color: white;
    border: none;

}

.form-control:hover {
    background-color: var(--hover);
}

.form input:checked::after {
    content: url('../assets/Path 2.svg');
}

.select {
    display: grid;
    gap: 0.5rem;

}

.select h4 {
    color: var(--gray);
    font-weight: 700;
    font-size: 13px;
}

.select select {
    background-color: transparent;
    border: 1px solid rgba(130, 143, 163, 0.25);
    border-radius: 4px;
    padding: 0.5rem;
    font-weight: 500;
    color: var(--primary-text);
    background-image: url('../assets/active-caret.svg');
    background-repeat: no-repeat;
    background-position: right 0.25rem center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.select option {
    background-color: var(--secondary-background);
    color: var(--gray);
    border-radius: 14px;
    padding: 1rem;
}

.select select:focus {
    border: 1px solid var(--gray);
    outline: none;
}
</style>