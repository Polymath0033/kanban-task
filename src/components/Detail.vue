<script setup lang="ts">
import Modal from './UI/Modal.vue'
import type { Columns, SubTasks, Data, Boards, Tasks } from '@/types/Data';
import { onUpdated, onMounted, watch } from 'vue';
import VerticalEllipsis from './icons/VerticalEllipsis.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store_';
import type { Ref } from 'vue';
import { ref } from 'vue';
defineEmits<{ (e: 'toggle-handler'): void }>()
const props = defineProps<{ show: boolean; title: string }>()
const route = useRoute();
const routeName = route.params.children;
const store = useStore()
// const show:boolean=store.getters.modal
const data: Data[] = store.getters.data;
let fh: Ref<Tasks> = ref([]);
const select: Ref<string[]> = ref([])
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
    columns.forEach((h) => {
        select.value.push(h.name)
        gh.push(...h.tasks)
    }
    )
    console.log(select.value)
    fh.value = gh.filter((g) => g.title === props.title)
})
watch(() => props.title, (newTitle, oldTitle) => {

})
onMounted(() => {
    fh.value
})

</script>
<template>
    <modal :show="props.show" @toggle-handler="$emit('toggle-handler')">
        <div v-for="detail in fh" class="grid">
            <div class="top" role="alert">
                <h2> {{ detail.title }} </h2>
                <i role="button">
                    <VerticalEllipsis />
                </i>
            </div>
            <p>{{ detail.description }}</p>
            <div class="form">
                <h4>Subtasks ({{ detail.subtasks.filter((g) => g.isCompleted === true).length }} of {{
                    detail.subtasks.length
                }})
                </h4>
                <form>
                    <div class="form-control" v-for="subtasks in detail.subtasks">
                        <input type="checkbox" :checked="subtasks.isCompleted" name="" id="">
                        <label>{{ subtasks.title }}</label>
                    </div>
                </form>

            </div>
            <div class="select">
                <h4>Current status {{ select.length }}</h4>
                <select name="" id="">
                    <option v-for="option in select" :value="option" :selected="option === detail.status">{{ option }}
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

.form input:checked::after {
    /* content: 'a'; */
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