<template>
  <div class="dynamic-input">
    <!-- SELECT Input -->
    <div v-if="inputType === 'SELECT'" class="form-group">
      <select
        :value="modelValue"
        @change="(e) => updateValue(e.target.value)"
        class="select attribute-select"
      >
        <option value="" disabled>Select an option</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.value"
        >
          {{ option.value }}
        </option>
      </select>
    </div>

    <!-- TEXT Input -->
    <input
      v-else-if="inputType === 'TEXT'"
      type="text"
      :value="modelValue"
      @input="(e) => updateValue(e.target.value)"
      class="input"
    />

    <!-- NUMBER Input -->
    <input
      v-else-if="inputType === 'NUMBER'"
      type="number"
      :value="modelValue"
      @input="(e) => updateValue(e.target.value)"
      class="input"
    />

    <!-- Default fallback -->
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="(e) => updateValue(e.target.value)"
      class="input"
    />
  </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  inputType: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};

// Debug
watch(() => props.options, (newOptions) => {
  console.log('Options updated:', newOptions);
}, { immediate: true });
</script>

<style scoped>
.dynamic-input {
  width: 100%;
}

.input,
.select {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  width: 100%;
  appearance: none; /* Remove default styling */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-image: none;
}

.select:focus {
  border-color: #ee5858 !important; /* Enforce red on focus */
  outline: none;
  box-shadow: none; /* Remove default blue glow (especially in Firefox) */
}

.input:focus,
.select:focus {
  border-color: #ee5858;
  outline: none;
}

.select.attribute-select {
  flex-grow: 1;
  border-radius: 8px;
  background-color: #fff;
}
</style>
