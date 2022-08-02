<template>
<Transition name="fade" mode="out-in">
    <div v-show="activeBoard === board.id" class="board-wrapper">
        <!-- list 1 -->
        <BoardColumn v-for="column in board.columns" :key="column.id" :column="column" />
        <!-- add column -->
        <div class="new-column" :class="currentTheme">
          <div class="inner-wrapper">
              <span class="text">+ New Column</span>
          </div>
        </div>
    </div>
</Transition>
</template>

<script>
import BoardColumn from '@/components/Board/BoardColumn.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
    name: 'BoardItem',
    props: {
        board: {
            type: Object,
            required: true,
        }
    },
    components: { BoardColumn },
    setup() {
      const store = useStore();

      return {
        activeBoard: computed(() => store.state.activeBoard),
        currentTheme: computed(() => store.state.currentTheme)
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

  
}

</style>