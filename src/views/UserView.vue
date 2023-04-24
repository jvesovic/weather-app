<template>
  <div>
    <Suspense>
      <AsyncUserView />
      <template #fallback>
        <p class="text-white text-center">Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncUserView from "../components/AsyncUserView.vue";
</script>
