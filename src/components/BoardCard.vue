<template>
    <div class="card-item">
        <div class="text">
            {{ task.title }}
        </div>
        <div class="status">
            {{ completedSubtasks }} of {{ task.subtasks.length }} substasks
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
export default {
    name: 'BoardCard',
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const countCompletedSubtasks = ref(props.task.subtasks);
        const completedSubtasks = ref(0);

        function setCompletedSubtasks() {
            completedSubtasks.value = 0;
            for( const key in Object.keys(countCompletedSubtasks.value)) {
                if(countCompletedSubtasks.value[key].isCompleted) {
                    completedSubtasks.value += 1;
                }
            }
        }
        setCompletedSubtasks();

        watch(
        () => countCompletedSubtasks,
        () => {
            setCompletedSubtasks();
        },
        { deep: true }
        )    

        return { completedSubtasks }
    }
}
</script>

<style lang="scss" scoped>
.card-item {
    position: relative;
    width: 100%;
    min-height: 88px;
    max-width: 280px;
    min-width: 280px;
    background: #FFFFFF;
    box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 23px 16px 22px;
    border: 1px solid transparent;
    cursor: pointer;

    &:last-child {
        margin-bottom: 8px;
    }

    .text {
        font-size: 15px;
        font-weight: 700;
        line-height: 19px;
        letter-spacing: 0px;
        color: $black-color;
        margin-bottom: 7px;
        transition: all .4s ease;
    }

    .status {
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        color: $medium-grey;
    }
}
</style>