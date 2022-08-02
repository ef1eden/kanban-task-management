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
    }
  },
  actions: {
    ADD_NEW_BOARD({ commit }, payload) {
      commit('CREATE_NEW_BOARD', payload);
      setTimeout(() => commit('CLEAR_NEW_BOARD'), 1000);
    },
  },
  modules: {
  }
})
