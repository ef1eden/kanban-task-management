<template>
  <teleport to="body">
    <transition name="modal-animation">
        <div v-show="modalActive" class="modal" @click="closeModal">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-inner" @click.stop>
                    <slot />
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
    </transition>
  </teleport>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        modalActive: {
            type: Boolean,
            required: true,
        }
    },
    emits: ['closeModal'],
    setup(props, { emit }) {
 
      const closeModal = () => {
        emit('closeModal')
      }   

      return {
        closeModal
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

.modal {
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

    .modal-inner {
        position: relative;
        max-width: 480px;
        width: 100%;
        padding: 32px;
        background: #fff;
        border-radius: 6px;
        max-height: 85vh;
        overflow-y: auto;

        .modal-content {
            header {
                margin-bottom: 23px;   
                .modal-name {
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 23px;
                    color: $black-color;
                }
            }
        }
    }
}
</style>