<template>
  <div>
    <form @submit.prevent="addNewBoard">
        <div class="input-field">                     
            <label class="label" :class="currentTheme">
                Name
            </label>
            <span class="validate" :class="{errortext: formError}">
                <input type="text" 
                    v-model="currentBoard" placeholder="e.g. Web Design"
                    :class="[{error: formError}, currentTheme]"
                >
            </span>
        </div>
        <div class="list-columns">
            <div class="title">
                <div class="label" :class="currentTheme">Columns</div>
            </div>
            <ModalBoardColumnList 
                v-for="column in currentBoardData.columns" 
                :key="column.id" :column="column" 
                @model-value="modelValue" 
                @update-color="modelColorValue"
                @remove-column="removeColumn"
            />
        </div>
        <button @click.prevent="addNewColumn" class="btn btn--light-purple btn--margin" :class="currentTheme">
            + Add New Column
        </button>
        <input type="submit" value="Save Changes" class="btn">
    </form>
  </div>
</template>

<script>
import ModalBoardColumnList from '@/components/Modal/ModalBoardColumnList.vue';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { uuid } from 'vue3-uuid';

export default {
    name: 'ModalBoardEdit',
    components: {
        ModalBoardColumnList
    },
    setup(props, { emit }) {
      const store = useStore();
      const formError = ref(false);
      const currentBoard = ref(store.state.activeBoardName);
      const currentBoardID = ref(store.state.activeBoard);
      const copyOfBoard = JSON.parse(JSON.stringify(store.state.boards));
      const filterCopyOfBoard = copyOfBoard.data.filter(i => {
          return i.id == currentBoardID.value;
      });
      const currentBoardData = ref(filterCopyOfBoard[0]);
    
      const modelValue = (e) => {
        let findID = currentBoardData.value.columns.find(el => el.id === e.id);
        findID.name = e.name;
      }
      const modelColorValue = val => {
        let findID = currentBoardData.value.columns.find(el => el.id === val.value.id);
        findID.color = val.value.color;
      }
      const removeColumn = val => {
        const removeColumn = currentBoardData.value.columns.filter(t => t.id !== val);
        currentBoardData.value.columns = removeColumn;
      }
      const addNewColumn = () => {
        currentBoardData.value.columns.push({
            id: uuid.v4(),
            name: null,
            color: '#635FC7',
            tasks: []
        }); 
      }
      const addNewBoard = () => {
        if(currentBoard.value === null || currentBoard.value.trim() === '') {
            formError.value = true;
            return;
        }
        formError.value = false;
        currentBoardData.value.name = currentBoard.value;
        store.dispatch('EDIT_BOARD', currentBoardData.value);
        emit('closeModal');
      }
  
      return {
        addNewBoard, formError, modelValue, 
        modelColorValue, removeColumn, addNewColumn,
        currentTheme: computed(() => store.state.currentTheme),
        currentBoard, currentBoardData
      }
    }
}
</script>

<style lang="scss" scoped>
.input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 23px;
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