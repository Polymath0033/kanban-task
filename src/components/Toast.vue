<script setup lang="ts">
import { UseToggle } from '@/composable/use-toggle';
import { useStore } from '../store_/index'
import { useRoute, useRouter } from 'vue-router'
import EditBoard from './EditBoard.vue'
import DeleteBoard from './DeleteBoard.vue'
import { ref, type Ref, computed, type ComputedRef, type ComputedGetter } from 'vue';
import { type Boards, type Columns, type Data } from '@/types/Data';
const props = defineProps<{ content: string, show: boolean, route: string | string[] }>()
const emit = defineEmits<{ (e: 'toggle-handler'): void }>()
const store = useStore();
const route = useRoute();
const show_: Ref<boolean> = ref(false);
const router = useRouter()
const data: ComputedRef<Data[]> = computed(() => store.getters.data)
const title: ComputedRef<string> = computed(() => {
    const filtered = data.value[0].boards.filter(({ name }) => name === route.params.children)
    let title_: string = '';
    for (const a of filtered) {
        title_ = a.name
    }
    return title_

})
const toggleDelete: () => boolean = () => show_.value = !show_.value;

const { toggle, toggleHandler } = UseToggle()
const openEdit: () => void = () => {
    //emit('toggle-handler')
    store.dispatch('toggleModal')
    // console.log(store.getters.modal)
    // toggleHandler()
}
const routes: ComputedRef<Boards> = computed(() => {
    let k: Boards = []
    data.value[0].boards.forEach((a) => {
        k.push(a)
    })
    return k
})
const openDelete: () => void = () => {
    emit('toggle-handler');
    toggleDelete()
}
const deleteHandler: () => void = () => {
    store.dispatch('deleteBoard', title.value);
    toggleDelete();
    const randomRoute = Math.floor(Math.random() * routes.value.length)
    if (routes.value.length === 0) {
        router.replace('/')
    }
    router.replace(`/${routes.value[randomRoute].name}`)
}

</script>
<template>
    <ul v-if="props.show">
        <li v-on:click="openEdit">Edit {{ props.content }} </li>
        <li v-on:click="openDelete">Delete {{ props.content }}</li>
    </ul>
    <EditBoard />
    <DeleteBoard :show="show_" :route="props.route" :payload="title" @delete-board="deleteHandler"
        @cancel-delete="toggleDelete" />
</template>
<style>
@import url('../assets/toast.css');
</style>