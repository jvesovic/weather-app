<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this user, click the "+" icon to start
        tracking this user.
      </p>
    </div>

    <!-- User Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ userData.name }}</h1>
      <h2>{{ userData.address.street }}, {{ userData.address.city }}</h2>
      <p>{{ userData.website }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const getUserData = async () => {
  try {
    const userRequest = await fetch(
      `https://jsonplaceholder.typicode.com/users/${route.params.id}`
    );
    const userData = await userRequest.json();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

const userData = await getUserData();
console.log(userData);
</script>
