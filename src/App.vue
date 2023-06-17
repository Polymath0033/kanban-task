<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import IconShow from './components/icons/IconShow.vue'
import SideBar from '@/components/SideBar.vue';
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
//@ts-ignore
import { useStore } from './store_/index';
const store = useStore();
const toggle = computed(() => store.getters.toggle);
const btnToggle: () => void = () => {
  store.dispatch('btnToggle');
}

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
onMounted(() => {
  const initial_theme = getTheme() || getMediaPreference();
  if (initial_theme) {
    setTheme(initial_theme)
  }
})
</script>

<template>
  <div class="container">
    <div v-show="!toggle" class="left">
      <SideBar :theme="theme" @toggle-theme="toggleTheme" @toggle-btn="btnToggle" />
    </div>
    <div class="right">
      <Header :toggle="toggle" :theme="theme" />
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

.left {
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
</style>
