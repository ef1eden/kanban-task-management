<template>
  <div class="app" :class="currentTheme">
    <SideBar />
    <TopBar />
    <div class="app-wrapper" :class="{ hidden : sidebarHidden }">
      
        <BoardItem v-for="board in Boards" :key="board.id" :board="board" />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';
import BoardItem from '@/components/BoardItem.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  name: "app",
  components: { TopBar, SideBar, BoardItem },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit('SET_ACTIVE_BOARD_ON_LOAD');
    })
    
    return {
      currentTheme: computed(() => store.state.currentTheme),
      sidebarHidden: computed(() => store.state.toggleSidebar),
      
      Boards: computed(() => store.state.boards),
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

@font-face {
    font-family: "PlusJakartaSans";
    font-weight: 700;
    font-style: normal;
    font-display: auto;
    src: url("./assets/fonts/PlusJakartaSans-Bold.woff2") format("woff2"), url("./assets/fonts/PlusJakartaSans-Bold.woff") format("woff");
}
@font-face {
    font-family: "PlusJakartaSans";
    font-weight: 500;
    font-style: normal;
    font-display: auto;
    src: url("./assets/fonts/PlusJakartaSans-Medium.woff2") format("woff2"), url("./assets/fonts/PlusJakartaSans-Medium.woff") format("woff");
}

html, body {
	position: relative;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-family-main;
  margin: 0;
  padding: 0;
}

.app {
  position: relative;
	overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-family-main;
  margin: 0;
  padding: 0;
  background: $light-grey;
  transition: all .4s ease;

  &.light {
    background: $light-grey;
  }
  &.dark {
    background: $very-dark;

    .app-wrapper {
      color: #fff;
    }
  }
}

.app-wrapper {
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  margin-left: 300px;
  color: $black-color;
  transition: all .4s ease;
  min-height: calc(100vh - 97px);
  max-height: calc(100vh - 97px);

  &::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(176,176,176,0.1);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: rgba(176,176,176,0.4);

    &:hover {
      background: rgba(176,176,176,0.7);
    }
  }

  &.hidden {
    margin-left: 0;
  }
}


</style>
