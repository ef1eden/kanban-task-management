<template>
  <div class="sidebar" :class="[{ hidden: sidebarHidden }, currentTheme]">
    <div class="boards">
      <div class="count-boards">
        ALL BOARDS (3)
      </div>
      <div class="board-nav">
        <!-- menu1 -->
        <div class="board-item active">
          <div class="board-inner">
            <span class="icon">
              <inline-svg :src="require('@/assets/svg/icon-board.svg')"/>
            </span>
            <span class="name">
              Platform Launch
            </span>
          </div>
        </div>
        <!-- menu2 -->
        <div class="board-item">
          <div class="board-inner">
            <span class="icon">
              <inline-svg :src="require('@/assets/svg/icon-board.svg')"/>
            </span>
            <span class="name">
              Marketing Plan
            </span>
          </div>
        </div>
        <!-- menu3 -->
        <div class="board-item">
          <div class="board-inner">
            <span class="icon">
              <inline-svg :src="require('@/assets/svg/icon-board.svg')"/>
            </span>
            <span class="name">
              Roadmap
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
    <div class="options">
      <div class="switch-theme">
        <div class="switch-wrapper">
          <span class="icon">
            <img width="19" height="19" src="@/assets/svg/icon-light-theme.svg" alt="Light theme">
          </span>
          <span class="checkbox-wrap">
            <input 
              :checked="(currentTheme === 'dark') ? 'checked' : false"
              @change="switchMode"
              type="checkbox" 
              hidden="hidden" 
              id="username"
            >
            <label class="switch" for="username"></label>
          </span>
          <span class="icon">
            <img width="16" height="16" src="@/assets/svg/icon-dark-theme.svg" alt="Dark theme">
          </span>
        </div>
      </div>
      <div @click="toggleSidebar" class="hide-sidebar">
        <span class="icon">
          <inline-svg :src="require('@/assets/svg/icon-hide-sidebar.svg')"/>
        </span>
        <span class="name">
          Hide Sidebar
        </span>
      </div>
    </div>
    <div @click="toggleSidebar" class="show-sidebar" :class="{ hidden: !sidebarHidden }">
      <img width="16" height="11" src="@/assets/svg/icon-show-sidebar.svg" alt="Show sidebar">
    </div>
    <div class="show-sidebar-cover-animation"></div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'
import InlineSvg from 'vue-inline-svg';

export default {
    name: 'SideBar',
    components: {
        InlineSvg
    },
    setup() {
      const store = useStore();

      function switchMode() {
        store.commit('TOGGLE_MODE');
      }
      
      function toggleSidebar() {
        console.log('click');
        store.commit('TOGGLE_SIDEBAR');
      }

      return {
        currentTheme: computed(() => store.state.currentTheme),
        sidebarHidden: computed(() => store.state.toggleSidebar),
        switchMode,
        toggleSidebar,
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
    padding-bottom: 47px;
    transition: all .4s ease;
    z-index: 10;

    &.light {
        background: #fff;
        border-right: 1px solid $light-lines;
    }
    &.dark {
        background: $dark-grey;
        border-right: 1px solid $dark-lines;

        .show-sidebar-cover-animation {
          background: $dark-grey;
        }
        .options {
          .switch-theme {
            background: $very-dark;
          }
        }
    }

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

    &.hidden {
      left: -300px;
    }

    .boards {
      margin-top: 114px;

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

          .board-inner {
            padding: 11px 15px 10px 32px;

            .icon {
              margin-right: 13px;
            }

            .name {
              font-weight: 700;
              font-size: 15px;
              line-height: 19px;
              color: $medium-grey;
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
    }

    .options {
      padding: 0 24px;

      .switch-theme {
        display: flex;
        justify-content: space-between;
        background: $light-grey;
        border-radius: 6px;
        margin-bottom: 22px;
        transition: all .4s ease;

        .switch-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          max-width: 122px;
          min-width: 122px;
          margin: 0 auto;
          padding-bottom: 3px;

          .icon {
              position: relative;
              top: 2px;
          }

          .checkbox-wrap {
            .switch {
                display: inline-block;
                position: relative;
                width: 40px;
                height: 20px;
                border-radius: 20px;
                background: $main-color;
                transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                vertical-align: middle;
                cursor: pointer;

                &::before {
                  content: '';
                  position: absolute;
                  top: 3px;
                  left: 3px;
                  width: 14px;
                  height: 14px;
                  background: #fafafa;
                  border-radius: 80%;
                  transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
              }
              &:active {
                &::before {
                  box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 13px rgba(95,99,199,0.2);
                }
              }
            }
            input:checked {
              & + .switch::before {
                left: 23px;
                background: #fff;
              }
              & + .switch:active::before {
                box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 13px rgba(95,99,199,0.2);
              }
            }
          }
        }
      }

      .hide-sidebar {
        padding: 0 7px;
        cursor: pointer;

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
}
</style>