<template>
    <div class="min-h-screen bg-etbuy-creamywhite text-etbuy-black font-public-sans px-content-px py-content-py flex justify-center">
    
      <aside class="w-96 bg-etbuy-creamywhite border-r border-etbuy-red-light flex flex-col shadow-inner">
        <header class="px-8 py-5 border-b border-etbuy-red-light flex items-center justify-between bg-etbuy-red-dark text-etbuy-white">
          <h2 class="font-semibold text-2xl tracking-wide flex items-center gap-3">
            <i class="fas fa-comments"></i>Inbox
            <span v-if="totalUnreadCount > 0" class="bg-etbuy-orange text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" aria-label="Total unread messages" title="Total unread messages">
              {{ totalUnreadCount }}
            </span>
          </h2>
          <button class="text-etbuy-white hover:text-etbuy-red-light transition duration-300 focus:outline-none p-2 rounded-full hover:bg-etbuy-white/10" aria-label="New message" title="Compose New Message">
            <i class="fas fa-plus text-lg"></i>
          </button>
        </header>
  
        <div class="flex-1 overflow-y-auto custom-scrollbar pt-2">
          <ul>
            <li v-for="client in clients" :key="client.id" @click="selectClient(client)" :class="[ 'flex items-center gap-4 px-8 py-4 cursor-pointer transition duration-300 transform hover:scale-[1.01] hover:bg-etbuy-red-light/20 border-l-4', selectedClient && selectedClient.id === client.id ? 'bg-etbuy-red-light text-etbuy-white border-etbuy-red-dark shadow-md' : 'text-etbuy-black border-transparent']" role="button" tabindex="0" @keydown.enter="selectClient(client)">
              <div class="relative">
                <img :src="client.avatar" alt="User avatar" class="w-12 h-12 rounded-full object-cover border-2 border-etbuy-red-dark transition-all duration-300" :class="{ 'border-etbuy-white ring-2 ring-etbuy-white/50': selectedClient && selectedClient.id === client.id }" loading="lazy" />
                <span v-if="client.unreadCount > 0" class="absolute -top-1 -right-1 bg-etbuy-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {{ client.unreadCount }}
                </span>
              </div>
              <div class="flex flex-col flex-1 overflow-hidden">
                <p class="font-bold truncate text-base leading-tight" :class="{ 'text-etbuy-white': selectedClient && selectedClient.id === client.id }">
                  {{ client.name }}
                </p>
                <p class="text-xs truncate mt-0.5" :class="{ 'text-etbuy-white/80': selectedClient && selectedClient.id === client.id, 'text-etbuy-red-darken': !(selectedClient && selectedClient.id === client.id) }">
                  {{ client.lastMessagePreview }}
                </p>
              </div>
              <time class="text-xs opacity-70" :class="{ 'text-etbuy-white/70': selectedClient && selectedClient.id === client.id, 'text-etbuy-red-darken': !(selectedClient && selectedClient.id === client.id) }" :title="client.lastMessageDateFormatted">
                {{ client.lastMessageTimeAgo }}
              </time>
            </li>
          </ul>
        </div>
      </aside>
  
    
      <main class="flex-1 flex flex-col bg-etbuy-white">
        <header class="flex items-center justify-between px-8 py-5 border-b border-etbuy-red-light bg-etbuy-creamywhite">
          <div class="flex items-center gap-4">
            <img v-if="selectedClient" :src="selectedClient.avatar" alt="Selected client avatar" class="w-12 h-12 rounded-full object-cover border-2 border-etbuy-red-dark shadow-md" loading="lazy" />
            <div>
              <h3 v-if="selectedClient" class="text-etbuy-red-dark font-bold text-lg leading-snug">
                {{ selectedClient.name }}
              </h3>
              <p v-if="selectedClient && selectedClient.lastMessageTime" class="text-gray-500 text-xs mt-1">
                <span class="text-gray-400 mr-1">●</span>
                Last seen {{ getTimeAgo(selectedClient.lastMessageTime) }}
              </p>
              <p v-if="!selectedClient" class="text-gray-500 italic text-sm">Select a conversation to start messaging</p>
            </div>
          </div>
          <button v-if="selectedClient" class="text-etbuy-red-dark hover:text-etbuy-red-darken focus:outline-none p-2 rounded-full hover:bg-etbuy-red-light/10 transition-colors duration-300" @click="clearSelectedClient" aria-label="Close conversation" title="Close Conversation">
            <i class="fas fa-times text-lg"></i>
          </button>
        </header>
  

