<script setup lang="ts">
withDefaults(defineProps<{ isValid: boolean }>(), { isValid: false })
</script>
<template>
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12.728" width="3" height="18" transform="rotate(45 12.728 0)"
            :fill="isValid === true ? '#ea5555' : '#828fa3'" />
        <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)"
            :fill="isValid === true ? '#ea5555' : '#828fa3'" />
    </svg>
</template>