<template>
    <div class="membership-requests bg-etbuy-creamywhite text-etbuy-black font-public-sans min-h-screen p-8">
      <main class="max-w-5xl mx-auto bg-etbuy-white-transparent backdrop-blur-lg shadow-etbuy-light rounded-3xl p-10 space-y-8 border border-etbuy-red-light/20">
  
        <!-- Header -->
        <header class="text-center space-y-3 pb-6 border-b border-etbuy-red-light/30">
          <h1 class="text-4xl font-extrabold text-etbuy-red-dark flex items-center justify-center gap-4 select-none">
            <i class="fas fa-user-check text-etbuy-red-darken animate-pulse"></i> Membership Requests
          </h1>
          <p class="text-lg text-etbuy-red-darken max-w-xl mx-auto tracking-wide font-medium">
            Review and manage membership requests efficiently.
          </p>
        </header>
  
        <!-- Status Filter Tabs -->
        <nav class="flex justify-center gap-6 border-b border-etbuy-red-light/30 pb-4">
          <button
            v-for="status in statuses"
            :key="status"
            @click="selectedStatus = status"
            :class="[
              'px-6 py-2 rounded-full font-semibold cursor-pointer transition-colors duration-300',
              selectedStatus === status
                ? 'bg-etbuy-red-dark text-white shadow-etbuy-light-hover scale-105'
                : 'bg-etbuy-white-transparent text-etbuy-red-dark hover:bg-etbuy-red-light hover:text-etbuy-black'
            ]"
            :aria-pressed="selectedStatus === status"
          >
            {{ status }}
            <span v-if="countByStatus(status) > 0" class="ml-2 inline-block bg-etbuy-orange text-white text-xs font-bold rounded-full px-2 py-0.5">
              {{ countByStatus(status) }}
            </span>
          </button>
        </nav>
  
        <!-- Search & Sort -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="relative flex-1">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search requests by name or email..."
              class="w-full pl-12 pr-4 py-3 rounded-full border border-etbuy-red-light bg-etbuy-white-transparent text-etbuy-black placeholder-etbuy-gray-placeholder focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300 shadow-sm"
              aria-label="Search membership requests"
            />
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-etbuy-red-darken text-lg"></i>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-etbuy-red-darken hover:text-etbuy-red-dark transition-colors duration-200"
              aria-label="Clear search"
            >
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
  
          <div class="flex items-center gap-3">
            <label for="sortSelect" class="text-etbuy-red-dark font-semibold select-none">Sort by:</label>
            <select
              id="sortSelect"
              v-model="sortBy"
              class="bg-etbuy-white-transparent-light border border-etbuy-red-light rounded-md px-3 py-2 text-etbuy-black focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300"
              aria-label="Sort membership requests"
            >
              <option value="dateDesc">Newest First</option>
              <option value="dateAsc">Oldest First</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
          </div>
        </div>
  
        <!-- Requests List -->
        <section>
          <div v-if="filteredRequests.length" class="space-y-6">
            <article
              v-for="request in filteredRequests"
              :key="request.id"
              class="request-card relative p-6 rounded-2xl border border-etbuy-red-darken bg-etbuy-white-transparent shadow-md backdrop-blur-sm hover:shadow-etbuy-light-hover transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01]"
            >
              <!-- Status Badge -->
              <span
                class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider select-none"
                :class="{
                  'bg-etbuy-orange text-white': request.status === 'PENDING',
                  'bg-etbuy-green-600 text-white': request.status === 'APPROVED',
                  'bg-etbuy-red-dark text-white': request.status === 'REJECTED',
                }"
              >
                {{ request.status }}
              </span>
  
              <div class="flex items-center gap-5">
                <img
                  :src="request.avatar"
                  :alt="request.name"
                  class="w-20 h-20 rounded-full object-cover border-4 border-etbuy-red-light shadow-lg transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div class="flex-1 space-y-1">
                  <h3 class="text-xl font-bold text-etbuy-black truncate" :title="request.name">{{ request.name }}</h3>
                  <p class="text-etbuy-red-darken font-semibold truncate" :title="request.email">{{ request.email }}</p>
                  <p class="text-sm text-gray-700 leading-snug line-clamp-2" :title="request.message">{{ request.message }}</p>
                  <p class="text-xs text-etbuy-red-darken mt-1">
                    Requested on: <time :datetime="request.requestDate">{{ formatDate(request.requestDate) }}</time>
                  </p>
                </div>
              </div>
  
              <!-- Action Buttons -->
             <!-- Action Buttons -->
