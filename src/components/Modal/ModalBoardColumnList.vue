<template>
    <div class="column-item-wrap">
        <div class="column-item">
            <div class="name-field">
                <input v-model="modelValue.name" @input="$emit('modelValue', modelValue)" type="text">
                <div @click="toggleColorPicker" class="color-picker-btn-wrap">
                    <div :style="{ background: pickerColor }" class="color-picker-btn"></div>
                </div>
            </div>
            <div @click="$emit('removeColumn', column.id)" class="remove-item">
                <inline-svg :src="require('@/assets/svg/icon-cross.svg')"/>
            </div>
        </div>
        <Transition name="slide-down">
            <div class="color-picker-wrap" v-show="setColor">
                <div class="color-picker">
                    <ColorPicker 
                        :color="column.color" 
                        alpha-channel="hide"
                        default-format="hex" 
                        :visible-formats="['hex']"
                        @color-change="sendEvent"
                    >
                        <template #copy-button>
                            &nbsp;
                        </template>
                    </ColorPicker>
                </div>
            </div> 
        </Transition>
    </div> 
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import { ColorPicker } from 'vue-accessible-color-picker'
import { ref } from '@vue/reactivity';

export default {
    name: 'ModalBoardColumnList',
    props: {
        name: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            required: false,
        },
        column: {
            type: Object,
            required: false
        }
    },
    components: {
        InlineSvg, ColorPicker
    },
    setup(props, { emit }) {
      const setColor = ref(false);
      const pickerColor = ref(null);
      const modelValue = ref({ id: props.column.id, name: props.column.name });
      const modelColorValue = ref({ id: props.column.id, color: '' });

      function toggleColorPicker () {
        setColor.value = !setColor.value;
      }

      function sendEvent (eventData) {
        pickerColor.value = eventData.cssColor;
        modelColorValue.value.color = eventData.cssColor; 
        emit('updateColor', modelColorValue);
      }
      
      return {
        toggleColorPicker, pickerColor, sendEvent, setColor, 
        modelValue
      }
    }
}
</script>

<style lang="scss" scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all .4s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  height: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  height: 320px;
}

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

            .color-picker-btn-wrap {
                position: absolute;
                right: 0;
                top: 0;
                height: 40px;
                width: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                
                .color-picker-btn {
                    width: 18px;
                    height: 18px;
                    background: #49c4e5;
                    border-radius: 50px;
                    margin-top: 1px;
                }
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

    .color-picker-wrap {
        overflow: hidden;

        .color-picker {
            display: flex;
            justify-content: center;
            border: 1px solid rgba(130, 143, 163, 0.25);
            padding: 4px;
            margin-right: 31px;
            border-radius: 4px;
            margin-top: 10px;
            width: 228px;
            margin-left: auto;
            position: relative;
            

            &::after {
                content: "";
                position: absolute;
                top: -8px;
                right: 19px;
                width: 0;
                height: 0;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                border-bottom: 7px solid rgba(130, 143, 163, 0.25);
            }

            :deep(.vacp-color-picker) {
                width: 228px;
                font-family: $font-family-main;
                color: $medium-grey;
                font-size: 12px;
                font-weight: 700;
                line-height: 15px;

                #color-picker-1-color-hex {
                    font-weight: 400;
                    color: $black-color;
                    border: 1px solid rgba(130, 143, 163, 0.25);
                    border-radius: 4px;
                }
            }
        }
    }
}


</style>