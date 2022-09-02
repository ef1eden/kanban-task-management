<template>
  <teleport to="body">
    <div>
        <transition name="modal-animation">
            <div v-if="modalDeleteActive" class="modal-overlay" @click="closeModalDelete">
            </div>
        </transition>
        <transition name="modal-animation-inner">
            <div v-if="modalDeleteActive" class="modal" :class="currentTheme">
                <div class="modal-content">
                    <header>
                        <div class="modal-name">
                            <slot name="header">
                                Board
                            </slot>
                        </div>
                    </header>
                    <main>
                        <slot name="main">
                        </slot>
                    </main>
                </div>
            </div>
        </transition>
    </div>
  </teleport>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    name: 'Modal',
    props: {
        modalDeleteActive: {
            type: Boolean,
            required: true,
        }
    },
    emits: ['closeModalDelete'],
    setup(props, { emit }) {
      const store = useStore();
      const closeModalDelete = () => {
        emit('closeModalDelete')
      }   

      return {
        closeModalDelete,
        currentTheme: computed(() => store.state.currentTheme)
      }
    }
}
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity .4s ease;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all .2s ease 0.2s;
}

.modal-animation-inner-leave-active {
    transition: all .2s ease;
}

.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-animation-inner-leave-to {
    transform: scale(1);
    opacity: 0;
}

.modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 480px;
    width: 100%;
    padding: 32px 32px 40px;
    background: #fff;
    border-radius: 6px;
    max-height: 85vh;
    overflow-y: auto;
    z-index: 101;
    transition: all .4s ease;

    &::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 0;
        background: rgba(176,176,176,0.1);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0;
        background: rgba(176,176,176,0.4);

        &:hover {
        background: rgba(176,176,176,0.7);
        }
    }

    .modal-content {
        header {
            margin-bottom: 23px;   
            .modal-name {
                font-size: 18px;
                font-weight: 700;
                line-height: 23px;
                color: $red-color;
            }
        }
        main {
            &:deep(p) {
                color: $medium-grey;
                font-size: 13px;
                font-weight: 500;
                line-height: 23px;
            }
            &:deep(.buttons) {
                display: flex;
                margin-top: 25px;

                .btn {
                    &:first-child {
                        margin-right: 8px;
                    }
                    &:last-child {
                        margin-left: 8px;
                    }
                }
            }
        }
    }

    &.light {
        background: #fff;

        header {
            .modal-name {
                color: $red-color;
            }
        }
    }
    &.dark {
        background: $dark-grey;

        header {
            .modal-name {
                color: $red-color;
            }
        }
    }
}
</style>