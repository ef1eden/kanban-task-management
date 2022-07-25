<template>
    <div @click="toggleSidebar" class="show-sidebar" :class="{ hidden: !sidebarHidden }">
    <img width="16" height="11" src="@/assets/svg/icon-show-sidebar.svg" alt="Show sidebar">
    </div>
    <div class="show-sidebar-cover-animation"></div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
    name: 'BtnOpenSidebar',
    setup() {
      const store = useStore();

      function toggleSidebar() {
        store.commit('TOGGLE_SIDEBAR');
      }

      return {
        sidebarHidden: computed(() => store.state.toggleSidebar),
        toggleSidebar,
      }
    }
}
</script>

<style lang="scss" scoped>
.show-sidebar {
    position: absolute;
    width: 56px;
    height: 48px;
    bottom: 32px;
    right: -56px;
    background: $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 100px 100px 0px;
    cursor: pointer;
    transition: all .4s ease;
    transition-delay: .7s;
    transition-property: right, opacity;
    opacity: 1;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 60px;
        height: 60px;
    }

    &.hidden {
        right: 0;
        opacity: 0;
    }

    img {
        position: relative;
        left: -2px;
        width: 16px;
        height: 10px;
    }
}

.show-sidebar-cover-animation {
    position: absolute;
    width: 56px;
    height: 58px;
    bottom: 27px;
    right: 0;
    background: #fff;
    z-index: 1;
    transition: all .4s ease;
}
</style>