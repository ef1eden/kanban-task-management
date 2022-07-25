<template>
    <div @click="toggleSidebar" class="hide-sidebar">
        <span class="icon">
            <inline-svg :src="require('@/assets/svg/icon-hide-sidebar.svg')"/>
        </span>
        <span class="name">
            Hide Sidebar
        </span>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import InlineSvg from 'vue-inline-svg';

export default {
    name: 'BtnHideSidebar',
    components: {
        InlineSvg
    },
    setup() {
      const store = useStore();

      function toggleSidebar() {
        store.commit('TOGGLE_SIDEBAR');
      }

      return {
        toggleSidebar,
      }
    }
}
</script>

<style lang="scss" scoped>
.hide-sidebar {
    width: 276px;
    height: 48px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    display: flex;
    align-items: center;
    margin-left: -24px;
    padding-left: 24px;
    z-index: 2;
    position: relative;
    cursor: pointer;
    transition: all .4s ease;

    .icon {
        position: relative;
        top: 2px;
        margin-right: 12px;

        :deep(svg) {
            path {
                transition: all .4s ease;
            }
        }
    }

    .name {
        font-weight: 700;
        font-size: 15px;
        line-height: 19px;
        color: $medium-grey;
        transition: all .4s ease;
    }

    &:hover {
        background: rgba(99,95,199,0.1);
        .icon {
            :deep(svg) {
                path {
                    fill: $main-color;
                }
            }
        }

        .name {
            color: $main-color;
        }
    }
}
</style>