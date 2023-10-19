<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 class="text-xl font-semibold mb-4">Add Task</h2>
        <input v-model="newTaskName" type="text" placeholder="Task Name" class="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
        <input v-model="newTaskDeadline" type="date" class="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
        <div class="flex justify-end">
          <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Add</button>
          <button @click="closePopup" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTaskName: "",
        newTaskDeadline: "",
      };
    },
    methods: {
      addTask() {
        // Emit an event to send the task data to the parent component
        this.$emit("task-added", {
          name: this.newTaskName,
          deadline: this.newTaskDeadline,
        });
        this.closePopup();
      },
      closePopup() {
        // Emit an event to notify the parent component to close the pop-up
        this.$emit("close-popup");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your styles for the pop-up component */
  </style>
  