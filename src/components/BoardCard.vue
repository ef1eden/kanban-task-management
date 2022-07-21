<template>
    <div class="card-item">
        <div class="text">
            {{ task.title }}
        </div>
        <div class="status">
            0 of {{ task.subtasks.length }} substasks
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardCard',
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style lang="scss" scoped>
.card-item {
    width: 100%;
    min-height: 88px;
    max-width: 280px;
    min-width: 280px;
    background: #FFFFFF;
    box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 24px 17px 23px;

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
    }

    .status {
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        color: $medium-grey;
    }
}
</style>