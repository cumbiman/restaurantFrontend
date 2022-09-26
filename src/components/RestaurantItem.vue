/** Component used to display each open restaurant */
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
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-height: 100px;
  min-height: 94px;
}

.restaurant:hover {
  border: 2px solid var(--color-border-hover);
  background-color: var(--color-background-mute);
}
</style>
