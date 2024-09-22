import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
    // State
    const todos = ref([]);
    const selectedTodo = ref(null);
    const showDeletedModal = ref(false);
    const filterType = ref('all');
    const searchItem = ref('');

    // Actions
    function addTodo(data) {
        todos.value.unshift(data);
    }

    function showDeleteModal(todoItem) {
        selectedTodo.value = todoItem;
        showDeletedModal.value = true;
    }

    function hideDeleteModal() {
        selectedTodo.value = null;
        showDeletedModal.value = false;
    }

    function confirmDeleteTodo() {
        if (!selectedTodo || !showDeletedModal) return;

        todos.value = todos.value.filter((item) => item.id !== selectedTodo.value.id);

        hideDeleteModal();
    }

    function updateTodo(todoItem) {
        if (!todoItem.text.trim()) return;

        todoItem.inEdit = false;
        todoItem.text = todoItem.text.trim();
        todoItem.textFormer = null;
    }

    function startEditingTodo(todoItem) {
        todos.value.forEach((item) => (item.inEdit = false));
        todoItem.inEdit = true;
        todoItem.textFormer = todoItem.text;
    }

    function cancelEditingTodo(todoItem) {
        todoItem.inEdit = false;

        if (todoItem.textFormer) {
            todoItem.text = todoItem.textFormer;
        }
    }

    function applyFilter(filter) {
        filterType.value = filter;
    }

    // Getters
    const searchedTodos = computed(() => {
        const searchRegex = new RegExp(searchItem.value, 'i');
        return searchItem.value !== ''
            ? todos.value.filter(item => searchRegex.test(item.text))
            : todos.value;
    });

    const filteredTodos = computed(() => {
        if (filterType.value === 'all') return searchedTodos.value;
        if (filterType.value === 'active') return searchedTodos.value.filter((item) => !item.status);
        if (filterType.value === 'completed') return searchedTodos.value.filter((item) => item.status);
    });

    return {
        // State
        todos,
        selectedTodo,
        showDeletedModal,
        filterType,
        searchItem,

        // Getters
        searchedTodos,
        filteredTodos,

        // Actions
        addTodo,
        showDeleteModal,
        hideDeleteModal,
        confirmDeleteTodo,
        updateTodo,
        startEditingTodo,
        cancelEditingTodo,
        applyFilter,
    };
}, {
    persist: true,
});
