<template>
  <div class="w-full">
  
    <div v-if="inputType === 'SELECT'" class="relative w-full">
      <select
        :value="modelValue"
        @change="handleSelectChange"
        class="w-full appearance-none bg-white border border-gray-300 text-sm px-4 py-3 rounded-md pr-10 font-medium focus:outline-none focus:ring-2 focus:ring-etbuy-red-light focus:border-etbuy-red-dark transition-all duration-200"
      >
        <option value="" disabled selected class="text-gray-500 italic">Select an option</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.value"
          :data-attribute-value-id="option.attributeValueId"
        >
          {{ option.label }}
        </option>
      </select>
   
      <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>


    <input
      v-else-if="inputType === 'TEXT'"
      type="text"
      :value="modelValue"
      @input="(e) => handleInputChange(e.target.value)"
      class="w-full bg-white border border-gray-300 text-sm px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-etbuy-red-light focus:border-etbuy-red-dark transition-all duration-200"
      placeholder="Enter text"
    />

 
    <input
      v-else-if="inputType === 'NUMBER'"
      type="number"
      :value="modelValue"
      @input="(e) => handleInputChange(e.target.value)"
      class="w-full bg-white border border-gray-300 text-sm px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-etbuy-red-light focus:border-etbuy-red-dark transition-all duration-200"
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
  emit('update:modelValue', value, selectedOption);
};

const handleInputChange = (value) => {
  emit('update:modelValue', value);
};

watch(() => props.options, (newOptions) => {
  console.log('DynamicInput options updated:', newOptions);
}, { deep: true, immediate: true });

watch(() => props.modelValue, (newValue) => {
  console.log('DynamicInput modelValue updated:', newValue);
}, { immediate: true });
</script>
