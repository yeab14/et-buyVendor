<template>
    <div class="multi-select">
      <label v-if="label" class="label">{{ label }}</label>
      <select 
        multiple 
        :value="modelValue" 
        @change="updateValue($event)" 
        class="select"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: Array,
      options: Array,
      label: String
    },
    methods: {
      updateValue(event) {
        const selectedOptions = Array.from(event.target.selectedOptions).map(opt => opt.value);
        this.$emit('update:modelValue', selectedOptions);
      }
    }
  };
  </script>
  
  <style scoped>
  .multi-select {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  