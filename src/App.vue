<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue';
import IconShow from './components/icons/IconShow.vue'
import SideBar from '@/components/SideBar.vue';
import Button from './components/UI/Button.vue';
import { ref, onMounted, computed, provide, reactive, watch } from 'vue';
import { selectInjectionKeys } from './InjectionKey';
import type { Ref, ComputedRef } from 'vue';
import { useStore } from './store_/index';
import type { Data, Boards, Columns } from './types/Data';
const store = useStore();
const router = useRouter()
const data: ComputedRef<Data[]> = computed(() => store.getters.data);
let select: string[] = reactive([])
const toggle = computed(() => store.getters.toggle);
const btnToggle: () => void = () => {
  store.dispatch('btnToggle');
}
const createBoard = () => {
  store.dispatch('toggleBoard')
}
const route = useRoute();
const show: Ref<boolean> = ref(false);
const toggleHandler: () => boolean = () => show.value = !show.value;
const editBoard: Ref<boolean> = ref(false);
const editBoardHandler: () => boolean = () => editBoard.value = !editBoard.value

const theme: Ref<string> = ref('dark')
const toggleTheme: () => void = () => {
  const activeTheme = getTheme();
  if (activeTheme === 'light') {
    setTheme('dark')
  } else {
    setTheme('light')
  }

}

const getMediaPreference = () => {
  const darkThemePreference: boolean = window.matchMedia('prefers-color-scheme: dark').matches;
  console.log(darkThemePreference)
  if (darkThemePreference) {
    return 'dark'
  } else {
    return 'light'
  }

}
const setTheme: (theme_: string) => void = (theme_) => {
  theme.value = theme_
  localStorage.setItem('theme', theme_);
  document.documentElement.className = theme_;
}
const getTheme = () => {
  return localStorage.getItem('theme')
}
const columns: ComputedRef<Columns> = computed(() => {
  const filtered = data.value[0].boards.filter(({ name }) => name === route.params.children)
  let column: Columns = []
  for (const a of filtered) {
    column = a.columns
  }
  return column
})
let route_: string[] = []
for (let j of data.value[0].boards) {
  route_.push(j.name)
}
// provide(selectInjectionKeys, select)
console.log(route_)
onMounted(() => {
  const initial_theme = getTheme() || getMediaPreference();
  if (initial_theme) {
    setTheme(initial_theme)
  }
  if (route_.length !== 0) {
    router.replace(`/${route_[0]}`)
  }
  const initialRoute = route.params.children;
  // filterData(initialRoute)

})
const hasRoute: ComputedRef<number> = computed(() => data.value[0].boards.findIndex(({ name }) => name === route.params.children))

</script>

<template>
  <div class="container">
    <div v-show="!toggle" class="left_">
      <SideBar :theme="theme" @toggle-theme="toggleTheme" @toggle-btn="btnToggle" />
    </div>
    <div class="right">
      <Header :toggle="toggle" :theme="theme" :show="show" :columns="columns" @toggle-theme="toggleTheme"
        :edit="editBoard" @edit-board="editBoardHandler" @toggle-handler="toggleHandler" />
      <main>
        <div v-if="hasRoute === -1" class="div">
          <Button value="Add New Board" @click-handler="createBoard" />
        </div>
        <button class="button" v-if="toggle" v-on:click="btnToggle">
          <IconShow />
        </button>
        <RouterView>

        </RouterView>
      </main>
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  position: relative;
  left: 0;
  width: 100%;
  background-color: var(--primary-bg);
}

.left_ {
  position: fixed;
  left: 0;
  z-index: 2;
}

.right {
  width: 100%;
  position: relative;

}

main {
  width: 100%;
  background-color: var(--primary-bg);

}

.button {
  all: unset;
  cursor: pointer;
  background-color: var(--main-purple);
  border-radius: 0 100px 100px 0;
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 20px;
  z-index: 1;

}

.div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.button:hover {
  background-color: var(--hover);
}

@media screen and (max-width: 520px) {
  .left_ {
    display: none;
  }

  .button {
    display: none;
  }
}
</style>
