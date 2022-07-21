<template>
  <div class="list-item">
    <div class="label">
        <span class="color todo"></span>
        <span class="name">{{ column.name }} (4)</span>
    </div>
    <div class="card-wrapper">
        <BoardCard v-for="(task, index) in column.tasks" :key="index" :task="task" />
    </div>
  </div>
</template>

<script>
import BoardCard from '@/components/BoardCard.vue';

export default {
    name: 'BoardItem',
    props: {
        column: {
            type: Object,
            required: true,
        }
    },
    components: { BoardCard },
    setup(props) {
        console.log(props.column);
    }
}
</script>

<style lang="scss" scoped>
.list-item {
    width: 304px;
    min-width: 304px;
    padding-right: 10px;

    .label {
        display: flex;
        margin-bottom: 24px;

        .color {
            width: 15px;
            height: 15px;
            margin-right: 13px;
            border-radius: 50px;

            &.todo {
                background: #49C4E5;
            }
            &.doing {
                background: $main-color;
            }
            &.done {
                background: #67E2AE;
            }
        }

        .name {
            font-size: 12px;
            font-weight: 700;
            line-height: 15px;
            letter-spacing: 2.4px;
            color: $medium-grey;
            text-transform: uppercase;
        }
    }

    .card-wrapper {
        max-height: calc(100vh - 196px);
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 7px;
            height: 7px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 0;
            background: rgba(176,176,176,0.1);
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 0;
            background: rgba(176,176,176,0.4);

                &:hover {
                    background: rgba(176,176,176,0.7);
                }
        }
    }
}
</style>