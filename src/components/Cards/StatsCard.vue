<template>
  <div class="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
    <div class="flex items-center space-x-3">
      <i :class="icon + ' text-red-600 text-xl'"></i>
      <div>
        <p class="text-sm text-gray-500">{{ label }}</p>
        <p class="text-2xl font-bold">{{ formattedValue }}</p>
      </div>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    icon: { type: String, required: true },
    label: { type: String, required: true },
    value: { required: true }
  },
  computed: {
    formattedValue() {
      return typeof this.value === 'number' ? this.value.toLocaleString() : this.value;
    }
  }
};
</script>
