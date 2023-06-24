<script setup lang="ts">
import Modal from './UI/Modal.vue';
import { useStore } from '@/store_';
import type { Boards, Data, Columns } from '@/types/Data';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, onUpdated } from 'vue';
import type { Ref } from 'vue';
import Cancel from './icons/Cancel.vue'
defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void }>();
const route = useRoute();
const store = useStore();
const routeName = route.params.children;
let isTitleValid = false;
const title: Ref<string> = ref(''); const tasks: Ref<{ val: string, isValid: boolean }[]> = ref([{ val: '', isValid: false }])

const data: Data[] = store.getters.data;
let k: Boards = [];
for (const a of data) {
    k = [...a.boards]
}
const filterData: (board: string | string[]) => void = (board) => {
    const filter = k.filter(({ name }) => name === board);

    let columns_: Columns = [];
    filter.forEach(({ name, columns }) => {
        title.value = name;

        columns_ = [...columns]
    })
    if (tasks.value.length < columns_.length) {
        tasks.value = Array(columns_.length).fill({ val: '', isValid: false })
    } else if (tasks.value.length > columns_.length) {
        tasks.value.length = columns_.length
    }

    for (let i = 0; i < tasks.value.length && columns_.length; i++) {
        tasks.value[i].val = (columns_[i].name);
        console.log(tasks.value[i].val)
        console.log(tasks.value)
    }
    console.log(tasks.value)
}
const blurHandler: (index: number) => void = (index) => {
    tasks.value[index].isValid = false;
    isTitleValid = false
}
const addColumns: () => void = () => {
    tasks.value.push({ val: '', isValid: false })
}
const removeColumns: (index: number) => void = index => {
    tasks.value.splice(index, 1)
    console.log(index)

}
const editBoard: () => void = () => {
    //const=[{name:''}]
    const payload = { name: title.value, columns: tasks.value };
    store.dispatch('editBoard', payload);
    console.log(payload)
    console.log(store.getters.data)
    emit('toggle-handler')
}
watch(() => route.params.children, (newRoute, oldRoute) => {
    filterData(newRoute)
})
onMounted(() => {
    const initialRoute = route.params.children;
    filterData(initialRoute)
})

</script>
<template>
    <modal :show="show" v-on:toggle-handler="$emit('toggle-handler')">
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
                    <div>
                        <input type="text" v-model="task.val" @blur="blurHandler(index)" />
                    </div>
                    <i v-on:click="removeColumns(index)">
                        <Cancel />
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