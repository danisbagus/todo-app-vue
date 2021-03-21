<template>
  <div>
    <nav-bar v-if="currentRouteName !== 'Auth'" />
    <router-view />
    <footer-bar v-if="currentRouteName !== 'Auth'" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
export default {
  name: "app",
  components: {
    "nav-bar": NavBar,
    "footer-bar": FooterBar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
