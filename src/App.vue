<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue';
import IconShow from './components/icons/IconShow.vue'
import SideBar from '@/components/SideBar.vue';
import { ref, onMounted, computed, provide, reactive, watch } from 'vue';
import { selectInjectionKeys } from './InjectionKey';
import type { Ref } from 'vue';
//@ts-ignore
import { useStore } from './store_/index';
import type { Data, Boards, Columns } from './types/Data';
const store = useStore();
const router = useRouter()
const data: Data[] = store.getters.data;
const toggle = computed(() => store.getters.toggle);
const btnToggle: () => void = () => {
  store.dispatch('btnToggle');
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
let select: string[] = reactive([]);
let k: Boards = [];
let columns: Columns = [];
for (const a of data) {
  k = [...a.boards]
}
let route_: string[] = []
for (let j of k) {
  route_.push(j.name)
}
// const findRoute = route_.findIndex((r) => r === route.params.children)
// if (findRoute === -1) {
//   console.log(findRoute)
//   router.back()
// }
console.log(route_)
const filterData: (route: string | string[]) => void = (route) => {
  let filter = (k.filter(({ name }) => name === route)).filter(({ columns }) => columns);
  for (const a of filter) {
    columns = a.columns
  }
  columns.forEach(({ name }) => {
    select.push(name)
  }
  )
}
// watch(() => k, () => {
//   let filterIndex = k.findIndex(({ name }) => name === route.params.children);
//   if (filterIndex < 0) {
//     console.log(filterIndex)
//     router.back()
//   }

// })
watch(() => route.params.children, (newRoute, oldRoute) => {
  filterData(newRoute)

})
provide(selectInjectionKeys, select)
onMounted(() => {
  const initial_theme = getTheme() || getMediaPreference();
  if (initial_theme) {
    setTheme(initial_theme)
  }
  const initialRoute = route.params.children;
  filterData(initialRoute)
  // const findRoute = route_.findIndex((r) => r === route.params.children)
  // if (route_ || route.params.children === '' || findRoute !== -1) {
  //   router.replace(route_[0])
  // }
})
</script>

<template>
  <div class="container">
    <div v-show="!toggle" class="left_">
      <SideBar :theme="theme" @toggle-theme="toggleTheme" @toggle-btn="btnToggle" />
    </div>
    <div class="right">
      <Header :toggle="toggle" :theme="theme" :show="show" @toggle-theme="toggleTheme" :edit="editBoard"
        @edit-board="editBoardHandler" @toggle-handler="toggleHandler" />
      <main>
        <button v-if="toggle" v-on:click="btnToggle">
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

button {
  all: unset;
  cursor: pointer;
  background-color: var(--main-purple);
  border-radius: 0 100px 100px 0;
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 20px;
  z-index: 1;

}

button:hover {
  background-color: var(--hover);
}

@media screen and (max-width: 520px) {
  .left_ {
    display: none;
  }

  button {
    display: none;
  }
}
</style>
