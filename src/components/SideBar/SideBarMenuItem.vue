<template>
    <div class="board-item"
        @click="switchBoard(menuItem.id, $event.target)"
        :class="{ active: activeBoard === menuItem.id }" 
        
    >
        <div class="board-inner">
            <span class="icon">
                <inline-svg :src="require('@/assets/svg/icon-board.svg')"/>
            </span>
            <span class="name">
                {{ menuItem.name }}
            </span>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import InlineSvg from 'vue-inline-svg';

export default {
    name: 'SideBarMenuItem',
    components: {
        InlineSvg
    },
    props: {
        menuItem: {
            type: Object,
            required: true,
        }
    },
    setup() {
      const store = useStore();
      const switchBoard = (id, name) => {
        let board = {
            id: id,
            boardName: name.innerText
        }
        store.commit('SWITCH_BOARD', board);
      }  
      
      return {
        activeBoard: computed(() => store.state.activeBoard),
        switchBoard
      }
    }
}
</script>

<style lang="scss" scoped>
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
</style>