<script setup lang="ts">
import Card from './UI/Card.vue';
</script>
<template>
    <menu>
        <h6 class="title"> <span></span>Hello (7)</h6>
        <Card v-for="j in 20" />
    </menu>
</template>
<style scoped>
menu {
    display: grid;
    gap: 1rem;
}

.title {
    display: flex;
    letter-spacing: 2.4px;
    color: var(--gray);
    align-items: center;
}

.title span {
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 50%;
    margin-right: 0.5rem;
}
</style>