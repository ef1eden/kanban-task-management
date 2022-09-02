<template>
  <div>
    <form @submit.prevent="addTask">
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
                v-for="subtask in newTask.subtasks" 
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
            <span class="validate" :class="{errortextselect: formErrorStatus}">
                <select v-model="checkStatus" :class="[currentTheme, {error: formErrorStatus}]">
                    <option :value="option.name" v-for="option in mapStatus" :key="option.id">{{ option.name }}</option>
                </select>
            </span>
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
    setup(props, { emit }) {
      const store = useStore();
      const formError = ref(false);
      const formErrorStatus = ref(false);
      const currentTaskName = ref(null);
      const currentTaskDesc = ref(null);
      const checkStatus = ref(null);
      const findStatus = store.state.boards.data.find(i => i.id === store.state.activeBoard);
      const mapStatus = findStatus.columns.map(status => {
        return {
            id: status.id, 
            name: status.name
        }
      });

      const newTask = ref({
        id: uuid.v4(),
        title: null,
        description: null,
        status: null,
        subtasks: [
            {
                id: uuid.v4(),
                title: null,
                isCompleted: null
            },
            {
                id: uuid.v4(),
                title: null,
                isCompleted: null
            },
        ]
      });
  
      const modelValue = (e) => {
        console.log(e);
        let findID = newTask.value.subtasks.find(el => el.id === e.id);
        findID.title = e.title;
      }

      const removeSubtask = val => {
        const removeSubtask = newTask.value.subtasks.filter(t => t.id !== val);
        newTask.value.subtasks = removeSubtask;
      }
      const addNewSubtask = () => {
        newTask.value.subtasks.push({
            id: uuid.v4(),
            title: null,
            isCompleted: null
        }); 
      }
      const addTask = () => {
        if(currentTaskName.value === null || currentTaskName.value.trim() === '' || checkStatus.value === null) {
            formError.value = true;
            if (checkStatus.value === null) {
                formErrorStatus.value = true;
                return;
            }
            formErrorStatus.value = false;
            return;
        }
        const findColumnID = mapStatus.find(el => el.name == checkStatus.value).id;
        formError.value = false;
        newTask.value.title = currentTaskName.value;
        newTask.value.description = currentTaskDesc.value;
        newTask.value.status = checkStatus.value;

        store.commit('ADD_TASK', {columnID: findColumnID, newTask: newTask.value});
        emit('closeModal');
      }
  
      return {
        addTask, formError, formErrorStatus, modelValue, 
        removeSubtask, addNewSubtask,
        currentTheme: computed(() => store.state.currentTheme),
        currentTaskName, currentTaskDesc,
        mapStatus, checkStatus, newTask
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
        transition: opacity .4s ease;
        opacity: 0;
        visibility: hidden;
    }

    &.errortext {
        &::after {
            opacity: 1;
            visibility: visible;
        }
    }
    &.errortextselect {
        &::after {
            right: 39px;
            opacity: 1;
            visibility: visible;
        }
    }
}

</style>