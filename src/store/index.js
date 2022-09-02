import { createStore } from 'vuex'
import data from '@/data/data.json';
import { uuid } from 'vue3-uuid';

export default createStore({
  state: {
    boards: data,
    activeBoard: null,
    activeBoardName: null,
    currentTheme: 'light',
    toggleSidebar: null,
    newBoard: {
      id: uuid.v4(),
      name: null,
      columns: [
          {
              id: uuid.v4(),
              name: "Todo",
              color: "#49c4e5",
              tasks: []
          },
          {
              id: uuid.v4(),
              name: "Doing",
              color: "#635FC7",
              tasks: []
          },
          {
              id: uuid.v4(),
              name: "Done",
              color: "#67E2AE",
              tasks: []
          },
      ],  
    }
  },
  getters: {
  },
  mutations: {
    SET_ACTIVE_BOARD_ON_LOAD(state) {
      const setFirstBoardActive = state.boards.data.find(i => i.id);
      state.activeBoard = setFirstBoardActive.id;
      state.activeBoardName = setFirstBoardActive.name;
    },
    TOGGLE_MODE(state) {
      if(state.currentTheme === 'light') {
        state.currentTheme = 'dark';
      } else {
        state.currentTheme = 'light';
      }
    },
    TOGGLE_SIDEBAR(state) {
      state.toggleSidebar = !state.toggleSidebar;
    },
    SWITCH_BOARD(state, payload) {
      state.activeBoard = payload.id;
      state.activeBoardName = payload.boardName
    },
    CREATE_NEW_BOARD(state, payload) {
      state.newBoard.name = payload;
      state.boards.data.push(state.newBoard); 

      const newBoardID = state.boards.data.find(i => i.name === payload);
      state.activeBoard = newBoardID.id;
      state.activeBoardName = payload;
    },
    CLEAR_NEW_BOARD(state) {
      state.newBoard = null;
      state.newBoard = { 
        id: uuid.v4(),
        name: null,
        columns: [
            {
                id: uuid.v4(),
                name: "Todo",
                color: "#49c4e5",
                tasks: []
            },
            {
                id: uuid.v4(),
                name: "Doing",
                color: "#635FC7",
                tasks: []
            },
            {
                id: uuid.v4(),
                name: "Done",
                color: "#67E2AE",
                tasks: []
            },
        ],
      }
    },
    ADD_COLUMN_IN_NEW_BOARD(state) {
      state.newBoard.columns.push({
        id: uuid.v4(),
        name: null,
        color: '#635FC7',
        tasks: []
      }); 
    },
    REMOVE_COLUMN_IN_NEW_BOARD(state, payload) {
      const removeColumn = state.newBoard.columns.filter(t => t.id !== payload);
      state.newBoard.columns = removeColumn;
    },
    DELETE_BOARD(state) {
      const findBoard = state.boards.data.filter(i => i.id !== state.activeBoard);
      state.boards.data = findBoard;
      const setActiveBoard = state.boards.data.find(element => element.id);

      if(setActiveBoard) {
        state.activeBoard = setActiveBoard.id;
        state.activeBoardName = setActiveBoard.name;
      } else {
        state.activeBoard = null;
        state.activeBoardName = null;
      }      
    },
    EDIT_SELECTED_BOARD(state, payload) {
      state.activeBoardName = payload.name;
      state.boards.data.find(i => i.id === payload.id).columns = payload.columns;
    },
    ADD_COLUMN(state, payload) {
      state.boards.data.find(i => i.id === state.activeBoard).columns.push(payload);
    },
    UPDATE_TASKS(state, payload) {
      state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === payload.id).tasks = payload.tasks;
    },
    ADD_TASK(state, {columnID, newTask}) {
      state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === columnID).tasks.push(newTask);
    },
    EDIT_TASK(state, {columnID, oldColumnID, editedTask}) {
      if(oldColumnID === columnID) {
        let findTaskIndex = state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === columnID).tasks.map((i) => i.id).indexOf(editedTask.id);
        state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === columnID).tasks[findTaskIndex] = editedTask;
        return;
      }
      let findTaskIndex = state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === oldColumnID).tasks.map((i) => i.id).indexOf(editedTask.id);
      state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === oldColumnID).tasks.splice(findTaskIndex, 1);
      state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === columnID).tasks.push(editedTask);
    },
    DELETE_TASK(state, {columnID, taskID}) {
      let findTaskIndex = state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === columnID).tasks.map((i) => i.id).indexOf(taskID);
      state.boards.data.find(i => i.id === state.activeBoard).columns.find(i => i.id === columnID).tasks.splice(findTaskIndex, 1);
    },
    SUBTASK_STATUS_CHANGE(state, payload) {
      const currentTask = payload;
      console.log(currentTask);
    },
  },
  actions: {
    ADD_NEW_BOARD({ commit }, payload) {
      commit('CREATE_NEW_BOARD', payload);
      setTimeout(() => commit('CLEAR_NEW_BOARD'), 1000);
    },
    EDIT_BOARD({ commit }, payload) {
      commit('EDIT_SELECTED_BOARD', payload);
    },
    DELETE_BOARD({ commit }) {
      commit('DELETE_BOARD');
    },
    ADD_COLUMN({ commit }, payload) {
      commit('ADD_COLUMN', payload);
    },
    UPDATE_TASKS({ commit }, payload) {
      commit('UPDATE_TASKS', payload);
    },
    ADD_TASK({ commit }, payload) {
      commit('ADD_TASK', payload);
    },
    EDIT_TASK({ commit }, payload) {
      commit('EDIT_TASK', payload);
    },
    DELETE_TASK({ commit }, payload) {
      commit('DELETE_TASK', payload);
    },
  },
  modules: {
  }
})
