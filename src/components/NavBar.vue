<template>
  <nav>
    <div class="flex flex-row justify-between">
      <div>
        <a class="mr-4" href="/">
          <strong class="text-xl">Todo List App</strong>
        </a>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div>
        <button
          class="p-2 bg-red-500 rounded-md text-gray-100"
          @click="handleLogout"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
import Cookies from "js-cookie";

export default {
  name: "nav-bar",
  methods: {
    async handleLogout() {
      await Cookies.remove("token");
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
