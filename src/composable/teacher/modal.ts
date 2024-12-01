import { ref, ComponentPublicInstance } from 'vue'

const page = ref(null);
const modal = ref<ComponentPublicInstance | null>(null);

  function dismiss() {
    modal.value?.$el?.dismiss();
  }

  async function canDismiss(data?: any, role?: string) {
    return  await role !== 'gesture';
  }