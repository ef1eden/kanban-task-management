<template>
    <div class="card-item" :class="currentTheme" @click="toggleModal">
        <div class="text">
            {{ task.title }}
        </div>
        <div class="status">
            {{ completedSubtasks }} of {{ task.subtasks.length }} substasks
        </div>
        <Modal :modalActive="modalActive" @close-modal="toggleModal">
            <template v-slot:header>
                {{ task.title }}
            </template>
            <template v-slot:main>
                <ModalTaskView @close-modal="toggleModal" :task="task" @close-task="toggleModalAndModalDelete" />
            </template>
        </Modal>
        <ModalDelete :modalDeleteActive="modalDeleteActive" @close-modal-delete="toggleModalDelete">
            <template v-slot:header>
                Delete this task?
            </template>
            <template v-slot:main>
                <p>Are you sure you want to delete the ‘{{ task.title }}’ task?</p>
                <div class="buttons">
                    <input @click="deleteTask" type="submit" value="Delete" class="btn btn--red">
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
import ModalTaskView from '@/components/Modal/ModalTaskView.vue';
import ModalDelete from '@/components/Modal/ModalDelete.vue';
import { ref } from '@vue/reactivity';
import { computed, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'BoardCard',
    components: {
        Modal, ModalTaskView, ModalDelete
    },
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const store = useStore();
        const countCompletedSubtasks = computed(() => props.task.subtasks);
        const completedSubtasks = ref(0);
        const modalActive = ref(false);
        const modalDeleteActive = ref(false);
        
        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        }

        const toggleModalAndModalDelete = () => {
            modalActive.value = !modalActive.value;
            modalDeleteActive.value = !modalDeleteActive.value;
        }
        
        const toggleModalDelete = () => {
            modalDeleteActive.value = !modalDeleteActive.value;
        }

        const deleteTask = () => {
            const checkStatus = ref(props.task.status);
            const findStatus = store.state.boards.data.find(i => i.id === store.state.activeBoard);
            const mapStatus = findStatus.columns.map(status => {
                return {
                    id: status.id, 
                    name: status.name
                }
            });
            const findColumnID = mapStatus.find(el => el.name == checkStatus.value).id;

            store.dispatch('DELETE_TASK', {columnID: findColumnID, taskID: props.task.id});
            modalDeleteActive.value = !modalDeleteActive.value;
        }

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
            console.log('change');
            setCompletedSubtasks();
        },
        { deep: true }
        )

        return { 
            currentTheme: computed(() => store.state.currentTheme),
            completedSubtasks, modalActive, toggleModal, modalDeleteActive,
            toggleModalDelete, toggleModalAndModalDelete, deleteTask
        }
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
    transition: background .4s ease;

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

    &.light {
        background: #fff;

        .text {
            color: $black-color;
        }
    }
    &.dark {
        background: $dark-grey;

        .text {
            color: #fff;
        }
    }
}
</style>