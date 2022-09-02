<template>
<teleport to="body">
    <div>
        <transition name="modal-animation">
            <div v-if="dropDownMobileActive" class="modal-overlay" @click="closeDropDown">
            </div>
        </transition>
        <transition name="modal-animation-inner">
            <div v-if="dropDownMobileActive" class="sidebar" :class="[{ hidden: sidebarHidden }, currentTheme]">
              <div class="boards">
                <SideBarMenu />
              </div>
              <div class="options">
                <SwitchTheme />
              </div>
            </div>
        </transition>
    </div>
  </teleport>
</template>

<script>
import SideBarMenu from '@/components/SideBar/SideBarMenu.vue';
import SwitchTheme from '@/components/SideBar/SwitchTheme.vue';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'

export default {
    name: 'DropDownMobile',
    props: {
        dropDownMobileActive: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        SideBarMenu, SwitchTheme
    },
    setup(props, { emit }) {
      const store = useStore();

      const closeDropDown = () => {
        emit('closeDropDown')
      }

      return {
        currentTheme: computed(() => store.state.currentTheme),
        sidebarHidden: computed(() => store.state.toggleSidebar),
        closeDropDown
      }
    }
}
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity .4s ease;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all .2s ease 0.2s;
}

.modal-animation-inner-leave-active {
    transition: all .2s ease;
}

.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-animation-inner-leave-to {
    transform: scale(1);
    opacity: 0;
}

.modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100;
}
.sidebar {
    display: none;
    width: 264px;
    position: absolute;
    top: 80px;
    height: auto;
    padding: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    flex-direction: column;
    justify-content: space-between;
    transition: all .4s ease;
    box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
    border-radius: 8px;
    z-index: 101;

    @media(max-width: 700px) {
        display: flex;
    }

    &.light {
        background: #fff;
    }
    &.dark {
        background: $dark-grey;

        :deep(.show-sidebar-cover-animation) {
          background: $dark-grey;
        }
        .options {
          :deep(.switch-theme) {
            background: $very-dark;
          }
        }
    }

    .boards {
      margin-top: 15px;    
    }

    .options {
      padding: 0 18px;
      margin: 17px 0 9px;
    }
}
</style>