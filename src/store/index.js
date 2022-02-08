import { createStore } from "vuex";
import Cookies from "js-cookie";
import ApiService from "../config/api.service";

export default createStore({
  state: {
    tasks: [],
    taskPayload: {},
    userPayload: {},
  },

  mutations: {
    SET_TASKS(state, data) {
      state.tasks = data;
    },
    SET_TASK_PAYLOAD(state, data) {
      state.taskPayload = data;
    },
    SET_USER_PAYLOAD(state, data) {
      state.userPayload = data;
    },
  },
  actions: {
    login({ commit }) {
      const payload = this.state.userPayload;
      const payloadData = {
        email: payload.email,
        password: payload.password,
      };
      console.log(commit);
      // ApiService.setToken();

      ApiService.post("http://localhost:8000/login", payloadData).then(
        (response) => {
          console.log(response);
          Cookies.set("token", response.data.api_token);
          window.location.reload();
        }
      );
    },
    getTasks({ commit }) {
      // ApiService.setToken();
      ApiService.get("http://localhost:8000/tasks").then((response) => {
        commit("SET_TASKS", response.data.data);
      });
    },
    deleteTask({ commit }, id) {
      console.log(commit);
      // ApiService.setToken();
      ApiService.delete("http://localhost:8000/tasks", id).then((response) => {
        console.log(response);
      });
    },
    createTask({ commit }) {
      const payload = this.state.taskPayload;
      const payloadData = {
        name: payload.name,
        status_id: payload.status_id,
        user_id: 1,
      };
      console.log(commit);
      // ApiService.setToken();

      ApiService.post("http://localhost:8000/tasks", payloadData).then(
        (response) => {
          console.log(response);
        }
      );
    },
    updateTask({ commit }, id) {
      const payload = this.state.taskPayload;
      const payloadData = {
        name: payload.name,
        status_id: payload.status_id,
        user_id: 1,
      };
      console.log(commit);
      // ApiService.setToken();
      ApiService.patch("http://localhost:8000/tasks", id, payloadData).then(
        (response) => {
          console.log(response);
        }
      );
    },
    setTaskPayload({ commit }, data) {
      commit("SET_TASK_PAYLOAD", data);
    },
    setUserPayload({ commit }, data) {
      commit("SET_USER_PAYLOAD", data);
    },
  },
  modules: {},
});
