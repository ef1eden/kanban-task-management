<template>
  <div class="list-item">
    <div class="label">
        <span class="color todo"></span>
        <span class="name">{{ column.name }} (4)</span>
    </div>
    <div class="card-wrapper">
        <draggable 
            v-model="cards" 
            group="tasks" 
            item-key="id"
            drag-class="drag"
            ghost-class="ghost"
            class="drop-zone"
        >
            <template #item="{element}">
                <BoardCard class="card-item" :task="element" />
            </template>
        </draggable>
        
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BoardCard from '@/components/BoardCard.vue';
import { computed } from '@vue/runtime-core';

export default {
    name: 'BoardItem',
    props: {
        column: {
            type: Object,
            required: true,
        }
    },
    components: { BoardCard, draggable },
    setup(props) {
        let todos = {
            boards: [
                {
                    id : 1,
                    name : 'test'
                },
                {
                    id : 2,
                    name : 'test2'
                },
                {
                    id : 3,
                    name : 'test3'
                },
                {
                    id : 4,
                    name : 'test4'
                },
            ]
        }


        const cards = computed({
            get() {
                return props.column.tasks;
            },
            set(newValue) {
                console.log(newValue);
            }
        })

        return { todos, cards }
    }
}
</script>

<style lang="scss" scoped>
.ghost {
    border: 1px $main-color dashed;

    :deep(.text) {
        color: $main-color;
    }
}
.drop-zone {
    min-height: 115px;
}

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