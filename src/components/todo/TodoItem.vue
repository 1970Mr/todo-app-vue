<script setup>
import { defineProps } from 'vue';

const { todoItem } = defineProps({
  todoItem: {
    type: Object,
    required: true
  },
});

const emit = defineEmits(['update-todo', 'edit-todo', 'delete-todo', 'toggle-status', 'cancel-edit']);

function handleUpdate() {
  emit('update-todo', todoItem);
}

function handleEdit() {
  emit('edit-todo', todoItem);
}

function handleCancel() {
  setTimeout(() => emit('cancel-edit', todoItem), 300)
}

function handleDelete() {
  emit('delete-todo', todoItem);
}

function handleToggleStatus() {
  emit('toggle-status', todoItem);
}
</script>

<template>
  <div class="flex items-center justify-between" v-if="todoItem.inEdit">
    <input
        class="bg-white rounded-l-lg px-4 py-2 w-full focus:outline-none"
        v-model="todoItem.text"
        @blur="handleCancel"
        @keydown.enter="handleUpdate"
    />
    <button class="text-green-600 bg-white bg-opacity-50 p-2 hover:text-green-500" @click="handleUpdate">
      <i class="bx bx-edit"></i>
    </button>
    <button class="text-red-500 bg-white bg-opacity-50 p-2 hover:text-red-700 rounded-r-lg" @click="handleCancel">
      <i class="bx bx-x-circle"></i>
    </button>
  </div>

  <div class="flex items-center bg-white bg-opacity-50 rounded-lg px-4 py-2" v-else>
    <span class="flex-1 text-gray-800 break-all select-none" :class="todoItem.status ? 'line-through' : ''">
      <span @dblclick.stop="handleEdit">{{ todoItem.text }}</span>
    </span>
    <div class="flex space-x-2">
      <button class="text-blue-500 hover:text-blue-700" title="Edit" @click="handleEdit">
        <i class="bx bx-edit-alt"></i>
      </button>
      <button class="text-red-500 hover:text-red-700" title="Delete" @click="handleDelete">
        <i class="bx bx-trash"></i>
      </button>
      <button class="text-green-500 hover:text-green-700" title="Completed" @click="handleToggleStatus">
        <i class="bx bx-check completed-icon" v-if="!todoItem.status"></i>
        <i class="bx bx-check-double completed-icon" v-if="todoItem.status"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.completed-icon {
  margin-right: -0.5rem;
}
</style>
