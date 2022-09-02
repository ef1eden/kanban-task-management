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
import TopBar from '@/components/TopBar/TopBar.vue';
import SideBar from '@/components/SideBar/SideBar.vue';
import BoardItem from '@/components/Board/BoardItem.vue';
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
      Boards: computed(() => store.state.boards.data),
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

  @media(max-width: 991px) {
      margin-left: 261px;
  }

  @media(max-width: 700px) {
      margin-left: 0;
      min-height: calc(100vh - 65px);
      max-height: calc(100vh - 65px);
  }

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

.fade-enter-active,
.fade-leave-active {
  transition: all .4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input[type=text], select, textarea {
    font-family: $font-family-main;
    width: 100%;
    height: 40px;
    border: 1px solid rgba(130,143,163,0.25);
    border-radius: 4px;
    padding: 5px 14px 7px;
    font-size: 13px;
    transition: all .4s ease;
    color: $black-color;
    background: none;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: rgba(0,1,18,0.25);
    }

    &.light {
      color: $black-color;

      &::placeholder {
        color: rgba(0,1,18,0.25);
      }
    }
    &.dark {
        color: #fff;

        &::placeholder {
          color: rgba(255,255,255,0.25);
        }
    }
}
select {
  background-image: url("data:image/svg+xml,%3Csvg width='11' height='8' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.798828 1.54863L5.49731 6.24711L10.1958 1.54863' stroke='%23635FC7' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position-x: 96%;
  background-position-y: 15px;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}
textarea {
  height: 112px;
  line-height: 23px;
}
.btn {
    width: 100%;
    height: 40px;
    background: $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-family-main;
    font-size: 13px;
    font-weight: 700;
    line-height: 23px;
    color: #FFF;
    border-radius: 20px;
    border: 0;
    transition: all .4s ease;
    cursor: pointer;

    &:hover {
        background: $main-color-hover;
    }

    &--light-purple {
      background: rgba(99,95,199,0.1);
      color: $main-color;

      &.light {
        background: rgba(99,95,199,0.1);
        color: $main-color;

        &:hover {
          background: rgba(99,95,199,0.25);
        }
      }
      &.dark {
          background: #FFF;
          color: $main-color;
      }
    }

    &--red {
      background: $red-color;
      
      &:hover {
        background: $red-color-hover;
      }
    }
}
</style>
