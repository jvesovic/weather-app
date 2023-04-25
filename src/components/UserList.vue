<template>
  <div v-for="user in savedUsers" :key="user.id">
    <UserCard :user="user" @click="goToUserView(user)" />
  </div>

  <p v-if="savedUsers.length === 0">No users added</p>
</template>

<script setup>
import { ref } from "vue";
import UserCard from "./UserCard.vue";
import { useRouter } from "vue-router";

const savedUsers = ref([]);
const getUsers = async () => {
  if (localStorage.getItem("savedUsers")) {
    savedUsers.value = JSON.parse(localStorage.getItem("savedUsers"));
  }

  const requests = [];
  savedUsers.value.forEach((user) => {
    requests.push(
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
    );
  });

  const res = await Promise.all(requests);
  const userData = await Promise.all(res.map((r) => r.json()));
  userData.forEach((value, index) => {
    savedUsers.value[index].user = value;
  });
};

await getUsers();

const router = useRouter();
const goToUserView = (user) => {
  router.push({
    name: "userView",
    params: { id: user.id },
    query: {
      username: user.username,
    },
  });
};
</script>
