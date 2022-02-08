<template>
  <div class="home">
    <section class="home-content">
      <div class="h-full">
        <div class="flex flex-col h-full justify-between px-2 py-8">
          <p class="text-6xl text-white text-shadow ">
            Welcome to todo list App
          </p>
          <p class="text-2xl text-shadow text-gray-300">
            Check your current activities
          </p>
          <div></div>
        </div>
      </div>
    </section>
    <task-list
      :items="tasks"
      @handle-create-task="handleCreateTask"
      @handle-update-task="handleUpdateTask"
      @handle-delete-task="handleDeleteTask"
    />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "Home",
  components: {
    "task-list": TaskList,
  },
  data() {
    return {};
  },
  methods: {
    handleCreateTask(data) {
      this.$store.dispatch("setTaskPayload", data);
      this.$store.dispatch("createTask");
      setTimeout(() => {
        this.$store.dispatch("getTasks");
      }, 200);
    },
    handleUpdateTask(data) {
      this.$store.dispatch("setTaskPayload", data);
      this.$store.dispatch("updateTask", data.id);
      setTimeout(() => {
        this.$store.dispatch("getTasks");
      }, 200);
    },
    handleDeleteTask(id) {
      if (window.confirm("Are you want to delete this task ?")) {
        this.$store.dispatch("deleteTask", id);
        setTimeout(() => {
          this.$store.dispatch("getTasks");
        }, 200);
      }
    },
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  mounted() {
    this.$store.dispatch("getTasks");
  },
};
</script>

<style lang="scss" scoped>
.home-content {
  text-align: center;
  background-image: url("../assets/banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
  margin-bottom: 20px;
}
.text-shadow {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
}
</style>
