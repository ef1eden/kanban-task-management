<template>
  <div class="topbar" :class="[{ hidden : sidebarHidden }, currentTheme]">
    <div class="logo-placeholder">
        <router-link class="logo" to="/">
             <inline-svg :src="require('@/assets/svg/logo-dark.svg')"/>
        </router-link>
    </div>
    <div class="board-info">
        <div class="name">
            Platform Launch
        </div>
        <div class="wrapper">
            <div class="addtask">
                <span class="button">
                    + Add New Task
                </span>
            </div>
            <div class="editboard">
                <img width="5" height="20" src="@/assets/svg/icon-vertical-ellipsis.svg" alt="Edit board">
            </div>
            <div class="login">
                <img width="42" height="42" src="@/assets/img/login-avatar.jpg" alt="Profile">
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
    name: 'TopBar',
    components: {
        InlineSvg
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
.topbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 97px;
    border-bottom: 1px solid $light-lines;
    background: #fff;
    padding-left: 90px;
    transition: all .4s ease;

    &.hidden {
        padding-left: 0px;
    }

    &.light {
        background: #fff;
        border-bottom: 1px solid $light-lines;
    }
    &.dark {
        background: $dark-grey;
        border-bottom: 1px solid $dark-lines;

        .logo-placeholder {
            border-right: 1px solid $dark-lines;

            .logo {
                :deep(svg) {
                    path {
                        fill :#fff;
                    }
                }
            }
        }

        .board-info {
            .name {
                color: #fff;
            }
            .wrapper {
                .login {
                    border-left: 1px solid $dark-lines;
                }
            }
        }
    }

    .logo-placeholder {
        width: 210px;
        min-width: 210px;
        height: 100%;
        border-right: 1px solid $light-lines;

        .logo {
            position: fixed;
            top: 34px;
            left: 34px;
            z-index: 11;

            :deep(svg) {
                path {
                    transition: all .4s ease;
                }
            }
        }
    }

    .board-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 5px 25px;

        .name {
            font-weight: 700;
            font-size: 24px;
            line-height: 30px;
            color: $black-color;
            position: relative;
            top: -1px;
            transition: all .4s ease;
        }

        .wrapper {
            display: flex;
            align-items: center;

            .addtask {
                .button {
                    font-weight: 700;
                    font-size: 15px;
                    line-height: 19px;
                    background: $main-color;
                    border-radius: 24px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    padding: 5px 25px;
                    color: #fff;
                    cursor: pointer;
                }
            }

            .editboard {
                margin-left: 24px;
            }

            .login {
                height: 48px;
                margin-left: 30px;
                border-left: 1px solid $light-lines;
                transition: all .4s ease;

                img {
                    border-radius: 50%;
                    margin: 1px 0 0px 25px;
                }
            }
        }
    }
}
</style>