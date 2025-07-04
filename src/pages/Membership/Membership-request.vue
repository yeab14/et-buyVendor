<template>
    <div class="follower-dashboard bg-etbuy-creamywhite text-etbuy-black font-public-sans min-h-screen p-8">
      <main
        class="max-w-4xl mx-auto bg-etbuy-white-transparent backdrop-blur-lg shadow-etbuy-light rounded-3xl p-10 space-y-8 border border-etbuy-red-light/20"
        role="main"
        aria-label="Membership Requests Dashboard"
      >
        <!-- Header -->
        <header class="text-center space-y-3 pb-6 border-b border-etbuy-red-light/30">
          <h1
            class="text-4xl font-extrabold text-etbuy-red-dark flex items-center justify-center gap-4 select-none"
            aria-live="polite"
          >
            <i class="fas fa-user-check text-etbuy-red-darken animate-pulse" aria-hidden="true"></i>
            Membership Requests
          </h1>
          <p class="text-lg text-etbuy-red-darken max-w-xl mx-auto tracking-wide font-medium">
            Review and manage membership requests efficiently.
          </p>
        </header>
  
        <!-- Status Filter Tabs -->
        <nav
          class="flex justify-center gap-6 border-b border-etbuy-red-light/30 pb-4 mt-4"
          role="tablist"
          aria-label="Filter membership requests by status"
        >
          <button
            v-for="status in statuses"
            :key="status"
            @click="onStatusChange(status)"
            :class="[
              'px-6 py-2 rounded-full font-semibold cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark',
              selectedStatus === status
                ? 'bg-etbuy-red-dark text-white shadow-etbuy-light-hover scale-105'
                : 'bg-etbuy-white-transparent text-etbuy-red-dark hover:bg-etbuy-red-light hover:text-etbuy-black'
            ]"
            :aria-selected="selectedStatus === status ? 'true' : 'false'"
            role="tab"
            :tabindex="selectedStatus === status ? 0 : -1"
          >
            {{ status }}
            <span
              v-if="countByStatus(status) > 0"
              class="ml-2 inline-block bg-etbuy-orange text-white text-xs font-bold rounded-full px-2 py-0.5 select-none"
              aria-label="Number of requests"
            >
              {{ countByStatus(status) }}
            </span>
          </button>
        </nav>
  
        <!-- Search & Sort Controls -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 mb-10">
          <div class="relative flex-1">
            <label for="searchInput" class="sr-only">Search membership requests</label>
            <input
              id="searchInput"
              type="search"
              v-model="searchQuery"
              @input="onSearchInput"
              placeholder="Search requests by name or email..."
              class="w-full pl-12 pr-10 py-3 rounded-full border border-etbuy-red-light bg-etbuy-white-transparent text-etbuy-black placeholder-etbuy-gray-placeholder focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300 shadow-sm"
              autocomplete="off"
              aria-describedby="searchHelp"
            />
            <i
              class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-etbuy-red-darken text-lg pointer-events-none"
              aria-hidden="true"
            ></i>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-etbuy-red-darken hover:text-etbuy-red-dark transition-colors duration-200 focus:outline-none"
              aria-label="Clear search input"
            >
              <i class="fas fa-times-circle"></i>
            </button>
            <p id="searchHelp" class="sr-only">
              Filter membership requests by user full name, email, or message content.
            </p>
          </div>
  
          <div class="flex items-center gap-3">
            <i class="fas fa-sort text-etbuy-red-dark" aria-hidden="true"></i>
            <label for="sort-select" class="sr-only">Sort Membership Requests by</label>
            <select
              id="sort-select"
              v-model="sortBy"
              @change="onSortChange"
              class="bg-etbuy-white-transparent-light border border-etbuy-red-light rounded-md px-3 py-1 text-etbuy-black focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300"
            >
              <option value="dateDesc">Most Recent</option>
              <option value="nameAsc">Name (A-Z)</option>
            </select>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20 text-etbuy-red-darken" role="status" aria-live="polite">
          <i class="fas fa-spinner fa-spin text-5xl mb-6"></i>
          <p class="text-lg font-semibold">Loading membership requests...</p>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20 text-etbuy-red-dark" role="alert">
          <i class="fas fa-exclamation-triangle text-6xl mb-6 opacity-70"></i>
          <p class="text-xl font-semibold mb-2">Failed to load membership requests.</p>
          <p class="mb-6">{{ error }}</p>
          <button
            @click="loadRequests"
            class="inline-block px-6 py-3 bg-etbuy-red-dark text-white rounded-full font-semibold shadow-md hover:bg-etbuy-orange transition-colors focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark"
            aria-label="Retry loading membership requests"
          >
            Retry
          </button>
        </div>
  
        <!-- Requests List -->
        <section v-else>
          <div v-if="filteredRequests.length" class="space-y-6" role="list" aria-label="Filtered membership requests">
            <article
              v-for="request in filteredRequests"
              :key="request.id"
              class="request-card relative p-6 rounded-2xl border border-etbuy-red-darken bg-etbuy-white-transparent shadow-md backdrop-blur-sm hover:shadow-etbuy-light-hover transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01]"
              role="listitem"
              tabindex="0"
              :aria-label="`Membership request from ${request.userFullName}, status: ${request.status}`"
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
                  :src="request.userAvatar"
                  :alt="`Profile picture of ${request.userFullName}`"
                  class="w-20 h-20 rounded-full object-cover border-4 border-etbuy-red-light shadow-lg transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div class="flex-1 space-y-1">
                  <h3 class="text-xl font-bold text-etbuy-black truncate" :title="request.userFullName">
                    {{ request.userFullName }}
                  </h3>
                  <p class="text-etbuy-red-darken font-semibold truncate" :title="request.userEmail">
                    {{ request.userEmail }}
                  </p>
                  <p class="text-sm text-gray-700 leading-snug line-clamp-2" :title="request.userBillingAddress">
                    {{ request.userBillingAddress }}
                  </p>
                  <p class="text-xs text-etbuy-red-darken mt-1">
                    Requested on:
                    <time :datetime="request.createdAt">{{ formatDate(request.createdAt) }}</time>
                  </p>
                </div>
              </div>
  
              <!-- Action Buttons -->
              <div
                class="mt-5 flex justify-end gap-3 border-t border-etbuy-red-light/30 pt-4"
                role="group"
                :aria-label="`Actions for request from ${request.userFullName}`"
              >
                <button
                  v-if="request.status === 'PENDING'"
                  @click="updateStatus(request.id, 'APPROVED')"
                  class="px-5 py-2 rounded-full bg-green-600 text-white font-semibold text-sm shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  :aria-label="`Approve membership request from ${request.userFullName}`"
                >
                  <i class="fas fa-check mr-2"></i>Approve
                </button>
  
                <button
                  v-if="request.status === 'PENDING'"
                  @click="updateStatus(request.id, 'REJECTED')"
                  class="px-5 py-2 rounded-full border border-etbuy-red-dark text-etbuy-red-dark font-semibold text-sm bg-white hover:bg-etbuy-red-light hover:text-etbuy-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:ring-offset-2"
                  :aria-label="`Reject membership request from ${request.userFullName}`"
                >
                  <i class="fas fa-times mr-2"></i>Reject
                </button>
  
                <button
                  v-if="request.status !== 'PENDING'"
                  @click="viewDetails(request)"
                  class="px-5 py-2 rounded-full border border-etbuy-red-dark text-etbuy-red-dark font-semibold text-sm bg-white hover:bg-etbuy-red-light hover:text-etbuy-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:ring-offset-2"
                  :aria-label="`View details of membership request from ${request.userFullName}`"
                >
                  <i class="fas fa-info-circle mr-2"></i>Details
                </button>
              </div>
            </article>
          </div>
  
          <div v-else class="text-center py-20 text-etbuy-red-darken" role="status" aria-live="polite">
            <i class="fas fa-folder-open text-7xl mb-6 opacity-70" aria-hidden="true"></i>
            <p class="text-xl font-medium">No membership requests found.</p>
            <p class="text-md mt-2">Try changing your filters or search terms.</p>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import {
    fetchMembershipRequests,
    approveMembershipRequest,
    rejectMembershipRequest,
  } from '@/api/membershipRequest.js';
  
  export default {
    name: 'MembershipRequest',
    data() {
      return {
        statuses: ['PENDING', 'APPROVED', 'REJECTED'],
        selectedStatus: 'PENDING',
        searchQuery: '',
        sortBy: 'dateDesc',
        requests: [],
        loading: false,
        error: null,
        currentPage: 0,
        pageSize: 10,
        totalElements: 0,
        debounceTimeout: null,
      };
    },
    computed: {
      filteredRequests() {
        // Since backend handles filtering, sorting, and pagination,
        // this can just return the current page of requests.
        return this.requests;
      },
    },
    methods: {
      async loadRequests() {
        this.loading = true;
        this.error = null;
        try {
          const data = await fetchMembershipRequests({
            searchTerm: this.searchQuery,
            status: this.selectedStatus,
            sortBy: this.sortBy,
            page: this.currentPage,
            size: this.pageSize,
          });
  
          this.requests = data.content.map(req => {
            const user = req.user || {};
            return {
              id: req.id,
              status: req.status,
              message: req.message || '',
              createdAt: req.createdAt,
              userFullName: user.fullName || `User ${user.id}`,
              userEmail: user.email || `user${user.id}@example.com`,
              userBillingAddress: user.billingAddress || `Addis Ababa, Ethiopia`,
              userAvatar: user.profilePhotoUrl || '/images/default-profile.svg',
            };
          });
          this.totalElements = data.totalElements;
        } catch (err) {
          this.error = err.message || 'Failed to load membership requests.';
        } finally {
          this.loading = false;
        }
      },
  
      onStatusChange(status) {
        this.selectedStatus = status;
        this.currentPage = 0;
        this.loadRequests();
      },
  
      onSortChange() {
        this.currentPage = 0;
        this.loadRequests();
      },
  
      onSearchInput() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.currentPage = 0;
          this.loadRequests();
        }, 400);
      },
  
      clearSearch() {
        this.searchQuery = '';
        this.loadRequests();
      },
  
      async updateStatus(id, newStatus) {
        try {
          if (newStatus === 'APPROVED') {
            await approveMembershipRequest(id);
          } else if (newStatus === 'REJECTED') {
            await rejectMembershipRequest(id);
          }
          this.$toast && this.$toast.success(`Request ${newStatus.toLowerCase()}!`);
          this.loadRequests(); 
        } catch (err) {
          this.$toast && this.$toast.error(err.message || 'Failed to update request status.');
        }
      },
  
      viewDetails(request) {
        alert(
          `Request Details:\n\nName: ${request.userFullName}\nEmail: ${request.userEmail}\nMessage: ${request.message}\nStatus: ${request.status}\nRequested On: ${this.formatDate(
            request.createdAt
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
  
      countByStatus(status) {
        return this.requests.filter(req => req.status === status).length;
      },
    },
    mounted() {
      this.loadRequests();
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
  