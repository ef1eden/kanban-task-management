<template>
  <div>
    <div class="dropdown-wrap">
        <span class="icon" @click="toggleDropDown">
            <img width="5" height="20" src="@/assets/svg/icon-vertical-ellipsis.svg" alt="Edit board">
        </span>
        <DropDown :dropDownActive="dropDownActive">
            <li @click="toggleModal">
                Edit Task
            </li>
            <li @click="toggleModalDelete">
                Delete Task
            </li>
        </DropDown>
        <Modal :modalActive="modalActive" @close-modal="toggleModal">
            <template v-slot:header>
                {{ task.title }}
            </template>
            <template v-slot:main>
                <ModalTaskEdit @close-modal="toggleModal" :task="task" />
            </template>
        </Modal>
    </div>
    <div class="description">
        <p>{{ task.description }}</p>
    </div>
    <div class="list-subtasks">
        <p>Substasks( of {{ task.subtasks.length }})</p>
        <div v-for="subtask in task.subtasks" :key="subtask.id" :subtask="subtask" class="list-item" :class="currentTheme">
            <input type="checkbox" :id="subtask.id" v-model="subtask.isCompleted" @change="checkboxValueChange($event, subtask.id)" />
            <label :for="subtask.id" :class="{completed: subtask.isCompleted}">{{ subtask.title }}</label>
        </div>
    </div>
    <div class="input-field">                     
        <label class="label" :class="currentTheme">
            Current Status
        </label>
        <select v-model="checkStatus" @change="statusValueChange()" :class="currentTheme">
            <option :value="option.name" v-for="option in mapStatus" :key="option.id">{{ option.name }}</option>
        </select>
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown/DropDown.vue';
import Modal from '@/components/Modal/Modal.vue';
import ModalTaskEdit from '@/components/Modal/ModalTaskEdit.vue';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'ModalTaskView',
    components: {
        DropDown, Modal, ModalTaskEdit
    },
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    setup(props, { emit }) {
      const store = useStore();
      const modalActive = ref(false);
      const dropDownActive = ref(false);
      const oldStatus = computed(() => props.task.status);
      const checkStatus = ref(props.task.status);
      const findStatus = store.state.boards.data.find(i => i.id === store.state.activeBoard);
      const mapStatus = findStatus.columns.map(status => {
        return {
            id: status.id, 
            name: status.name
        }
      });
      const copyOfTask = JSON.parse(JSON.stringify(props.task));
      const currentTask = ref(copyOfTask);

      const checkboxValueChange = () => {
        currentTask.value.subtasks = props.task.subtasks;
        store.commit('SUBTASK_STATUS_CHANGE', currentTask.value);
      }

      const statusValueChange = () => {
        const findOldColumnID = mapStatus.find(el => el.name == oldStatus.value).id;
        const findColumnID = mapStatus.find(el => el.name == checkStatus.value).id;
        currentTask.value.status = checkStatus.value;
        currentTask.value.subtasks = props.task.subtasks;
        store.dispatch('EDIT_TASK', {columnID: findColumnID, oldColumnID: findOldColumnID, editedTask: currentTask.value});
      }

      const toggleDropDown = () => {
        dropDownActive.value = !dropDownActive.value;
      };

      const toggleModal = () => {
        modalActive.value = !modalActive.value;

        if(modalActive.value) {
            dropDownActive.value = false;
        }
      }

      const toggleModalDelete = () => {
        emit('closeTask');
      }
      
      return {
        currentTheme: computed(() => store.state.currentTheme),
        mapStatus, checkStatus, dropDownActive, toggleDropDown, 
        modalActive, toggleModal, toggleModalDelete, checkboxValueChange, 
        statusValueChange
      }
    }
}
</script>

<style lang="scss" scoped>
.dropdown-wrap {
    position: absolute;
    right: 21px;
    top: 56px;

    .icon {
        cursor: pointer;
        width: 25px;
        display: block;
        text-align: center;
    }

    &:deep(.dropdown) {
        top: 37px;
        right: -3px;
    }
}
.description {
    color: $medium-grey;
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
}
.list-subtasks {
    p {
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: $medium-grey;
        margin: 23px 0 18px;
    }
    .list-item {     
        border-radius: 4px;
        display: flex;
        align-items: center;
        min-height: 40px;
        width: 100%;
        margin-bottom: 8px;
        padding: 0 9px;

        input[type=checkbox] {
            accent-color: $main-color;
            width: 16px;
            min-width: 16px;
            height: 16px;
            margin-right: 16px;
        }

        label {
            font-weight: 700;
            font-size: 12px;
            line-height: 15px;
            width: 100%;
            padding: 8px 0 9px;

            &.completed {
                text-decoration: line-through;
                color: $medium-grey !important;
            }
        }

        &.light {
            background: $light-grey;

            label {
                color: $black-color;
            }
        }
        &.dark {
            background: $very-dark;

            label {
                color: #fff;
            }
        }
    }
}
.input-field {
    display: flex;
    flex-direction: column;
    margin: 21px 0 23px;
    select {
        &.light {
            color: $black-color;
            option {
                color: $medium-grey
            }
        }
        &.dark {
            color: #fff;
            option {
                color: $medium-grey
            }
        }
    }
}
.label {
    color: $medium-grey;
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    margin-bottom: 9px;

    &.light {
      color: $medium-grey;
    }
    &.dark {
        color: #fff;
    }
}
.btn {
    &--margin {
        margin: 11px 0 23px;
    }
}

</style>