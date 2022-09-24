<template>
  <div class="restaurant">
    {{ restaurant }}
  </div>
</template>

<script setup>
defineProps(["restaurant"]);
</script>

<style scoped>
.restaurant {
  border: 1px solid var(--color-border);
  margin: 5px;
}
</style>
