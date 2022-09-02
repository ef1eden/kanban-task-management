<template>
    <div class="addtask">
        <span class="button" @click="toggleModal">
            {{ buttonText }}
        </span>
        <Modal :modalActive="modalActive" @close-modal="toggleModal">
            <template v-slot:header>
                Add New Task
            </template>
            <template v-slot:main>
                <ModalAddTask @close-modal="toggleModal"/>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue';
import ModalAddTask from '@/components/Modal/ModalAddTask.vue';
import { ref } from '@vue/reactivity';
import { onBeforeMount, onBeforeUnmount } from '@vue/runtime-core';
export default {
    name: 'TopBarAddTask',
    components: { Modal, ModalAddTask },
    setup() {
        const modalActive = ref(false);
        const width = ref(null);
        const buttonText = ref('+ Add New Task');

        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        }

        function setButtonText() {
            width.value = window.innerWidth;
            if(width.value > 699) {
                buttonText.value = '+ Add New Task';
            }
            else {
                buttonText.value = '+';
            }
        }

        onBeforeMount(() => {
            setButtonText()
            window.addEventListener("resize", setButtonText);
        });

        onBeforeUnmount(() => {
            window.removeEventListener("resize", setButtonText);
        });

      return {
        modalActive, toggleModal, buttonText
      }
    }
}
</script>

<style lang="scss" scoped>
.addtask {
    .button {
        font-weight: 700;
        font-size: 15px;
        line-height: 19px;
        background: $main-color;
        border-radius: 24px;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 5px 25px;
        color: #fff;
        cursor: pointer;

        @media(max-width: 700px) {
            width: 46px;
            height: 32px;
            font-size: 24px;
            display: flex;
            justify-content: center;
            padding: 0 0 6px;
        }
    }
}
</style>