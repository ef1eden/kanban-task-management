<template>
  <div>
    <Modal :modalActive="modalActive" @close-modal="toggleModal">
        <template v-slot:header>
            Add New Board
        </template>
        <template v-slot:main>
            <ModalBoard @close-modal="toggleModal" />
        </template>
    </Modal>
    <div @click="toggleModal" class="board-item add-item">
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
</template>

<script>
import Modal from '@/components/Modal/Modal.vue';
import ModalBoard from '@/components/Modal/ModalBoard.vue';
import InlineSvg from 'vue-inline-svg';
import { ref } from '@vue/reactivity';

export default {
    name: 'SideBarAddNewBoard',
    components: {
        Modal, InlineSvg, ModalBoard
    },
    setup() {
      const modalActive = ref(false);
      
      const toggleModal = () => {
        modalActive.value = !modalActive.value;
      }

  
      return {
        modalActive, toggleModal
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