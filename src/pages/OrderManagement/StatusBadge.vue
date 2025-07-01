<template>
    <span
      :class="badgeClass"
      class="inline-block px-3 py-1 rounded-full text-xs font-semibold select-none shadow-sm"
    >
      {{ status }}
    </span>
  </template>
  
  <script setup>
  const props = defineProps({
    status: {
      type: String,
      required: true,
    },
  });
  
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    Shipped: 'bg-blue-100 text-blue-800 border border-blue-300',
    Delivered: 'bg-green-100 text-green-800 border border-green-300',
    Cancelled: 'bg-red-100 text-red-800 border border-red-300',
    Default: 'bg-gray-100 text-gray-700 border border-gray-300',
  };
  
  const badgeClass = statusColors[props.status] || statusColors.Default;
  </script>
  