<section
  v-if="selectedClient"
  class="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-etbuy-white to-etbuy-creamywhite custom-scrollbar flex flex-col-reverse"
  ref="messagesContainer"
>
  <div class="space-y-4">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="flex items-start max-w-[75%] mb-4"
      :class="msg.isSender ? 'ml-auto flex-row-reverse' : 'mr-auto'"
    >
      
      <img
        v-if="msg.isSender"
        :src="vendorPhotoUrl || '/images/default-vendor-avatar.png'"
        alt="Vendor Avatar"
        class="w-12 h-12 rounded-full object-cover border-2 border-etbuy-red-dark mx-2 flex-shrink-0"
        loading="lazy"
      />
      <img
        v-else
        :src="selectedClient.avatar || '/images/default-client-avatar.png'"
        alt="Client Avatar"
        class="w-12 h-12 rounded-full object-cover border-2 border-etbuy-red-dark mx-2 flex-shrink-0"
        loading="lazy"
      />

      
      <div
        :class="[
          'p-3 rounded-xl shadow-md text-sm leading-relaxed break-words max-w-full',
          msg.isSender
            ? 'bg-etbuy-red-dark text-white rounded-br-none'
            : 'bg-etbuy-white-transparent-light text-etbuy-black rounded-tl-none border border-etbuy-red-light/50'
        ]"
      >
        <p class="whitespace-pre-wrap">{{ msg.text }}</p>
        <time
          class="block text-[10px] mt-1 opacity-70"
          :class="{ 'text-white/70': msg.isSender, 'text-etbuy-red-darken/80': !msg.isSender }"
          :title="msg.fullDate"
        >
          <i class="far fa-clock mr-1"></i>{{ msg.timeAgo }}
        </time>
      </div>
    </div>
  </div>
