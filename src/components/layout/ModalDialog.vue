<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  const { show, title, message } = defineProps(['show', 'title', 'message']);
  
  const emit = defineEmits(["closeModal"]);
  const closeModal = () => {
    emit("closeModal");
  };
</script>

<template>
  <div v-if="show" class="modal">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="message">{{ message }}</div>
      <button @click="closeModal">確認</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: 450px;
    height: 300px;
    background: rgb(var(--color-modal-background), 0.9);
    padding: 20px;
    border: 1px solid var(--color-theme-border);
    border-radius: 4px;

    .title {
      color: var(--color-theme-border);
      font-size: 24px;
      font-weight: bold;
    }

    .message {
      display: flex;
      align-items: center;
      flex-grow: 1;
      color: white;
      font-size: 18px;
      font-weight: bold;
    }

    > button {
      background-color: var(--color-theme-border);
      padding: 10px 0;
      width: 100%;
      max-width: 175px;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: var(--color-theme-border);
      }
    }
  }
}

@media (max-width: 720px) {
  .modal {
    .content {
      padding: 15px;
    }
  }
}
</style>