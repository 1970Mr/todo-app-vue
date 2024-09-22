<script setup>
import {defineEmits} from "vue"
import {useTodoStore} from "@/stores/todo.js";
import {storeToRefs} from "pinia";

const todoStore = useTodoStore()
const { filterType: selectedFilterType } = storeToRefs(todoStore);

const filterTypes = ['all', 'active', 'completed']

const emit = defineEmits(['applyFilter'])

function applyFilter(filterType) {
  emit('applyFilter', filterType)
}
</script>

<template>
  <div class="relative inline-block">
    <select
        class="block appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-1 pl-2 pr-6 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-gray-500"
        @change="applyFilter($event.target.value)"
    >
      <option
          v-for="(filterType, index) in filterTypes"
          :key="index"
          :value="filterType"
          :selected="selectedFilterType && filterType === selectedFilterType"
      >{{ filterType.toUpperCase() }}
      </option>
    </select>
    <div class="absolute right-0 top-[.5rem] flex items-center px-1 pointer-events-none">
      <i class="bx bx-chevron-down"></i>
    </div>
  </div>
</template>
