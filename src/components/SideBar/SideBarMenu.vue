<template>
  <div>
    <div class="count-boards">
        ALL BOARDS ({{ Boards.length }})
    </div>
    <div class="board-nav" :class="currentTheme">
        <SideBarMenuItem 
            v-for="board in Boards" 
            :key="board.id"
            :menu-item="board"
        />
       
        <!-- add new board -->
        <SideBarAddNewBoard />
    </div>
  </div>
</template>

<script>
import SideBarMenuItem from '@/components/SideBar/SideBarMenuItem.vue';
import SideBarAddNewBoard from '@/components/SideBar/SideBarAddNewBoard.vue';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'SideBarMenu',
    components: {
        SideBarMenuItem, SideBarAddNewBoard
    },
    setup() {
      const store = useStore();

      return {
        Boards: computed(() => store.state.boards.data),
        currentTheme: computed(() => store.state.currentTheme),
      }
    }
}
</script>

<style lang="scss" scoped>
    .count-boards {
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 2.4px;
        color: $medium-grey;
        padding: 0 25px 0 32px;
    }

    .board-nav {
        margin-top: 19px;

        &.light {
            :deep(.board-item) {
                &:hover {
                    background: rgba(99,95,199,0.1);
                }

                &.active {
                    background: $main-color;
                }
            }
        }

        &.dark {
            :deep(.board-item) {
                &:hover {
                    background: #fff;
                }

                &.active {
                    background: $main-color;
                }
            }
        }
    }
</style>