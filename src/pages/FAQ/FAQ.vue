<template>
  <div class="min-h-screen px-content-px py-content-py bg-etbuy-creamywhite text-etbuy-black font-public-sans">
    <main class="max-w-5xl mx-auto bg-etbuy-white shadow-etbuy-light rounded-2xl p-10 space-y-16">

      <!-- Header -->
      <section class="text-center space-y-3">
        <h2 class="text-3xl font-bold text-etbuy-red-dark">Help & Support</h2>
        <p class="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          We are committed to providing you with the best experience. Check out these frequently asked questions or reach out to our team directly.
        </p>
      </section>

      <!-- FAQ Section -->
      <section class="space-y-6">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="border border-etbuy-red-light rounded-xl p-6 bg-etbuy-white hover:shadow-etbuy-light-hover transition-shadow duration-300"
        >
          <button
            class="w-full text-left flex items-center justify-between font-semibold text-etbuy-red-dark text-lg focus:outline-none"
            @click="toggleAnswer(index)"
          >
            <span>{{ item.question }}</span>
            <i :class="item.isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-etbuy-red-darken"></i>
          </button>
          <transition name="fade">
            <p v-if="item.isOpen" class="mt-3 text-sm text-gray-700 leading-relaxed">
              {{ item.answer }}
            </p>
          </transition>
        </div>
      </section>

     
      <!-- Contact CTA -->
<section class="text-center space-y-6">
  <h3 class="text-2xl font-semibold text-etbuy-red-dark">Still Need Help?</h3>
  <p class="text-gray-700 max-w-xl mx-auto text-base">
    Our dedicated support team is ready to assist you — whether it's a quick question or a complex issue.
  </p>

  <div class="flex flex-col md:flex-row justify-center gap-5 mt-4">

<button
  @click="openSupportForm"
  class="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-topbar-bg text-etbuy-white hover:bg-etbuy-red-dark transition-all duration-300 font-semibold shadow-etbuy-button hover:shadow-etbuy-light-hover"
>
  <i class="fas fa-headset"></i>
  Contact Support
</button>

<button
  @click="openLiveChat"
  class="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-etbuy-red-dark text-etbuy-red-dark bg-white hover:bg-etbuy-red-light hover:text-etbuy-black transition-all duration-300 font-semibold shadow-etbuy-button hover:shadow-etbuy-light-hover"
>
  <i class="fas fa-comments"></i>
  Live Chat
</button>


  </div>
</section>


    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqItems: [
        {
          question: 'How do I update my Profile Settings?',
          answer: 'Go to Profile Settings, From there, update your name, store info, logo, etc.',
          isOpen: false
        },
        {
          question: 'How can I manage product listings?',
          answer: 'Head to the "Product Management" tab. Use the bulk upload or filters to update listings.',
          isOpen: false
        },
        {
          question: 'What should I do if I encounter an issue with an order?',
          answer: 'Navigate to "Order History", find the order and initiate a refund or reach support directly.',
          isOpen: false
        },
        {
          question: 'How do I track my sales performance?',
          answer: 'Visit the "Analytics" tab for reports on sales, customer insights, and performance trends.',
          isOpen: false
        },
        {
          question: 'How do I secure my account and data?',
          answer: 'Enable 2FA from settings, regularly update passwords, and monitor your account activity.',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    toggleAnswer(index) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
    },
    openSupportForm() {
      this.$router.push({ name: 'support-form' });
    },
    openLiveChat() {
      this.$router.push({ name: 'live-chat' });
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>