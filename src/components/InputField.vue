<template>
    <div class="input-field">
      <label v-if="label" class="label">{{ label }}</label>
      <input 
        :type="type" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
        class="input"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
      label: String,
      type: {
        type: String,
        default: 'text'
      }
    }
  };
  </script>
  
  <style scoped>
  .input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  