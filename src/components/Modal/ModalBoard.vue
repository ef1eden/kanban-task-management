<template>
  <div>
    <form @submit.prevent="addNewBoard">
        <div class="input-field">                     
            <label class="label">
                Name
            </label>
            <span class="validate" :class="{errortext: formError}">
                <input type="text" 
                    v-model="boardName" placeholder="e.g. Web Design"
                    :class="{error: formError}"
                >
            </span>
        </div>
        <div class="list-columns">
            <div class="title">
                <div class="label">Columns</div>
            </div>
            <ModalBoardColumnList 
                v-for="column in newBoard.columns" 
                :key="column.id" :column="column" 
                @model-value="modelValue" 
                @update-color="modelColorValue"
                @remove-column="removeColumn"
            />  
        </div>
        <button @click.prevent="addNewColumn" class="btn btn--light-purple btn--margin">
            + Add New Column
        </button>
        <input type="submit" value="Create New Board" class="btn">
    </form>
  </div>
</template>

<script>
import ModalBoardColumnList from '@/components/Modal/ModalBoardColumnList.vue';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'SideBarAddNewBoard',
    components: {
        ModalBoardColumnList
    },
    setup(props, { emit }) {
      const store = useStore();
      const boardName = ref(null);
      const formError = ref(false);
      
      const modelValue = (e) => {
        let findID = store.state.newBoard.columns.find(({ id }) => id === e.id );
        findID.name = e.name;
      }
      const modelColorValue = val => {
        let findID = store.state.newBoard.columns.find(({ id }) => id === val.value.id );
        findID.color = val.value.color;
      }
      const removeColumn = val => {
        store.commit('REMOVE_COLUMN_IN_NEW_BOARD', val);
      }
      const addNewColumn = () => {
        store.commit('ADD_COLUMN_IN_NEW_BOARD');
      }
      const addNewBoard = () => {
        if(boardName.value === null || boardName.value.trim() === '') {
            formError.value = true;
            return;
        }
        formError.value = false;
        store.dispatch('ADD_NEW_BOARD', boardName.value);
        emit('closeModal');
        setTimeout(() => boardName.value = null, 1000);
      }
  
      return {
        boardName, addNewBoard, formError, modelValue, 
        modelColorValue, removeColumn, addNewColumn,
        newBoard: computed(() => store.state.newBoard)
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