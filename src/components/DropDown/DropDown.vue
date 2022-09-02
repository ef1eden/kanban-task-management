<template>
  <Transition name="fade">
    <div class="dropdown" v-show="dropDownActive">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </Transition>
</template>

<script>
export default {
    name: 'DropDown',
    props: {
        dropDownActive: {
            type: Boolean,
            required: true,
        }
    },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.dropdown {
  position: absolute;
  top: 60px;
  right: 7px;
  width: 192px;
  min-width: 192px;
  max-width: 100%;
  background: #fff;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  border-radius: 8px;
  z-index: 1;

  ul {
    margin: 0;
    padding: 9px 0 8px;
    list-style: none;

    :deep(li) {
      padding: 8px 16px;
      color: $medium-grey;
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      transition: all .4s ease;
      cursor: pointer;

      &:hover {
        color: $main-color;
      }

      &:last-child {
        color: $red-color;
      }
    }
  }
}
</style>