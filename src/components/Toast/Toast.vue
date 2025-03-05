<template>
    <div v-if="visible" :class="['custom-toast', type]" class="toast-container">
      <div class="toast-icon">
        <svg
          v-if="type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 11l3 3L22 4" />
        </svg>
        <svg
          v-if="type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>
      <div class="toast-message">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'success',
      },
      duration: {
        type: Number,
        default: 3000, 
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    mounted() {
      this.showToast();
    },
    methods: {
      showToast() {
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, this.duration);
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-toast {
    background-color: #fff !important;
    color: white !important;
    border-radius: 12px !important;
    padding: 16px 32px !important;
    font-size: 16px !important;
    font-family: 'Public Sans', sans-serif;
    font-weight: 600 !important;
    text-align: center !important;
    max-width: 300px !important;
    margin: 10px auto !important;
    position: relative !important;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s ease-out !important;
    z-index: 9999;
  }
  
  .custom-toast.success {
    background: linear-gradient(145deg, #32c732, #2b9e2b) !important;
    border: 1px solid #28a728 !important;
    box-shadow: 0 4px 12px rgba(50, 199, 50, 0.3) !important;
    animation: toastSlideIn 0.5s ease-out !important;
  }
  
  .custom-toast.error {
    background: linear-gradient(145deg, #ff4f4f, #ff2b2b) !important;
    border: 1px solid #f03d3d !important;
    box-shadow: 0 4px 12px rgba(255, 79, 79, 0.3) !important;
    animation: toastShake 0.5s ease-out !important;
  }
  
  .custom-toast .toast-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
  
  .custom-toast .toast-message {
    font-family: 'Public Sans', sans-serif;
    line-height: 1.4;
    font-size: 15px !important;
  }
  
  @keyframes toastSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes toastShake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
  </style>
  