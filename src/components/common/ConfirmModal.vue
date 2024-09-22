<script setup>
import {defineProps, defineEmits, useTemplateRef, onMounted} from "vue"

const emit = defineEmits(['confirm', 'cancel'])
const confirmBtn = useTemplateRef('confirmBtn');

defineProps({
  mainMessage: {
    type: String,
    required: true
  },
  confirmMessage: {
    type: String,
    default: 'Confirm'
  },
  cancelMessage: {
    type: String,
    default: 'Cancel'
  },
})

onMounted(() => confirmBtn.value.focus())
</script>

<template>
  <teleport to="body">
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        @click="emit('cancel')"
    >
      <div class="bg-white p-6 rounded-lg max-w-md" @click.stop="">
        <p class="text-lg text-gray-800 mb-4">
          {{ mainMessage }}
        </p>
        <div class="flex justify-end">
          <button
              @click="emit('confirm')"
              @keydown.enter="emit('confirm')"
              ref="confirmBtn"
              class="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
          >
            {{ confirmMessage }}
          </button>
          <button
              @click="emit('cancel')"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            {{ cancelMessage }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>