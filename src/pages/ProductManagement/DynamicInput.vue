<template>
    <div class="dynamic-input">
      <!-- SELECT Input -->
      <select
        v-if="inputType === 'SELECT'"
        v-model="internalValue"
        @change="updateValue"
        class="form-control select-input"
      >
        <option disabled value="">Select an option</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
  
      <!-- TEXT Input -->
      <input
        v-else-if="inputType === 'TEXT'"
        type="text"
        v-model="internalValue"
        @input="updateValue"
        class="form-control text-input"
      />
  
      <!-- NUMBER Input -->
      <input
        v-else-if="inputType === 'NUMBER'"
        type="number"
        v-model.number="internalValue"
        @input="updateValue"
        class="form-control number-input"
      />
  
      <!-- Default fallback -->
      <input
        v-else
        type="text"
        v-model="internalValue"
        @input="updateValue"
        class="form-control default-input"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: [String, Number, null],
    inputType: {
      type: String,
      default: 'TEXT',
    },
    options: {
      type: Array,
      default: () => [],
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const internalValue = ref(props.modelValue);
  
  watch(
    () => props.modelValue,
    (newVal) => {
      internalValue.value = newVal;
    }
  );
  
  const updateValue = () => {
    emit('update:modelValue', internalValue.value);
  };
  </script>
  
  <style scoped>
  .dynamic-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    font-family: 'Playfair Display', serif;
  }
  
  .form-control {
    padding: 0.75rem 1rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;
    font-size: 1rem;
    color: #333;
  }
  
  .form-control:focus {
    border-color: #e63946; /* vivid red accent */
    box-shadow: 0 0 0 4px rgba(230, 57, 70, 0.2);
    outline: none;
  }
  
  .select-input {
    background-color: #fffafc;
  }
  
  .number-input {
    background-color: #fff7f9;
  }
  
  .text-input {
    background-color: #fff5f6;
  }
  </style>
  