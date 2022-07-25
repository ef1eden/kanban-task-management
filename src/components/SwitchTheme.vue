<template>
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
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    name: 'SwitchTheme',
    setup() {
      const store = useStore();

      function switchMode() {
        store.commit('TOGGLE_MODE');
      }
      
      return {
        currentTheme: computed(() => store.state.currentTheme),
        switchMode
      }
    }
}
</script>

<style lang="scss" scoped>
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
</style>