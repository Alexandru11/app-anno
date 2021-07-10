import Vue from 'vue';
import Vuex from 'vuex';
import enums from '@/utils/enums';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTask: {
      id: undefined,
      text: '',
    },
    annotationId: undefined,
    annotationState: enums.annotationState.NEW,
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
    setAnnotationState(state, newState) {
      state.annotationState = newState;
    },
    setAnnotationId(state, id) {
      state.annotationId = id;
    },
    resetDefaultTask(state) {
      state.currentTask.id = undefined;
      state.currentTask.text = '';
    },
    resetDefaultAnnotationState(state) {
      state.annotationState = enums.annotationState.NEW;
      state.annotationId = undefined;
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
