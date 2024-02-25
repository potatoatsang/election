import { defineStore } from 'pinia';

export interface Modal {
  show: boolean;
  title: string;
  message: string;
}

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    modal: {
      show: false,
      title: '',
      message: '',
    } as Modal,
  }),
  actions: {
    setModal(modal: Modal) {
      this.modal = modal;
    },
  },
});