<template>
  <div class="sidebar" :class="[{ hidden: sidebarHidden }, currentTheme]">
    <div class="boards">
      <SideBarMenu />
    </div>
    <div class="options">
      <SwitchTheme />
      <BtnHideSidebar />
    </div>
    <BtnOpenSidebar />
  </div>
</template>

<script>
import SideBarMenu from '@/components/SideBar/SideBarMenu.vue';
import SwitchTheme from '@/components/SideBar/SwitchTheme.vue';
import BtnHideSidebar from '@/components/SideBar/BtnHideSidebar.vue'
import BtnOpenSidebar from '@/components/SideBar/BtnOpenSidebar.vue'
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'

export default {
    name: 'SideBar',
    components: {
        SideBarMenu, SwitchTheme, BtnHideSidebar, BtnOpenSidebar
    },
    setup() {
      const store = useStore();

      return {
        currentTheme: computed(() => store.state.currentTheme),
        sidebarHidden: computed(() => store.state.toggleSidebar),
      }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    border-right: 1px solid $light-lines;
    max-height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 34px;
    transition: all .4s ease;
    z-index: 10;

    &.light {
        background: #fff;
        border-right: 1px solid $light-lines;
    }
    &.dark {
        background: $dark-grey;
        border-right: 1px solid $dark-lines;

        :deep(.show-sidebar-cover-animation) {
          background: $dark-grey;
        }
        .options {
          :deep(.switch-theme) {
            background: $very-dark;
          }
        }
    }

    &.hidden {
      left: -300px;
    }

    .boards {
      margin-top: 114px;    
    }

    .options {
      padding: 0 24px;
    }
}
</style>