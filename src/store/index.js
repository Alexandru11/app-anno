import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTask: {
      id: undefined,
      text: '',
    },
    success: undefined,
    error: undefined,
  },
  mutations: {
    setTaskId(state, taskId) {
      state.currentTask.id = taskId;
    },
    setTaskText(state, text) {
      state.currentTask.text = text;
    },
    resetDefaultTask(state) {
      state.currentTask.id = undefined;
      state.currentTask.text = '';
    },
    setError(state, message) {
      state.error = message;
    },
    setSuccess(state, message) {
      state.success = message;
    },
  },
  actions: {
    resetError({ commit }) {
      setTimeout(() => {
        commit('setError', undefined);
      }, 2000);
    },
    resetSuccess({ commit }) {
      setTimeout(() => {
        commit('setSuccess', undefined);
      }, 2000);
    },
  },
  modules: {
  },
});
