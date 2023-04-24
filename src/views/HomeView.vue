<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a pokemon"
        class="py-2 px-1 w-full bg-transparent border-b focus: border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <div v-if="foundPokemon">
        <p>ID : {{ foundPokemon.id }}</p>
        <p>Name : {{ foundPokemon.name }}</p>
      </div>
      <p v-if="searchError && !foundPokemon">Pokemon Not Found</p>
      <hr />
      <div class="mt-4">
        <button class="bg-weather-secondary p-4" @click="getUsers">
          Get Users
        </button>
        <ul
          v-if="userSearchResult"
          class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        >
          <li
            v-for="user in userSearchResult"
            :key="user.id"
            class="py-2 cursor-pointer"
            @click="previewUser(user)"
          >
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const searchQuery = ref("");
const queryTimeout = ref(null);
const foundPokemon = ref(null);
const userSearchResult = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  searchError.value = null;
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchQuery.value.toLowerCase()}`
        );
        foundPokemon.value = await result.json();
      } catch (error) {
        searchError.value = true;
        foundPokemon.value = null;
      }
      return;
    }
    foundPokemon.value = null;
  }, 800);
};

const getUsers = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users/");
  userSearchResult.value = await result.json();
};

const router = useRouter();
const previewUser = (user) => {
  console.log(user);
  router.push({
    name: "userView",
    params: {
      id: user.id,
    },
    query: {
      username: user.username,
      preview: true,
    },
  });
};
</script>
