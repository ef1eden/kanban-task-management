<template>
<Transition name="fade" mode="out-in">
    <div v-show="activeBoard === board.id" class="board-wrapper" :class="{nocolumn: !checkIfColumnExist.length}">
        <!-- list 1 -->
        <BoardColumn v-for="column in board.columns" :key="column.id" :column="column" />
        <!-- add column -->
        <div v-if="checkIfColumnExist.length" class="new-column" @click="toggleModal" :class="currentTheme">
          <div class="inner-wrapper">
              <span class="text">+ New Column</span>
          </div>
        </div>
        <div v-else class="no-column" @click="toggleModal" :class="currentTheme">
            <p>This board is empty. Create a new column to get started.</p>
            <span class="btn">+ New Column</span>
        </div>
        <Modal :modalActive="modalActive" @close-modal="toggleModal">
            <template v-slot:header>
                Add new column
            </template>
            <template v-slot:main>
                <ModalAddColumn @close-modal="toggleModal"/>
            </template>
        </Modal>
    </div>
</Transition>
</template>

<script>
import BoardColumn from '@/components/Board/BoardColumn.vue';
import Modal from '@/components/Modal/Modal.vue';
import ModalAddColumn from '@/components/Modal/ModalAddColumn.vue';
import { useStore } from 'vuex';
import { computed, ref } from '@vue/runtime-core';

export default {
    name: 'BoardItem',
    props: {
        board: {
            type: Object,
            required: true,
        }
    },
    components: { BoardColumn, Modal, ModalAddColumn },
    setup(props) {
      const store = useStore();
      const modalActive = ref(false);
      const checkIfColumnExist = computed(() => props.board.columns);

      const toggleModal = () => {
        modalActive.value = !modalActive.value;
      }

      return {
        activeBoard: computed(() => store.state.activeBoard),
        currentTheme: computed(() => store.state.currentTheme),
        modalActive, toggleModal, checkIfColumnExist
      }
    }
}
</script>

<style lang="scss" scoped>
.board-wrapper {
  padding: 24px 24px 20px 24px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;

  &.nocolumn {
    width: 100%;
    height: 100%;
  }

  .new-column {
    width: 304px;
    min-width: 304px;

    .inner-wrapper {
      width: 280px;
      min-width: 280px;
      height: 100%;
      max-height: calc(100vh - 196px);
      min-height: calc(100vh - 196px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #E9EFFA;
      border-radius: 8px;
      margin-top: 39px;
      cursor: pointer;
      transition: all .4s ease;

      .text {
        color: $medium-grey;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        text-align: center;
        padding-bottom: 14px;
        transition: all .4s ease;
      }
    }

    &.light {
      .inner-wrapper {
        background: #E9EFFA;
      }
    }

    &.dark {
      .inner-wrapper {
        background: rgba(17,17,22,0.25);
      }
    }

    &:hover {
      .inner-wrapper {
        .text {
          color: $main-color;
        }
      }
    }
  }

  .no-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    text-align: center;

    p {
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      color: $medium-grey;
    }

    .btn {
      width: 174px;
    }
  }
}

</style>