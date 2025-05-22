<template>
  <div class="dynamic-input">
    <!-- SELECT Input -->
    <div v-if="inputType === 'SELECT'" class="select-wrapper">
      <select
        :value="modelValue"
        @change="handleSelectChange"
        class="form-control select-input"
      >
        <option value="" disabled selected>Select an option</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.value"
          :data-attribute-value-id="option.attributeValueId"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="select-arrow"></div>
    </div>
    
    <!-- TEXT Input -->
    <input
      v-else-if="inputType === 'TEXT'"
      type="text"
      :value="modelValue"
      @input="(e) => handleInputChange(e.target.value)"
      class="form-control text-input"
      placeholder="Enter text"
    />
    
    <!-- NUMBER Input -->
    <input
      v-else-if="inputType === 'NUMBER'"
      type="number"
      :value="modelValue"
      @input="(e) => handleInputChange(e.target.value)"
      class="form-control number-input"
      placeholder="Enter number"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  inputType: {
    type: String,
    required: true,
    validator: (value) => ['SELECT', 'TEXT', 'NUMBER'].includes(value)
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => [],
    validator: (options) => {
      return options.every(option => 
        typeof option === 'object' && 
        'id' in option && 
        'value' in option && 
        'label' in option &&
        'attributeValueId' in option
      );
    }
  }
});

const emit = defineEmits(['update:modelValue']);

const handleSelectChange = (event) => {
  const value = event.target.value;
  const selectedOption = props.options.find(opt => opt.value === value);
  console.log('Selected option:', selectedOption);
  emit('update:modelValue', value, selectedOption);
};

const handleInputChange = (value) => {
  emit('update:modelValue', value);
};

// Debug watches
watch(() => props.options, (newOptions) => {
  console.log('DynamicInput options updated:', newOptions);
}, { deep: true, immediate: true });

watch(() => props.modelValue, (newValue) => {
  console.log('DynamicInput modelValue updated:', newValue);
}, { immediate: true });
</script>

<style scoped>
.dynamic-input {
  width: 100%;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #ee5858;
  box-shadow: 0 0 0 3px rgba(238, 88, 88, 0.1);
  outline: none;
}

/* Select specific styles */
.select-wrapper {
  position: relative;
  width: 100%;
}

.select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  padding-right: 40px;
  background-color: #fff;
  font-weight: 500;
}

.select-input option {
  padding: 8px;
}

.select-input option:first-child {
  color: #666;
  font-style: italic;
}

/* Custom arrow */
.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #666;
  pointer-events: none;
}

/* Hover and focus states */
.select-input:hover {
  border-color: #ee5858;
}

.select-input:focus {
  border-color: #ee5858;
  box-shadow: 0 0 0 3px rgba(238, 88, 88, 0.1);
}

/* Style for selected option */
.select-input option:checked {
  background-color: #ee5858;
  color: white;
}

/* Number input specific styles */
.number-input {
  -moz-appearance: textfield;
}

.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Placeholder styles */
.form-control::placeholder {
  color: #999;
  font-size: 14px;
}
</style>
