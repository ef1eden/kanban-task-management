<template>
    <div class="column-item-wrap">
        <div class="column-item">
            <div class="name-field">
                <input 
                    v-model="modelValue.title" :class="currentTheme"
                    @input="$emit('modelValue', modelValue)" type="text"
                >
            </div>
            <div @click="$emit('removeColumn', subtask.id)" class="remove-item">
                <inline-svg :src="require('@/assets/svg/icon-cross.svg')"/>
            </div>
        </div>
    </div> 
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'ModalTaskSubtasksList',
    props: {
        subtask: {
            type: Object,
            required: false
        }
    },
    components: {
        InlineSvg
    },
    setup(props) {
      const store = useStore();
      const modelValue = ref({ id: props.subtask.id, title: props.subtask.title });
      
      return {
        currentTheme: computed(() => store.state.currentTheme),
        modelValue
      }
    }
}
</script>

<style lang="scss" scoped>
.column-item-wrap {
    margin-bottom: 12px;

    .column-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name-field {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            input[type=text] {
                padding: 5px 44px 7px 14px;
            }  
        }
        .remove-item {
            width: 34px;
            text-align: right;
            margin-top: 1px;
            cursor: pointer;

            :deep(svg) {
                g {
                    transition: all .4s ease;
                }
            }

            &:hover {
                :deep(svg) {
                    g {
                        fill: $main-color;
                    }
                }
            }
        }
    }
}


</style>