<script setup>
import AddTodo from "@/components/todo/AddTodo.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import FilterTodo from "@/components/todo/FilterTodo.vue";
import TodoItem from "@/components/todo/TodoItem.vue";
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { selectedTodo, showDeletedModal, searchItem, filteredTodos } = storeToRefs(todoStore);

const { addTodo, hideDeleteModal, confirmDeleteTodo, applyFilter } = todoStore;
</script>

<template>
  <div class="overflow-hidden w-[35rem] rounded-lg">
    <div class="w-full p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg max-h-[35rem] overflow-y-auto">
      <h1 class="text-2xl font-bold mb-4 text-center text-white">Todo List</h1>

      <div class="flex items-center justify-between mb-4">
        <div class="relative">
          <i class="bx bx-search text-xl text-gray-300 absolute left-1 top-[.43rem]"></i>
          <input
              v-model="searchItem"
              type="text"
              placeholder="Search items..."
              class="flex-1 rounded-lg pr-2 pl-6 py-1 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500"
          />
        </div>

        <FilterTodo @apply-filter="applyFilter" />
      </div>

      <AddTodo @add-todo="addTodo" />

      <div class="space-y-4">
        <TodoItem
            v-for="(todoItem, index) in filteredTodos"
            :key="index"
            :todo-item="todoItem"
        />

        <div v-if="filteredTodos.length === 0">
          <p class="flex items-center justify-center bg-white bg-opacity-50 rounded-lg px-4 py-2 text-sky-700">
            No items found! Please add a new Item.
          </p>
        </div>
      </div>
    </div>
  </div>

  <ConfirmModal
      v-if="selectedTodo && showDeletedModal"
      main-message="Are you sure you want to delete this todo item?"
      @confirm="confirmDeleteTodo"
      @cancel="hideDeleteModal"
  />
</template>