<div class="mt-5 flex justify-end gap-3 border-t border-etbuy-red-light/30 pt-4">
    <button
      v-if="request.status === 'PENDING'"
      @click="updateStatus(request.id, 'APPROVED')"
      class="px-5 py-2 rounded-full bg-green-600 text-white font-semibold text-sm shadow-md 
             hover:bg-green-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <i class="fas fa-check mr-2"></i>Approve
    </button>
  
    <button
      v-if="request.status === 'PENDING'"
      @click="updateStatus(request.id, 'REJECTED')"
      class="px-5 py-2 rounded-full border border-etbuy-red-dark text-etbuy-red-dark font-semibold text-sm 
             bg-white hover:bg-etbuy-red-light hover:text-etbuy-black transition-all duration-300 transform hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:ring-offset-2"
    >
      <i class="fas fa-times mr-2"></i>Reject
    </button>
  
    <button
      v-if="request.status !== 'PENDING'"
      @click="viewDetails(request)"
      class="px-5 py-2 rounded-full border border-etbuy-red-dark text-etbuy-red-dark font-semibold text-sm 
             bg-white hover:bg-etbuy-red-light hover:text-etbuy-black transition-all duration-300 transform hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:ring-offset-2"
    >
      <i class="fas fa-info-circle mr-2"></i>Details
    </button>
  </div>
  
            </article>
          </div>
  
          <div v-else class="text-center py-16">
            <i class="fas fa-folder-open text-7xl text-etbuy-red-darken mb-6 opacity-70"></i>
            <p class="text-xl font-medium text-etbuy-red-dark">No membership requests found.</p>
            <p class="text-md text-etbuy-red-darken mt-2">Try changing your filters or search terms.</p>
          </div>
        </section>
  
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MembershipRequest',
    data() {
      return {
        statuses: ['PENDING', 'APPROVED', 'REJECTED'],
        selectedStatus: 'PENDING',
        searchQuery: '',
        sortBy: 'dateDesc',
        requests: [
          {
            id: 1,
            name: 'Alemu Tadesse',
            email: 'alemu@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            message: 'I would love to join your community to support local businesses.',
            requestDate: '2024-06-10T09:30:00Z',
            status: 'PENDING',
          },
          {
            id: 2,
            name: 'Marta Alemu',
            email: 'marta@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            message: 'Looking forward to contributing and learning from this group.',
            requestDate: '2024-05-22T14:15:00Z',
            status: 'APPROVED',
          },
          {
            id: 3,
            name: 'Tesfaye Bekele',
            email: 'tesfaye@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
            message: 'Please consider my request to join, I am passionate about local crafts.',
            requestDate: '2024-06-08T11:00:00Z',
            status: 'REJECTED',
          },
          {
            id: 4,
            name: 'Selamawit Kebede',
            email: 'selamawit@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            message: 'Excited to connect with like-minded entrepreneurs.',
            requestDate: '2024-06-11T16:45:00Z',
            status: 'PENDING',
          },
          {
            id: 5,
            name: 'Daniel Lemma',
            email: 'daniel@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
            message: 'Happy to be a part of this amazing community.',
            requestDate: '2024-05-30T10:20:00Z',
            status: 'APPROVED',
          },
        ],
      };
    },
    computed: {
      filteredRequests() {
        let filtered = this.requests.filter(
          (req) => req.status === this.selectedStatus
        );
  
        if (this.searchQuery) {
          const q = this.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (req) =>
              req.name.toLowerCase().includes(q) ||
              req.email.toLowerCase().includes(q) ||
              req.message.toLowerCase().includes(q)
          );
        }
  
        switch (this.sortBy) {
          case 'dateAsc':
            filtered.sort(
              (a, b) => new Date(a.requestDate) - new Date(b.requestDate)
            );
            break;
          case 'dateDesc':
            filtered.sort(
              (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
            );
            break;
          case 'nameAsc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'nameDesc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        }
  
        return filtered;
      },
    },
    methods: {

        countByStatus(status) {
    return this.requests.filter(req => req.status === status).length;
  },
      updateStatus(id, newStatus) {
        const idx = this.requests.findIndex((r) => r.id === id);
        if (idx !== -1) {
          this.requests[idx].status = newStatus;
          this.$nextTick(() => {
            this.$toast && this.$toast.success(`Request ${newStatus.toLowerCase()}!`);
          });
        }
      },
      viewDetails(request) {
        alert(
          `Request Details:\n\nName: ${request.name}\nEmail: ${request.email}\nMessage: ${request.message}\nStatus: ${request.status}\nRequested On: ${this.formatDate(
            request.requestDate
          )}`
        );
      },
      formatDate(dateStr) {
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        return new Date(dateStr).toLocaleString('en-US', options);
      },
    },
  };
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .request-card:hover {
    box-shadow: 0 12px 24px rgba(238, 88, 88, 0.25);
  }
  
  .request-card {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  
  .request-card:hover {
    transform: translateY(-6px) scale(1.02);
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(238, 88, 88, 0.05);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(238, 88, 88, 0.6);
    border-radius: 4px;
    border: 1px solid rgba(238, 88, 88, 0.2);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(238, 88, 88, 0.8);
  }
  </style>
  