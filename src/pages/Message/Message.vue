<template>
    <div class="min-h-screen bg-etbuy-creamywhite text-etbuy-black font-public-sans px-content-px py-content-py flex justify-center">
      <!-- Sidebar: Clients List -->
      <aside class="w-96 bg-etbuy-creamywhite border-r border-etbuy-red-light flex flex-col shadow-inner">
        <header
          class="px-8 py-5 border-b border-etbuy-red-light flex items-center justify-between bg-etbuy-red-dark text-etbuy-white"
        >
          <h2 class="font-semibold text-2xl tracking-wide">
            <i class="fas fa-comments mr-3"></i>Your Inbox
          </h2>
          <button
            class="text-etbuy-white hover:text-etbuy-red-light transition-colors duration-300 focus:outline-none p-2 rounded-full hover:bg-etbuy-white/10"
            aria-label="New message"
            title="Compose New Message"
          >
            <i class="fas fa-plus text-lg"></i>
          </button>
        </header>
  
        <div class="flex-1 overflow-y-auto custom-scrollbar pt-2">
          <ul>
            <li
              v-for="client in clients"
              :key="client.id"
              @click="selectClient(client)"
              :class="[
                'flex items-center gap-4 px-8 py-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] hover:bg-etbuy-red-light/20 border-l-4',
                selectedClient && selectedClient.id === client.id
                  ? 'bg-etbuy-red-light text-etbuy-white border-etbuy-red-dark shadow-md'
                  : 'text-etbuy-black border-transparent'
              ]"
              role="button"
              tabindex="0"
              @keydown.enter="selectClient(client)"
            >
              <div class="relative">
                <img
                  :src="client.avatar"
                  alt="User avatar"
                  class="w-14 h-14 rounded-full object-cover border-3 border-etbuy-red-dark transition-all duration-300"
                  :class="{ 'border-etbuy-white ring-2 ring-etbuy-white/50': selectedClient && selectedClient.id === client.id }"
                  loading="lazy"
                />
                <span v-if="client.unreadCount > 0" class="absolute -top-1 -right-1 bg-etbuy-orange text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white transform scale-90">
                  {{ client.unreadCount }}
                </span>
              </div>
              <div class="flex flex-col flex-1 overflow-hidden">
                <p class="font-bold truncate text-lg" :class="{ 'text-etbuy-white': selectedClient && selectedClient.id === client.id }">
                  {{ client.name }}
                </p>
                <p class="text-sm truncate" :class="{ 'text-etbuy-white/80': selectedClient && selectedClient.id === client.id, 'text-etbuy-red-darken': !(selectedClient && selectedClient.id === client.id) }">
                  {{ client.lastMessagePreview }}
                </p>
              </div>
              <time
                class="text-xs whitespace-nowrap opacity-70"
                :class="{ 'text-etbuy-white/70': selectedClient && selectedClient.id === client.id, 'text-etbuy-red-darken': !(selectedClient && selectedClient.id === client.id) }"
                :title="client.lastMessageDateFormatted"
              >
                {{ client.lastMessageTimeAgo }}
              </time>
            </li>
          </ul>
        </div>
      </aside>
  
      <!-- Chat Panel -->
      <main class="flex-1 flex flex-col bg-etbuy-white">
        <header
          class="flex items-center justify-between px-8 py-5 border-b border-etbuy-red-light bg-etbuy-creamywhite"
        >
          <div class="flex items-center gap-4">
            <img
              v-if="selectedClient"
              :src="selectedClient.avatar"
              alt="Selected client avatar"
              class="w-14 h-14 rounded-full object-cover border-3 border-etbuy-red-dark shadow-md"
              loading="lazy"
            />
            <div>
              <h3
                v-if="selectedClient"
                class="text-etbuy-red-dark font-bold text-xl tracking-wide"
              >
                {{ selectedClient.name }}
              </h3>
              <p v-if="selectedClient" class="text-gray-500 text-sm">
                <span class="text-green-500 mr-2">●</span>Online now
              </p>
              <p v-if="!selectedClient" class="text-gray-500 italic text-lg">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
          <button
            v-if="selectedClient"
            class="text-etbuy-red-dark hover:text-etbuy-red-darken focus:outline-none p-2 rounded-full hover:bg-etbuy-red-light/10 transition-colors duration-300"
            @click="clearSelectedClient"
            aria-label="Close conversation"
            title="Close Conversation"
          >
            <i class="fas fa-times text-lg"></i>
          </button>
        </header>
  
        <section
          v-if="selectedClient"
          class="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-etbuy-white to-etbuy-creamywhite custom-scrollbar flex flex-col-reverse"
          ref="messagesContainer"
        >
          <div class="space-y-4 pt-4">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="[
                'max-w-[75%] p-4 rounded-2xl break-words relative shadow-md animate-fade-in',
                msg.isSender
                  ? 'ml-auto bg-etbuy-red-dark text-white rounded-br-none'
                  : 'mr-auto bg-etbuy-white-transparent-light text-etbuy-black rounded-tl-none border border-etbuy-red-light/50'
              ]"
            >
              <p class="whitespace-pre-wrap leading-relaxed">{{ msg.text }}</p>
              <time
                class="text-xs mt-2 opacity-80 block text-right"
                :class="{ 'text-white/70': msg.isSender, 'text-etbuy-red-darken/80': !msg.isSender }"
                :title="msg.fullDate"
              >
                <i class="far fa-clock mr-1"></i>{{ msg.timeAgo }}
              </time>
            </div>
          </div>
        </section>
  
        <!-- Message Input -->
        <footer
          v-if="selectedClient"
          class="px-8 py-5 border-t border-etbuy-red-light bg-etbuy-creamywhite flex items-center gap-4 shadow-md"
        >
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type your message here..."
            class="flex-1 rounded-full border border-etbuy-red-light px-5 py-3 text-etbuy-black placeholder-etbuy-gray-placeholder focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300 text-lg"
            aria-label="Type your message"
          />
          <button
            @click="sendMessage"
            :disabled="!newMessage.trim()"
            class="bg-gradient-to-r from-etbuy-red-dark to-etbuy-orange text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            title="Send Message"
          >
            <i class="fas fa-paper-plane mr-2"></i>Send
          </button>
        </footer>
  
        <section v-else class="flex-1 flex flex-col items-center justify-center text-gray-500 italic p-8 text-center bg-gradient-to-br from-etbuy-white to-etbuy-creamywhite">
          <i class="fas fa-inbox text-8xl text-etbuy-red-light mb-8 opacity-70"></i>
          <p class="text-3xl font-bold text-etbuy-red-dark mb-4">Welcome to Your Inbox!</p>
          <p class="text-lg max-w-md">Select a client from the left sidebar to start a new conversation or view existing messages. Stay connected and manage your communications with ease.</p>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "Message",
    data() {
      return {
        selectedClient: null,
        newMessage: "",
        clients: [
          {
            id: 1,
            name: "Selamawit Kebede",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            lastMessagePreview: "Can we schedule a delivery for the weekend?",
            lastMessageDate: new Date(Date.now() - 3600 * 1000 * 2), // 2 hrs ago
            unreadCount: 2,
          },
          {
            id: 2,
            name: "Ato Tesfaye Lemma",
            avatar: "https://randomuser.me/api/portraits/men/50.jpg",
            lastMessagePreview: "Thank you for the prompt update!",
            lastMessageDate: new Date(Date.now() - 3600 * 1000 * 5), // 5 hrs ago
            unreadCount: 0,
          },
          {
            id: 3,
            name: "W/ro Almaz Abebe",
            avatar: "https://randomuser.me/api/portraits/women/62.jpg",
            lastMessagePreview: "Payment confirmed. Looking forward!",
            lastMessageDate: new Date(Date.now() - 3600 * 1000 * 24), // 24 hrs ago
            unreadCount: 1,
          },
          {
            id: 4,
            name: "Fitsum Gebre",
            avatar: "https://randomuser.me/api/portraits/men/33.jpg",
            lastMessagePreview: "Checking on product availability.",
            lastMessageDate: new Date(Date.now() - 3600 * 1000 * 48), // 48 hrs ago
            unreadCount: 0,
          },
          {
            id: 5,
            name: "Meseret Haile",
            avatar: "https://randomuser.me/api/portraits/women/70.jpg",
            lastMessagePreview: "Need help with return process.",
            lastMessageDate: new Date(Date.now() - 3600 * 1000 * 72), // 72 hrs ago
            unreadCount: 0,
          },
        ],
        messages: [],
      };
    },
    computed: {
      // Formats dates for better display
      formattedClients() {
        return this.clients.map(client => ({
          ...client,
          lastMessageTimeAgo: this.getTimeAgo(client.lastMessageDate),
          lastMessageDateFormatted: this.formatFullDate(client.lastMessageDate),
        }));
      }
    },
    watch: {
      selectedClient(newClient) {
        if (newClient) {
          this.loadMessages(newClient.id);
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      },
      messages() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
    },
    methods: {
      selectClient(client) {
        this.selectedClient = client;
        // Mark messages as read when client is selected
        const clientIndex = this.clients.findIndex(c => c.id === client.id);
        if (clientIndex !== -1) {
          this.clients[clientIndex].unreadCount = 0;
        }
      },
      clearSelectedClient() {
        this.selectedClient = null;
        this.messages = [];
        this.newMessage = "";
      },
      loadMessages(clientId) {
        // Dummy messages per client - in real app fetch from API
        const dummyMessages = {
          1: [
            {
              text: "Hello Selamawit! How can I assist you today regarding your order?",
              isSender: true,
              time: new Date(Date.now() - 3600 * 1000 * 2),
            },
            {
              text: "Hi! I was wondering if we could schedule a delivery for the upcoming weekend. My order number is #ETB-ORD-12345.",
              isSender: false,
              time: new Date(Date.now() - 3600 * 1000 * 1.5),
            },
            {
              text: "Certainly! Let me check the available slots for you. What days and times work best?",
              isSender: true,
              time: new Date(Date.now() - 3600 * 1000 * 1),
            },
            {
              text: "Saturday afternoon or Sunday morning would be ideal.",
              isSender: false,
              time: new Date(Date.now() - 3600 * 1000 * 0.5),
            },
          ],
          2: [
            {
              text: "Dear Ato Tesfaye, your product shipment has been dispatched. Tracking ID: TRK-98765. Expect delivery within 2-3 business days.",
              isSender: true,
              time: new Date(Date.now() - 3600 * 1000 * 5),
            },
            {
              text: "Thank you for the prompt update! That's excellent news.",
              isSender: false,
              time: new Date(Date.now() - 3600 * 1000 * 4.5),
            },
          ],
          3: [
            {
              text: "W/ro Almaz, your recent payment has been successfully confirmed and processed. Your order is now being prepared for dispatch.",
              isSender: true,
              time: new Date(Date.now() - 3600 * 1000 * 24),
            },
            {
              text: "Wonderful! Thank you so much for the quick confirmation. I'm looking forward to receiving it.",
              isSender: false,
              time: new Date(Date.now() - 3600 * 1000 * 23.5),
            },
          ],
          4: [
            {
              text: "Hello Fitsum, regarding your inquiry about 'Ethiopian Traditional Coffee Beans', we have just restocked. You can find them available now.",
              isSender: true,
              time: new Date(Date.now() - 3600 * 1000 * 48),
            },
            {
              text: "Great! Thanks for the heads up, I'll place an order.",
              isSender: false,
              time: new Date(Date.now() - 3600 * 1000 * 47.5),
            },
          ],
          5: [
            {
              text: "Hi Meseret, I understand you need assistance with a return. Could you please provide your order number and the reason for the return?",
              isSender: true,
              time: new Date(Date.now() - 3600 * 1000 * 72),
            },
            {
              text: "Sure, my order is #ETB-ORD-54321. The item was damaged during shipping.",
              isSender: false,
              time: new Date(Date.now() - 3600 * 1000 * 71.5),
            },
          ],
        };
        // Process messages to add timeAgo and fullDate
        this.messages = (dummyMessages[clientId] || []).map(msg => ({
          ...msg,
          timeAgo: this.getTimeAgo(msg.time),
          fullDate: this.formatFullDate(msg.time),
        }));
      },
      sendMessage() {
        if (!this.newMessage.trim()) return;
  
        const now = new Date();
        this.messages.push({
          text: this.newMessage.trim(),
          isSender: true,
          time: now,
          timeAgo: "Just now", // Will be updated if component re-renders later
          fullDate: this.formatFullDate(now),
        });
        this.newMessage = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      scrollToBottom() {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      },
      getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
  
        let interval = seconds / 31536000;
        if (interval > 1) {
          return Math.floor(interval) + "y ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + "mo ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + "d ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + "h ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + "m ago";
        }
        return "Just now";
      },
      formatFullDate(date) {
        const options = {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour12: true
        };
        return new Date(date).toLocaleString('en-US', options);
      }
    },
    mounted() {
      // Optionally pre-select the first client on mount
      if (this.clients.length > 0) {
        this.selectClient(this.clients[0]);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom Scrollbar Styling (Senior Level Refinement) */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px; /* Wider for better visibility */
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(238, 88, 88, 0.05); /* Very light background for the track */
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(238, 88, 88, 0.6); /* etbuy-red-dark with more opacity */
    border-radius: 4px; /* Rounded thumb */
    border: 1px solid rgba(238, 88, 88, 0.2); /* Subtle border for definition */
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(238, 88, 88, 0.8); /* Darker on hover */
  }
  
  /* Animations for message bubbles */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  /* Base styles for the messages container to allow flex-direction-reverse */
  .flex-col-reverse {
    display: flex;
    flex-direction: column-reverse;
    /* Important: ensures content starts from the bottom */
    justify-content: flex-end;
  }
  </style>
  