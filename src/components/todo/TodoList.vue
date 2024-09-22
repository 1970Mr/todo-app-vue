<script setup>
import AddTodo from "@/components/Home/AddTodo.vue"
import ConfirmModal from "@/components/common/ConfirmModal.vue"
import FilterTodo from "@/components/Home/FilterTodo.vue"
import {ref} from "vue"

const todos = ref([])
const selectedTodo = ref(null)
const showDeletedModal = ref(false)
const filterOption = ref('all')
const searchItem = ref('')

function addTodo(data) {
  todos.value.unshift(data)
}

function openDeleteModal(todoItem) {
  selectedTodo.value = todoItem
  showDeletedModal.value = true
}

function closeDeleteModal() {
  selectedTodo.value = null
  showDeletedModal.value = false
}

function deleteTodo() {
  if (!selectedTodo || !showDeletedModal) return
  
  todos.value = todos.value.filter(
      (item) => item.id !== selectedTodo.value.id
  )
  
  closeDeleteModal()
}

function onUpdate(todoItem) {
  todoItem.inEdit = false
  todoItem.text = todoItem.text.trim()
}

function onEdit(todoItem) {
  todos.value.forEach(item => item.inEdit = false)
  todoItem.inEdit = true
  todoItem.textFormer = todoItem.text
}

function onCancel(todoItem) {
  todoItem.inEdit = false
  todoItem.text = todoItem.textFormer
}

function doFilter(filter) {
  filterOption.value = filter
}

function filteredTodo() {
  const searchedTodo = searchTodo()

  if (filterOption.value === 'all')
    return searchedTodo
  if (filterOption.value === 'active')
    return searchedTodo.filter(item => !item.status)
  if (filterOption.value === 'completed')
    return searchedTodo.filter(item => item.status)
}

function searchTodo() {
  const searchRegex = new RegExp(searchItem.value, 'i');
  return searchItem.value !== '' ? todos.value.filter(item => searchRegex.test(item.text)) : todos.value
}
</script>

<template>
  <div
      class="max-w-md w-full p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg"
  >
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

      <FilterTodo @on-filter="doFilter"/>
    </div>

    <AddTodo @add-todo="addTodo"/>

    <!-- Todo list -->
    <div class="space-y-4">
      <!-- Single todo item -->
      <div
          v-for="(todoItem, index) in filteredTodo()"
          :key="index"
          :id="todoItem.id"
          @dblclick="todoItem.status = !todoItem.status"
      >
        <div class="flex items-center justify-between" v-if="todoItem.inEdit">
          <input
              class="bg-white rounded-l-lg px-4 py-2 w-full focus:outline-none"
              v-model="todoItem.text"
          >
          <button
              class="text-green-600 bg-white bg-opacity-50 p-2 hover:text-green-500"
              @click="onUpdate(todoItem)"
          >
            <i class="bx bx-edit"></i>
          </button>
          <button
              class="text-red-500 bg-white bg-opacity-50 p-2 hover:text-red-700 rounded-r-lg"
              @click="onCancel(todoItem)"
          >
            <i class="bx bx-x-circle"></i>
          </button>
        </div>

        <div class="flex items-center justify-between bg-white bg-opacity-50 rounded-lg px-4 py-2"
             v-if="!todoItem.inEdit">
          <span
              class="flex-1 text-gray-800 break-all select-none"
              :class="todoItem.status ? 'line-through' : ''"
          >
            <span @dblclick.stop="onEdit(todoItem)">{{ todoItem.text }}</span>
          </span>
          <div class="flex space-x-2">
            <!-- Edit icon -->
            <!--  @click="openEditModal(todoItem)" -->
            <button class="text-blue-500 hover:text-blue-700" title="Edit" @click="onEdit(todoItem)">
              <i class="bx bx-edit-alt"></i>
            </button>
            <!-- Delete icon -->
            <button
                class="text-red-500 hover:text-red-700"
                title="Delete"
                @click="openDeleteModal(todoItem)"
            >
              <i class="bx bx-trash"></i>
            </button>
            <!-- Completed/Uncompleted Button -->
            <button
                class="text-green-500 hover:text-green-700"
                title="Completed"
                @click="todoItem.status = !todoItem.status"
            >
              <i class="bx bx-check completed-icon" v-if="!todoItem.status"></i>
              <i class="bx bx-check-double completed-icon" v-if="todoItem.status"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for delete confirmation -->
  <ConfirmModal
      v-if="selectedTodo && showDeletedModal"
      main-message="Are you sure you want to delete this todo item?"

      @confirm="deleteTodo"
      @cancell="closeDeleteModal"
  />
</template>

<style scoped>
.completed-icon {
  margin-right: -0.5rem;
}
</style>
