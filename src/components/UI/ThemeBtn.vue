<script setup lang="ts">
defineEmits<{ (e: 'toggle-theme'): void }>()
</script>
<template>
    <div class="button">
        <img src="../../assets/icon-light-theme.svg" alt="light" />
        <label for="checkbox" class="label">
            <input type="checkbox" name="checkbox" id="checkbox" v-on:change="$emit('toggle-theme')">
            <span class="inner"></span>
        </label>
        <img src="../../assets/icon-dark-theme.svg" alt="moon" />
    </div>
</template>
<style scoped>
.button {
    display: flex;
    gap: 1rem;
    background-color: var(--primary-bg);
    width: calc(100% - 2rem);
    margin: 0 auto;
    justify-content: center;
    border-radius: 8px;
    padding: 0.5rem 1rem;
}

img {
    height: 100%;
}

.label {
    position: relative;
    height: 20px;
    width: 41.9px;

    display: inline-block;
}

.label input {
    opacity: 0;
    width: 0;
    height: 0;
}

.inner {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
    background-color: var(--main-purple);
    transition: 0.4s;
    border-radius: 34px;
}

.inner:hover {
    background-color: var(--hover);
}

.inner::before {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: .4s;
}

input:focus+.inner {
    box-shadow: 0 0 1px red;
}

input:checked+.inner {
    box-shadow: 0 0 1px red;
}

input:checked+.inner::before {
    transform: translateX(20px);
}
</style>