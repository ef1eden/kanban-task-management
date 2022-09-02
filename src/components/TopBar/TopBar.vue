<template>
  <div class="topbar" :class="[{ hidden : sidebarHidden }, currentTheme]">
    <div class="logo-placeholder">
        <span class="logo">
             <inline-svg :src="require('@/assets/svg/logo-dark.svg')"/>
        </span>
    </div>
    <div class="board-info">
        <div class="name">
            {{ activeBoardName }}
            <div class="arrow" :class="{rotated: dropDownMobileActive}" @click="toggleDropDownMobile">
                <inline-svg :src="require('@/assets/svg/arrow.svg')"/>
            </div>
        </div>
        <DropDownMobile :dropDownMobileActive="dropDownMobileActive" @close-drop-down="toggleDropDownMobile" />
        <div class="wrapper">
            <TopBarAddTask />
            <div class="editboard">
                <span class="icon" @click="toggleDropDown">
                    <img width="5" height="20" src="@/assets/svg/icon-vertical-ellipsis.svg" alt="Edit board">
                </span>
                <DropDown :dropDownActive="dropDownActive">
                    <li @click="toggleModal">
                        Edit Board
                    </li>
                    <li @click="toggleModalDelete">
                        Delete Board
                    </li>
                </DropDown>
            </div>
        </div>
    </div>
    <Modal :modalActive="modalActive" @close-modal="toggleModal">
        <template v-slot:header>
            Edit Board
        </template>
        <template v-slot:main>
            <ModalBoardEdit @close-modal="toggleModal" />
        </template>
    </Modal>
    <ModalDelete :modalDeleteActive="modalDeleteActive" @close-modal-delete="toggleModalDelete">
        <template v-slot:header>
            Delete this board?
        </template>
        <template v-slot:main>
            <p>Are you sure you want to delete the ‘{{ activeBoardName }}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div class="buttons">
                <input @click="deleteBoard" type="submit" value="Delete" class="btn btn--red">
                <button @click.prevent="toggleModalDelete" class="btn btn--light-purple btn--margin" :class="currentTheme">
                    Cancel
                </button>
            </div>
        </template>
    </ModalDelete>
  </div>

  
</template>

<script>
import Modal from '@/components/Modal/Modal.vue';
import ModalBoardEdit from '@/components/Modal/ModalBoardEdit.vue';
import ModalDelete from '@/components/Modal/ModalDelete.vue';
import DropDown from '@/components/DropDown/DropDown.vue';
import TopBarAddTask from '@/components/TopBar/TopBarAddTask.vue';
import DropDownMobile from '@/components/DropDown/DropDownMobile.vue';
import { computed, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
import InlineSvg from 'vue-inline-svg';

export default {
    name: 'TopBar',
    components: {
        Modal, DropDown, ModalBoardEdit, ModalDelete, TopBarAddTask, InlineSvg, DropDownMobile
    },
    setup() {
      const store = useStore();
      const modalActive = ref(false);
      const modalDeleteActive = ref(false);
      const dropDownActive = ref(false);
      const dropDownMobileActive = ref(false);

      const toggleModal = () => {
        modalActive.value = !modalActive.value;

        if(modalActive.value) {
            dropDownActive.value = false;
        }
      }

      const toggleModalDelete = () => {
        modalDeleteActive.value = !modalDeleteActive.value;

        if(modalDeleteActive.value) {
            dropDownActive.value = false;
        }
      }
      
      const toggleDropDown = () => {
        dropDownActive.value = !dropDownActive.value;
      }

      const toggleDropDownMobile = () => {
        dropDownMobileActive.value = !dropDownMobileActive.value;
      }

      const deleteBoard = () => {
        store.dispatch('DELETE_BOARD');
        modalDeleteActive.value = !modalDeleteActive.value;
      }

      return {
        currentTheme: computed(() => store.state.currentTheme),
        sidebarHidden: computed(() => store.state.toggleSidebar),
        activeBoardName: computed(() => store.state.activeBoardName),
        modalActive, toggleModal, deleteBoard, toggleDropDown, dropDownActive,
        modalDeleteActive, toggleModalDelete, toggleDropDownMobile, 
        dropDownMobileActive
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

    @media(max-width: 700px) {
        height: 65px;
    }

    &.hidden {
        padding-left: 0px;

        .logo-placeholder {
            width: 210px;
            min-width: 210px;
        }
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
        transition: all .4s ease;

        @media(max-width: 991px) {
            width: 171px;
            min-width: 171px;
        }

        @media(max-width: 700px) {
            min-width: unset;
            width: unset;
            border: 0 !important;
        }

        .logo {
            position: fixed;
            top: 34px;
            left: 34px;
            z-index: 11;

            @media(max-width: 991px) {
                left: 20px;
            }

            @media(max-width: 700px) {
                left: 16px;
                top: 19px;
                width: 26px;
            } 

            :deep(svg) {
                path {
                    transition: all .4s ease;

                    &:first-child {
                        @media(max-width: 700px) {
                            display: none;
                        } 
                    }
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
        padding: 5px 15px 5px 25px;

        @media(max-width: 700px) {
            padding: 5px 6px 5px 0;
            margin-left: -34px;
        }

        .name {
            font-weight: 700;
            font-size: 24px;
            line-height: 30px;
            color: $black-color;
            position: relative;
            top: -1px;
            transition: color .4s ease;
            margin-right: 15px;

            @media(max-width: 991px) {
                font-size: 20px;
            }
            @media(max-width: 700px) {
                font-size: 18px;
                position: relative;
                top: 1px;
            }

            .arrow {
                position: absolute;
                right: -28px;
                top: 1px;
                width: 30px;
                height: 30px;
                display: none;
                align-items: center;
                justify-content: center;
                transition: all .4s ease;

                &.rotated {
                    transform: rotate(-180deg);
                }

                @media(max-width: 700px) {
                    display: flex;
                }
            }
        }

        .wrapper {
            display: flex;
            align-items: center;

            @media(max-width: 700px) {
                margin-right: -34px;
            }

            .editboard {
                position: relative;
                margin-left: 14px;

                @media(max-width: 700px) {
                    margin-left: 6px;
                }

                .icon {
                    cursor: pointer;
                    width: 25px;
                    display: block;
                    text-align: center;
                }
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
    :deep(.dropdown) {
        @media(max-width: 700px) {
            top: 44px;
        }
    }
}
</style>