</section>


  
     
        <footer v-if="selectedClient" class="px-8 py-4 border-t border-etbuy-red-light bg-etbuy-creamywhite flex items-center gap-4 shadow-md">
          <input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Type your message..." class="flex-1 rounded-full border border-etbuy-red-light px-5 py-2.5 text-etbuy-black placeholder-etbuy-gray-placeholder focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300 text-sm" aria-label="Type your message" />
          <button @click="sendMessage" :disabled="!newMessage.trim()" class="bg-gradient-to-r from-etbuy-red-dark to-etbuy-orange text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-paper-plane mr-1"></i>Send
          </button>
        </footer>
  
        <section v-else class="flex-1 flex flex-col items-center justify-center text-gray-500 italic p-8 text-center bg-gradient-to-br from-etbuy-white to-etbuy-creamywhite">
          <i class="fas fa-inbox text-7xl text-etbuy-red-light mb-6 opacity-70"></i>
          <p class="text-2xl font-bold text-etbuy-red-dark mb-2">Welcome to Your Inbox</p>
          <p class="text-base max-w-sm">Select a client from the left panel to view or start a conversation. Your messages appear here.</p>
        </section>
      </main>
    </div>
  </template>
  
  
  <script>
  import {
    fetchUserChatSummaries,
    fetchChatHistoryWithUser,
    replyToUserChat,
    markUserMessagesAsSeen,
    getUnreadMessageCountMap,
  } from '@/api/chat.js';
  
  export default {
    name: "Message",
    data() {
      return {
        selectedClient: null,
        newMessage: "",
        clients: [],
        messages: [],
        loadingClients: false,
        loadingMessages: false,
        errorClients: null,
        errorMessages: null,
        currentVendorId: null, 
        unreadCounts: {},
        vendorPhotoUrl: '',
      };
    },
    computed: {
      formattedClients() {
        return this.clients.map(client => ({
          ...client,
          lastMessageTimeAgo: this.getTimeAgo(client.lastMessageTime || client.lastMessageDate),
          lastMessageDateFormatted: this.formatFullDate(client.lastMessageTime || client.lastMessageDate),
          unreadCount: this.unreadCounts[client.userId] || 0,
        }));
      },
      totalUnreadCount() {
    return Object.values(this.unreadCounts || {}).reduce((acc, count) => acc + count, 0);
  }
    },
    watch: {
      selectedClient(newClient) {
        if (newClient) {
          this.loadMessages(newClient.userId || newClient.id);
        }
      },
      messages() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
    },
    methods: {
      async loadClients() {
        this.loadingClients = true;
        this.errorClients = null;
        try {
          const data = await fetchUserChatSummaries();
          this.clients = data.map(u => ({
            id: u.userId,
            userId: u.userId,
            name: u.fullName,
            avatar: u.profilePhotoUrl,
            lastMessagePreview: u.lastMessage,
            lastMessageTime: u.lastMessageTime ? new Date(u.lastMessageTime) : null,
          }));
  
          await this.loadUnreadCounts();
  
        
          if (this.clients.length > 0) {
            this.selectClient(this.clients[0]);
          }
        } catch (err) {
          this.errorClients = err.message;
        } finally {
          this.loadingClients = false;
        }
      },
      async loadUnreadCounts() {
  try {
    const counts = await getUnreadMessageCountMap();
    this.unreadCounts = counts;
  } catch (err) {
    console.error('Failed to load unread counts:', err);
    this.unreadCounts = {};
  }
},
      async loadMessages(userId) {
        this.loadingMessages = true;
        this.errorMessages = null;
        try {
          const data = await fetchChatHistoryWithUser(userId);
          this.messages = data.map(msg => ({
            id: msg.id,
            text: msg.content,
            isSender: msg.senderId === this.currentVendorId,
            time: new Date(msg.sentAt),
            timeAgo: this.getTimeAgo(new Date(msg.sentAt)),
            fullDate: this.formatFullDate(new Date(msg.sentAt)),
            senderName: msg.senderName,
            seen: msg.seen,
          })).sort((a, b) => a.time - b.time); 
  
          
          await markUserMessagesAsSeen(userId);
          await this.loadUnreadCounts();
          const clientIndex = this.clients.findIndex(c => c.userId === userId);
          if (clientIndex !== -1) {
            this.$set(this.clients[clientIndex], 'unreadCount', 0);
            this.unreadCounts[userId] = 0;
          }
        } catch (err) {
          this.errorMessages = err.message;
          this.messages = [];
        } finally {
          this.loadingMessages = false;
        }
      },
      selectClient(client) {
        this.selectedClient = client;
      },
      clearSelectedClient() {
        this.selectedClient = null;
        this.messages = [];
        this.newMessage = "";
      },
      async sendMessage() {
        if (!this.newMessage.trim() || !this.selectedClient) return;
        try {
          await replyToUserChat(this.selectedClient.userId, this.newMessage.trim());
          this.newMessage = "";
          await this.loadMessages(this.selectedClient.userId);
        } catch (err) {
          alert('Failed to send message: ' + err.message);
        }
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
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
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
    
    this.currentVendorId = 15;
    const vendorSession = localStorage.getItem('vendorSession');
    if (vendorSession) {
      try {
        const vendorData = JSON.parse(vendorSession);
        this.vendorPhotoUrl = vendorData.vendor?.photoUrl || '';
      } catch {
        this.vendorPhotoUrl = '';
      }
    }

    this.loadClients();
  },
  };
  </script>
  
  
  <style scoped>

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px; 
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(238, 88, 88, 0.05); 
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(238, 88, 88, 0.6); 
    border-radius: 4px;
    border: 1px solid rgba(238, 88, 88, 0.2); 
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(238, 88, 88, 0.8);
  }
  

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
  
 
  .flex-col-reverse {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
  </style>
  