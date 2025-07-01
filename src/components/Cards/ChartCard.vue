<template>
  <div class="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
    <div class="mb-4">
      <h4 class="text-lg font-semibold">{{ title }}</h4>
      <p class="text-sm text-gray-500">{{ subtitle }}</p>
    </div>
    <div class="flex-grow">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCard',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true }
  }
};
</script>
