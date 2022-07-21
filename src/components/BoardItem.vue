<template>
    <div class="board-wrapper">
        <!-- list 1 -->
        <BoardColumn v-for="column in board.columns" :key="column.name" :column="column" />
        <!-- add column -->
        <div class="new-column">
        <div class="inner-wrapper">
            <span class="text">+ New Column</span>
        </div>
        </div>
    </div>
</template>

<script>
import BoardColumn from '@/components/BoardColumn.vue';

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

    }
}
</script>

<style lang="scss" scoped>
.board-wrapper {
  padding: 24px 24px 20px 24px;
  display: flex;

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