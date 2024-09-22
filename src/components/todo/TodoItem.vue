<script setup>
import { defineProps } from 'vue';
import {useTodoStore} from "@/stores/todo.js";

const { todoItem } = defineProps({
  todoItem: {
    type: Object,
    required: true
  },
});

const todoStore = useTodoStore();

const { showDeleteModal, updateTodo, startEditingTodo, cancelEditingTodo, } = todoStore;

function handleCancel() {
  setTimeout(() => cancelEditingTodo(todoItem), 300)
}
</script>

<template>
  <div class="flex items-center justify-between" v-if="todoItem.inEdit">
    <input
        class="bg-white rounded-l-lg px-4 py-2 w-full focus:outline-none"
        v-model="todoItem.text"
        @blur="handleCancel"
        @keydown.enter="updateTodo(todoItem)"
    />
    <button class="text-green-600 bg-white bg-opacity-50 p-2 hover:text-green-500" @click="updateTodo(todoItem)">
      <i class="bx bx-edit"></i>
    </button>
    <button class="text-red-500 bg-white bg-opacity-50 p-2 hover:text-red-700 rounded-r-lg" @click="cancelEditingTodo(todoItem)">
      <i class="bx bx-x-circle"></i>
    </button>
  </div>

  <div class="flex items-center bg-white bg-opacity-50 rounded-lg px-4 py-2" v-else @dblclick="todoItem.status = !todoItem.status">
    <span class="flex-1 text-gray-800 break-all select-none" :class="todoItem.status ? 'line-through' : ''">
      <span @dblclick.stop="startEditingTodo(todoItem)">{{ todoItem.text }}</span>
    </span>
    <div class="flex space-x-2">
      <button class="text-blue-500 hover:text-blue-700" title="Edit" @click="startEditingTodo(todoItem)">
        <i class="bx bx-edit-alt"></i>
      </button>
      <button class="text-red-500 hover:text-red-700" title="Delete" @click="showDeleteModal(todoItem)">
        <i class="bx bx-trash"></i>
      </button>
      <button class="text-green-500 hover:text-green-700" title="Completed" @click="todoItem.status = !todoItem.status">
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
