<template>
    <div class="follower-dashboard bg-etbuy-creamywhite text-etbuy-black font-public-sans min-h-screen p-8">
      <main
        class="max-w-4xl mx-auto bg-etbuy-white-transparent backdrop-blur-lg shadow-etbuy-light rounded-3xl p-10 space-y-8 border border-etbuy-red-light/20"
        role="main"
        aria-label="Follower Dashboard"
      >
        <!-- Header Section -->
        <header class="text-center space-y-3 pb-6 border-b border-etbuy-red-light/30">
          <h1
            class="text-4xl font-extrabold text-etbuy-red-dark flex items-center justify-center gap-4 select-none"
            aria-live="polite"
          >
            <i class="fas fa-users text-etbuy-red-darken animate-pulse" aria-hidden="true"></i>
            Your Community
          </h1>
          <p class="text-lg text-etbuy-red-darken max-w-xl mx-auto tracking-wide font-medium">
            Manage and connect with your valuable followers.
          </p>
        </header>
  
        <!-- Followers List Section -->
        <section class="space-y-6" aria-label="Followers List">
          <h2
            class="text-2xl font-bold text-etbuy-black flex items-center gap-3"
            id="followers-heading"
          >
            <i class="fas fa-user-friends text-etbuy-orange" aria-hidden="true"></i>
            Followers ({{ filteredFollowers.length }})
            <span class="text-sm text-etbuy-red-darken ml-auto flex items-center gap-2">
              <i class="fas fa-sort text-etbuy-red-dark" aria-hidden="true"></i>
              <label for="sort-select" class="sr-only">Sort followers by</label>
              <select
                id="sort-select"
                v-model="sortBy"
                class="bg-etbuy-white-transparent-light border border-etbuy-red-light rounded-md px-3 py-1 text-etbuy-black focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300"
              >
                <option value="name">Name (A-Z)</option>
                <option value="recent">Most Recent</option>
              </select>
            </span>
          </h2>
  
          <!-- Search Input -->
          <div class="relative flex items-center">
            <label for="search-input" class="sr-only">Search followers</label>
            <input
              id="search-input"
              type="search"
              v-model="searchQuery"
              placeholder="Search followers by name, location, bio, or interests..."
              class="w-full pl-12 pr-10 py-3 rounded-full border border-etbuy-red-light bg-etbuy-white-transparent text-etbuy-black placeholder-etbuy-gray-placeholder focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300 shadow-sm"
              autocomplete="off"
              aria-describedby="search-desc"
            />
            <i class="fas fa-search absolute left-4 text-etbuy-red-darken text-lg pointer-events-none" aria-hidden="true"></i>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-4 text-etbuy-red-darken hover:text-etbuy-red-dark transition-colors duration-200"
              aria-label="Clear search input"
            >
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <p id="search-desc" class="sr-only">Filter followers by name, location, bio, or interests</p>
  
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-10 text-etbuy-red-darken" role="status" aria-live="polite">
            <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
            <p>Loading followers...</p>
          </div>
  
          <!-- Error State -->
          <div v-else-if="error" class="text-center py-10 text-etbuy-red-dark" role="alert">
            <i class="fas fa-exclamation-triangle text-6xl mb-6 opacity-70"></i>
            <p class="text-xl font-medium">Failed to load followers.</p>
            <p class="text-md mt-2">{{ error }}</p>
            <button
              @click="fetchFollowersData"
              class="mt-4 px-6 py-2 bg-etbuy-red-dark text-white rounded-full hover:bg-etbuy-orange transition duration-300 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark"
            >
              Retry
            </button>
          </div>
  
          <!-- Followers Grid -->
          <div v-else-if="filteredFollowers.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6" aria-live="polite" aria-atomic="true" aria-relevant="additions removals">
            <article
              v-for="follower in filteredFollowers"
              :key="follower.id"
              class="follower-card relative p-6 rounded-2xl border border-etbuy-red-darken bg-etbuy-white-transparent shadow-md backdrop-blur-sm hover:shadow-etbuy-light-hover transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01]"
              tabindex="0"
              :aria-label="`Follower ${follower.name} from ${follower.location}`"
            >
              <!-- Decorative corner elements -->
              <span class="absolute top-0 left-0 w-3 h-3 bg-etbuy-orange rounded-br-lg opacity-70"></span>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-etbuy-red-dark rounded-tl-lg opacity-70"></span>
  
              <div class="flex items-start gap-4">
                <div class="relative flex-shrink-0">
                  <img
                    :src="follower.avatar"
                    :alt="`Profile photo of ${follower.name}`"
                    class="w-20 h-20 rounded-full object-cover border-4 border-etbuy-red-light shadow-lg transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    v-if="follower.isOnline"
                    class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"
                    title="Online"
                    aria-label="Online"
                  ></span>
                </div>
  
                <div class="flex-1 space-y-1">
                  <h3 class="text-xl font-bold text-etbuy-black flex items-center">
                    {{ follower.name }}
                    <span class="text-sm text-etbuy-red-darken ml-2 italic" v-if="follower.isNew">
                      <i class="fas fa-star text-etbuy-orange mr-1" aria-hidden="true"></i>New!
                    </span>
                  </h3>
                  <p class="text-sm text-etbuy-red-darken flex items-center gap-2">
                    <i class="fas fa-map-marker-alt text-etbuy-orange" aria-hidden="true"></i>{{ follower.location }}
                  </p>
                  <p class="text-sm text-gray-700 leading-tight line-clamp-2" v-if="follower.bio">
                    <i class="fas fa-info-circle text-etbuy-red-dark mr-1" aria-hidden="true"></i>{{ follower.bio }}
                  </p>
                </div>
              </div>
            </article>
          </div>
  
          <!-- No Followers Found -->
          <div v-else class="text-center py-10" role="status" aria-live="polite">
            <i class="fas fa-sad-tear text-6xl text-etbuy-red-darken mb-6 opacity-70" aria-hidden="true"></i>
            <p class="text-xl font-medium text-etbuy-red-dark">No followers found matching your criteria.</p>
            <p class="text-md text-etbuy-red-darken mt-2">Try adjusting your search or sort options.</p>
          </div>
        </section>
  
        <!-- Engagement Insights -->
        <section class="space-y-6 pt-6 border-t border-etbuy-red-light/30" aria-label="Engagement Insights">
          <h2 class="text-2xl font-bold text-etbuy-black flex items-center gap-3">
            <i class="fas fa-chart-line text-etbuy-blue" aria-hidden="true"></i> Engagement Insights
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-2xl border border-etbuy-blue/30 bg-etbuy-white-transparent shadow-md backdrop-blur-sm">
              <h3 class="font-semibold text-etbuy-blue text-lg mb-3 flex items-center gap-2">
                <i class="fas fa-users-cog" aria-hidden="true"></i> Total Followers
              </h3>
              <p class="text-4xl font-extrabold text-etbuy-black">{{ totalFollowers }}</p>
              <p class="text-sm text-etbuy-blue/80 mt-2">Overall community size.</p>
            </div>
            <div class="p-6 rounded-2xl border border-etbuy-orange/30 bg-etbuy-white-transparent shadow-md backdrop-blur-sm">
              <h3 class="font-semibold text-etbuy-orange text-lg mb-3 flex items-center gap-2">
                <i class="fas fa-fire" aria-hidden="true"></i> Monthly Growth
              </h3>
              <p class="text-4xl font-extrabold text-etbuy-black text-green-600">+{{ monthlyGrowth }}%</p>
              <p class="text-sm text-etbuy-orange/80 mt-2">Compared to previous month.</p>
            </div>
          </div>
        </section>
  
        <!-- Share Profile Button -->
        <section class="text-center pt-8 border-t border-etbuy-red-light/30">
          <button
            @click="shareProfile"
            class="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-gradient-to-r from-etbuy-red-dark to-etbuy-orange text-white font-semibold text-lg shadow-etbuy-button hover:shadow-etbuy-light-hover transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-etbuy-orange"
            aria-label="Share your profile"
          >
            <i class="fas fa-share-alt" aria-hidden="true"></i> Share Your Profile
          </button>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import { fetchFollowers, searchFollowers } from '@/api/follow';
  
  export default {
    name: 'Follower',
    data() {
      return {
        followers: [],
        searchQuery: '',
        sortBy: 'name',
        totalFollowers: 0,
        monthlyGrowth: 0,
        loading: false,
        error: null,
        debounceTimeout: null,
      };
    },
    watch: {
      searchQuery(newQuery) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          if (newQuery && newQuery.trim() !== '') {
            this.searchFollowersData(newQuery);
          } else {
            this.fetchFollowersData();
          }
        }, 400);
      }
    },
    computed: {
      filteredFollowers() {
        let tempFollowers = [...this.followers];
  
        // Filter by search query (additional filtering if needed)
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          tempFollowers = tempFollowers.filter(follower =>
            follower.name.toLowerCase().includes(query) ||
            follower.location.toLowerCase().includes(query) ||
            (follower.bio && follower.bio.toLowerCase().includes(query)) ||
            (follower.interests && follower.interests.some(i => i.toLowerCase().includes(query)))
          );
        }
  
        // Sort followers
        if (this.sortBy === 'name') {
          tempFollowers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortBy === 'recent') {
          // Assuming followers have followedDate property
          tempFollowers.sort((a, b) => b.followedDate - a.followedDate);
        }
  
        return tempFollowers;
      }
    },
    methods: {
      async fetchFollowersData() {
        this.loading = true;
        this.error = null;
        try {
          const data = await fetchFollowers();
          this.followers = this.mapFollowers(data);
          this.totalFollowers = this.followers.length;
          this.monthlyGrowth = 0; // Update with real data if available
        } catch (err) {
          this.error = err.message || 'Failed to fetch followers.';
        } finally {
          this.loading = false;
        }
      },
  
      async searchFollowersData(query) {
        this.loading = true;
        this.error = null;
        try {
          const data = await searchFollowers(query);
          this.followers = this.mapFollowers(data);
        } catch (err) {
          this.error = err.message || 'Search failed.';
        } finally {
          this.loading = false;
        }
      },
  
      mapFollowers(data) {
        return data.map(user => ({
          id: user.id,
          name: user.fullName,
          avatar: user.profilePhotoUrl || 'https://via.placeholder.com/150',
          location: user.billingAddress || 'Unknown',
          bio: `Email: ${user.email}`,
          followersCount: 0,
          engagementScore: 0,
          isOnline: false,
          isNew: false,
          followedDate: new Date(),
          interests: [],
        }));
      },
  
      messageFollower(follower) {
        alert(`Opening chat with ${follower.name}`);
      },
  
      shareProfile() {
        alert('Your profile link has been copied to clipboard!');
      }
    },
    mounted() {
      this.fetchFollowersData();
    }
  };
  </script>
  

  
  <style scoped>
  
  .follower-card:focus {
    outline: 3px solid #f97316;
    outline-offset: 2px;
  }
  

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  