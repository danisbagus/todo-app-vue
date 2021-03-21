<template>
  <div
    class="w-full min-h-screen bg-gray-200 text-black flex justify-center items-center"
  >
    <div class="w-1/5 p-8 flex flex-col gap-4 bg-white rounded-md shadow-md">
      <p class="text-center font-semibold">Login Page</p>
      <hr class="border-blue-600" />
      <input
        type="text"
        placeholder="username"
        class="px-2 py-1 focus:outline-none bg-gray-300 text-gray-900 rounded-md"
      />
      <input
        type="password"
        placeholder="password"
        class="px-2 py-1 focus:outline-none bg-gray-300 text-gray-900 rounded-md"
      />
      <button
        @click="handleLogin"
        class="px-4 py-1 focus:outline-none hover:bg-blue-700 rounded-md bg-blue-600"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "Login",
  methods: {
    async handleLogin() {
      await Cookies.set("token", "example-token");
      window.location.reload();
    },
  },
};
</script>
