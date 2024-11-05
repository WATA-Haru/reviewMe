<script setup lang="ts">
import { ref } from 'vue'

const isShowModal = ref(false)
</script>
<template>
  <button @click="isShowModal = true">showModal</button>
  <Teleport to="body">
    <div v-if="isShowModal">
      <div class="modal-wrapper">
        <div class="modal-mask">
          <div class="modal">
            <h2>This is a modal open</h2>
            <button @click="isShowModal = false">close</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style lang="css" scoped>
.modal-wrapper {
  --modal-bg-color: rgba(0, 0, 0, 0.5);
  --zindex-highest: 9999;
}
.modal-mask {
  /* 公式docsから */
  position: fixed;
  z-index: var(--zindex-highest);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-bg-color);
  display: flex;
  /* transition: opacity 0.3s ease; */
}
</style>
