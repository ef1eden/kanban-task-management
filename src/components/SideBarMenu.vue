<template>
  <div>
    <div class="count-boards">
        ALL BOARDS ({{ Boards.length }})
    </div>
    <div class="board-nav">
        <div @click="switchBoard" v-for="board in Boards" :key="board.name" class="board-item" :class="{ active: activeBoard === board.name }">
            <div class="board-inner">
                <span class="icon">
                    <inline-svg :src="require('@/assets/svg/icon-board.svg')"/>
                </span>
                <span class="name">
                    {{ board.name }}
                </span>
            </div>
        </div>
        <!-- menu4 -->
        <div class="board-item add-item">
            <div class="board-inner">
                <span class="icon">
                    <inline-svg :src="require('@/assets/svg/icon-board.svg')"/>
                </span>
                <span class="name">
                    + Create New Board
                </span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import InlineSvg from 'vue-inline-svg';

export default {
    name: 'SideBarMenu',
    components: {
        InlineSvg
    },
    setup() {
      const store = useStore();

      function switchBoard(e) {
        store.commit('SWITCH_BOARD', e.target.innerText);
      }

      //store.commit('TOGGLE_BOOKMARK', props.video.id);
    

      return {
        Boards: computed(() => store.state.boards),
        activeBoard: computed(() => store.state.activeBoard),
        switchBoard
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

        .board-item {
            width: 276px;
            height: 48px;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            display: flex;
            align-items: center;
            transition: all .4s ease;
            cursor: pointer;

            .board-inner {
                padding: 11px 15px 10px 32px;

                .icon {
                    margin-right: 16px;
                    :deep(svg) {
                    path {
                        transition: all .4s ease;
                    }
                    }
                }

                .name {
                    position: relative;
                    top: -2px;
                    font-weight: 700;
                    font-size: 15px;
                    line-height: 19px;
                    color: $medium-grey;
                    transition: all .4s ease;
                }
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

            &.active {
                background: $main-color;

                .icon {
                    :deep(svg) {
                        path {
                            fill: #fff;
                        }
                    }
                }

                .name {
                    color: #fff;
                }
            }

            &.add-item {
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
    }
</style>