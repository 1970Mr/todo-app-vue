<script setup>
import AddTodo from "@/components/todo/AddTodo.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import FilterTodo from "@/components/todo/FilterTodo.vue";
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { selectedTodo, showDeletedModal, searchItem, filteredTodos } = storeToRefs(todoStore);

const { addTodo, openDeleteModal, closeDeleteModal, deleteTodo, onUpdate, onEdit, onCancel, doFilter } = todoStore;
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

        <FilterTodo @on-filter="doFilter" />
      </div>

      <AddTodo @add-todo="addTodo" />

      <div class="space-y-4">
        <div
            v-for="(todoItem, index) in filteredTodos"
            :key="index"
            :id="todoItem.id"
            @dblclick="todoItem.status = !todoItem.status"
            v-if="filteredTodos.length > 0"
        >
          <div class="flex items-center justify-between" v-if="todoItem.inEdit">
            <input
                class="bg-white rounded-l-lg px-4 py-2 w-full focus:outline-none"
                v-model="todoItem.text"
                @blur="onCancel(todoItem)"
                @keydown.enter="onUpdate(todoItem)"
            />
            <button class="text-green-600 bg-white bg-opacity-50 p-2 hover:text-green-500" @click="onUpdate(todoItem)">
              <i class="bx bx-edit"></i>
            </button>
            <button class="text-red-500 bg-white bg-opacity-50 p-2 hover:text-red-700 rounded-r-lg" @click="onCancel(todoItem)">
              <i class="bx bx-x-circle"></i>
            </button>
          </div>

          <div class="flex items-center bg-white bg-opacity-50 rounded-lg px-4 py-2" v-if="!todoItem.inEdit">
          <span class="flex-1 text-gray-800 break-all select-none" :class="todoItem.status ? 'line-through' : ''">
            <span @dblclick.stop="onEdit(todoItem)">{{ todoItem.text }}</span>
          </span>
            <div class="flex space-x-2">
              <button class="text-blue-500 hover:text-blue-700" title="Edit" @click="onEdit(todoItem)">
                <i class="bx bx-edit-alt"></i>
              </button>
              <button class="text-red-500 hover:text-red-700" title="Delete" @click="openDeleteModal(todoItem)">
                <i class="bx bx-trash"></i>
              </button>
              <button class="text-green-500 hover:text-green-700" title="Completed" @click="todoItem.status = !todoItem.status">
                <i class="bx bx-check completed-icon" v-if="!todoItem.status"></i>
                <i class="bx bx-check-double completed-icon" v-if="todoItem.status"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="flex items-center justify-center bg-white bg-opacity-50 rounded-lg px-4 py-2 text-sky-700">
            No items found! Please add a new Item.
          </p>
        </div>
      </div>
    </div>
  </div>

  <ConfirmModal v-if="selectedTodo && showDeletedModal" main-message="Are you sure you want to delete this todo item?" @confirm="deleteTodo" @cancel="closeDeleteModal" />
</template>

<style scoped>
.completed-icon {
  margin-right: -0.5rem;
}
</style>
