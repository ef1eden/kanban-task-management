<template>
  <div>
    <form @submit.prevent="editTask">
        <div class="input-field">                     
            <label class="label" :class="currentTheme">
                Title
            </label>
            <span class="validate" :class="{errortext: formError}">
                <input type="text" 
                    v-model="currentTaskName" placeholder="e.g. Web Design"
                    :class="[{error: formError}, currentTheme]"
                >
            </span>
        </div>
        <div class="input-field">                     
            <label class="label" :class="currentTheme">
                Description
            </label>
            <textarea
                v-model="currentTaskDesc" 
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                :class="currentTheme"
            >
            </textarea>
        </div>
        <div class="list-columns">
            <div class="title">
                <div class="label" :class="currentTheme">Subtasks</div>
            </div>
            <ModalTaskSubtasksList 
                v-for="subtask in currentTaskSubtasks" 
                :key="subtask.id" :subtask="subtask" 
                @model-value="modelValue" 
                @remove-column="removeSubtask"
            />
        </div>
        <button @click.prevent="addNewSubtask" class="btn btn--light-purple btn--margin" :class="currentTheme">
            + Add New Subtask
        </button>
        <div class="input-field">                     
            <label class="label" :class="currentTheme">
                Status
            </label>
            <select v-model="checkStatus" :class="currentTheme">
                <option :value="option.name" v-for="option in mapStatus" :key="option.id">{{ option.name }}</option>
            </select>
        </div>
        <input type="submit" value="Save Changes" class="btn">
    </form>
  </div>
</template>

<script>
import ModalTaskSubtasksList from '@/components/Modal/ModalTaskSubtasksList.vue';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { uuid } from 'vue3-uuid';

export default {
    name: 'ModalTaskEdit',
    components: {
        ModalTaskSubtasksList
    },
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    setup(props, { emit }) {
      const store = useStore();
      const formError = ref(false);
      const currentTaskName = ref(props.task.title);
      const currentTaskDesc = ref(props.task.description);
      const copyOfCurrentTaskSubtasks = JSON.parse(JSON.stringify(props.task.subtasks));
      const currentTaskSubtasks = ref(copyOfCurrentTaskSubtasks);
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
  
      const modelValue = (e) => {
        console.log(e);
        let findID = currentTaskSubtasks.value.find(el => el.id === e.id);
        findID.title = e.title;
      }

      const removeSubtask = val => {
        const removeSubtask = currentTaskSubtasks.value.filter(t => t.id !== val);
        currentTaskSubtasks.value = removeSubtask;
      }
      const addNewSubtask = () => {
        currentTaskSubtasks.value.push({
            id: uuid.v4(),
            title: null,
            isCompleted: null
        }); 
      }
      const editTask = () => {
        if(currentTaskName.value === null || currentTaskName.value.trim() === '') {
            formError.value = true;
            return;
        }
        const findOldColumnID = mapStatus.find(el => el.name == oldStatus.value).id;
        const findColumnID = mapStatus.find(el => el.name == checkStatus.value).id;
        formError.value = false;
        currentTask.value.title = currentTaskName.value;
        currentTask.value.description = currentTaskDesc.value;
        currentTask.value.status = checkStatus.value;
        currentTask.value.subtasks = currentTaskSubtasks.value;

        store.dispatch('EDIT_TASK', {columnID: findColumnID, oldColumnID: findOldColumnID, editedTask: currentTask.value});
        emit('closeModal');
      }
  
      return {
        editTask, formError, modelValue, 
        removeSubtask, addNewSubtask,
        currentTheme: computed(() => store.state.currentTheme),
        currentTaskName, currentTaskDesc,
        currentTaskSubtasks, mapStatus, checkStatus
      }
    }
}
</script>

<style lang="scss" scoped>
.input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 23px;

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
.error {
    border: 1px solid $red-color;
    position: relative;   
}
.validate {
    position: relative;
    &::after {
        content: 'Can’t be empty';
        position: absolute;
        right: 17px;
        top: 8px;
        font-size: 13px;
        line-height: 23px;
        font-weight: 500;
        color: $red-color;
        transition: all .4s ease;
        opacity: 0;
        visibility: hidden;
    }

    &.errortext {
        &::after {
            opacity: 1;
            visibility: visible;
        }
    }
}

</style>