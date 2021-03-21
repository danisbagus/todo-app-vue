<template>
  <div class="w-full p-16">
    <div
      class="flex flex-col p-8 bg-gray-100 w-full rounded-sm border-2 shadow-sm"
    >
      <div class="flex flex-row justify-between">
        <p class="text-xl text-black">
          Task List
        </p>
      </div>
      <div
        class="flex flex-row w-full h-24  justify-between rounded-lg border-2 bg-white shadow-lg mt-4"
      >
        <div class="h-full w-1/4 flex flex-col p-2 justify-center">
          <p class="text-blue-700 text-4xl">{{ getTotalTask(items) }}</p>
          <p class="text-md">Total All Tasks</p>
        </div>
        <div class="h-full w-1/4 flex flex-col p-2 justify-center">
          <p class="text-red-700 text-4xl">{{ getTotalSolvedTask(items) }}</p>
          <p class="text-md">Solved Tasks</p>
        </div>
        <div class="h-full w-1/4 flex flex-col p-2 justify-center">
          <p class="text-green-700 text-4xl">{{ getTotalTodayTask(items) }}</p>
          <p class="text-md">Today's Tasks</p>
        </div>
        <div class="h-full w-1/4 flex flex-col p-2 justify-center items-center">
          <button
            @click="handleOpenModal('add')"
            class="w-32 p-2 rounded-lg border-2 border-blue-700 text-blue-700"
          >
            Add new task
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between"></div>
      <div class="mt-8 rounded-lg border-2 bg-white shadow-lg">
        <table v-if="items.length">
          <tr>
            <th>Task Name</th>
            <th>Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ convertData(item.created_at) }}</td>
            <td>{{ getStatusName(item.status_id) }}</td>
            <td>
              <div class="flex flex-row justify-center">
                <button
                  class="p-1 w-16 text-sm text-blue-700 bg-blue-200 border-2 border-blue-200 rounded-xl"
                  @click="handleOpenModal('edit', item)"
                >
                  Edit
                </button>
                <button
                  class="p-1  w-16  text-sm text-red-700 bg-red-200 border-2 border-red-200 rounded-xl ml-2"
                  @click.prevent="$emit('handle-delete-task', item.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div v-if="isOpenModal" class="w-full">
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-60 flex items-center justify-center"
    >
      <div
        class="h-98 border-0 rounded-lg shadow-lg relative flex flex-col w-1/3 bg-white outline-none focus:outline-none"
      >
        <div
          class="flex items-end justify-between px-6 py-3 border-b border-solid rounded-t"
        >
          <h3 class="text-sm font-semibold text-primary uppercase">
            Detail Task
          </h3>
        </div>
        <div
          class="flex flex-col items-center border-b border-solid rounded-t p-8"
        >
          <form>
            <div class="">
              <p>Task Name</p>
              <p>
                <input
                  class="border-b-2 border-blue-600 mt-2"
                  type="text"
                  placeholder="Task name"
                  v-model="selectedItem.name"
                />
              </p>
            </div>
            <div class="mt-8">
              <p>Task Status</p>
              <select
                v-model="selectedItem.status_id"
                class="border-b-2 border-blue-600 mt-2 bg-white w-48"
              >
                <option
                  v-for="item in status"
                  :value="item.value"
                  :key="item.value"
                  placeholder="Task status"
                  class="border-b-2 border-blue-600 mt-2"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="flex justify-end px-6 py-3 border-b border-solid rounded-t">
          <button
            v-if="modalType == 'edit'"
            @click.prevent="$emit('handle-update-task', selectedItem)"
            @click="handleCloseModal"
            class="bg-blue-500 text-white p-2 rounded-md"
          >
            Edit Task
          </button>
          <button
            v-if="modalType == 'add'"
            @click.prevent="$emit('handle-create-task', selectedItem)"
            @click="handleCloseModal"
            class="p-2 rounded-lg border-2 border-blue-700 text-blue-700"
          >
            Add Task
          </button>
          <button @click="handleCloseModal" class="underline ml-4">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "task-list",
  components: {},
  props: ["items"],
  data() {
    return {
      status: [
        { label: "To do", value: 1 },
        { label: "In Progress", value: 2 },
        { label: "Solved", value: 3 },
      ],

      isOpenModal: false,
      modalType: "edit",
      selectedItem: {
        id: null,
        name: "",
        status_id: 1,
      },
    };
  },
  methods: {
    handleOpenModal(type, item = false) {
      this.isOpenModal = true;
      this.modalType = type;
      if (item) {
        this.selectedItem.id = item.id;
        this.selectedItem.name = item.name;
        this.selectedItem.status_id = item.status_id;
      } else {
        this.selectedItem.id = null;
        this.selectedItem.name = "";
        this.selectedItem.status_id = 1;
      }
    },
    handleCloseModal() {
      this.isOpenModal = false;
    },
    handleRefresh() {
      console.log("hahaha");
    },
    handleCreateTask() {
      console.log("action add task");
      this.isOpenModal = false;
      this.handleRefresh();
    },
    convertData(value) {
      if (value) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    getStatusName(id) {
      if (id == 1) {
        return "To do";
      } else if (id == 2) {
        return "In progress";
      } else if (id == 3) {
        return "Solved";
      }
    },
    getTotalTask(items) {
      return items.length;
    },
    getTotalSolvedTask(items) {
      const solvedTasks = items && items.filter((val) => val.status_id == 3);
      return solvedTasks.length;
    },
    getTotalTodayTask(items) {
      const today = moment().format("DD MMM YYYY");
      const todayTask =
        items &&
        items.filter(
          (val) => moment(val.created_at).format("DD MMM YYYY") == today
        );

      return todayTask.length;
    },
  },
};
</script>
<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
