<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <div class="row">
          <!-- FAQ Section -->
          <div class="col-md-12">
            <h2 class="section-title">Help & Support</h2>
            <p class="section-description">
              We are committed to providing you with the best experience possible. Below are some frequently asked questions to help you get started quickly. If you need more assistance, feel free to reach out to our support team — we're always here to help!
            </p>
            <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
              <div class="faq-question" @click="toggleAnswer(index)">
                <i :class="item.isOpen ? 'nc-icon nc-minimal-up' : 'nc-icon nc-minimal-down'" class="toggle-icon"></i>
                <h5 class="question-text">{{ item.question }}</h5>
              </div>
              <div v-if="item.isOpen" class="faq-answer">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>
        <!-- Contact Support Section -->
        <div class="row justify-content-center">
          <div class="col-6 text-center">
            <h5 class="contact-header">Still Need Help?</h5>
            <p class="category">Our dedicated support team is ready to assist you with anything you need. Whether it's a quick question or a complex issue, we're here for you.</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-3">
            <button class="btn btn-danger btn-block" @click="openSupportForm">Contact Support</button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-success btn-block" @click="openLiveChat">Live Chat</button>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        faqItems: [
          {
            question: 'How do I update my store settings?',
            answer: 'Updating your store settings is easy! Simply navigate to your account settings from the dashboard, then click on "Store Settings" to modify your store details like name, logo, payment options, and more.',
            isOpen: false
          },
          {
            question: 'How can I manage product listings?',
            answer: 'You can add, edit, and remove your products anytime by going to the "Product Management" tab. We also offer bulk upload options and customizable filters to make managing your listings more efficient.',
            isOpen: false
          },
          {
            question: 'What should I do if I encounter an issue with an order?',
            answer: 'If you encounter any issues with an order, simply go to your "Order History" and select the order in question. From there, you can request a refund or reach out to our support team directly for assistance. We strive to resolve all issues as quickly as possible.',
            isOpen: false
          },
          {
            question: 'How do I track my sales performance?',
            answer: 'We’ve made tracking your sales performance effortless! Access detailed reports from the "Analytics" tab. Our dashboard provides insights into your total sales, customer behavior, and product performance, helping you make data-driven decisions.',
            isOpen: false
          },
          {
            question: 'How do I secure my account and data?',
            answer: 'Your security is our priority! Make sure to enable two-factor authentication (2FA) under your account settings for an extra layer of protection. We also recommend regularly updating your password and reviewing your account activity.',
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
        // Logic to open a support form modal or direct user to a support page
        this.$router.push({ name: 'support-form' });
      },
      openLiveChat() {
        // Logic to initiate a live chat
        this.$router.push({ name: 'live-chat' });
      }
    }
  }
</script>

<style scoped lang="scss">
.content {
  .section-title {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #e74c3c;  /* Red brand color */
  }

  .section-description {
    font-size: 1.3rem;
    color: #7a7a7a;
    margin-bottom: 2.5rem;
    line-height: 1.8;
  }

  .faq-item {
    margin-bottom: 1.8rem;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #f7f7f7;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .faq-question {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 600;
      color: #2d3436;
      transition: color 0.3s ease;

      &:hover {
        color: #e74c3c;
      }

      .toggle-icon {
        margin-right: 1rem;
        transition: transform 0.3s ease;
      }

      .question-text {
        flex-grow: 1;
      }
    }

    .faq-answer {
      padding-left: 3rem;
      color: #7a7a7a;
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  .contact-header {
    font-size: 2rem;
    font-weight: bold;
    color: #2d3436;
  }

  .category {
    font-size: 1.1rem;
    color: #7a7a7a;
    margin-bottom: 2rem;
  }

  .btn {
    font-size: 1.2rem;
    padding: 0.9rem;
    margin: 0.6rem 0;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .btn-danger {
    background-color: #e74c3c;
    border-color: #e74c3c;
    color: white;

    &:hover {
      background-color: #c0392b;
    }
  }

  .btn-success {
    background-color: #2ecc71;
    border-color: #2ecc71;
    color: white;

    &:hover {
      background-color: #27ae60;
    }
  }
}
</style>
