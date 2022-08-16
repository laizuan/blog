<template>
  <a :href="href" target="_blank">{{ text }}</a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
const props = defineProps({
  url: String,
  text: String,
})

const href = computed(() => {
  return withBase(props.url)
})
</script>
