<template>
    <div class="follower-dashboard bg-etbuy-creamywhite text-etbuy-black font-public-sans min-h-screen p-8">
      <main class="max-w-4xl mx-auto bg-etbuy-white-transparent backdrop-blur-lg shadow-etbuy-light rounded-3xl p-10 space-y-8 border border-etbuy-red-light/20">
  
        <!-- Header Section -->
        <header class="text-center space-y-3 pb-6 border-b border-etbuy-red-light/30">
          <h1 class="text-4xl font-extrabold text-etbuy-red-dark flex items-center justify-center gap-4 select-none">
            <i class="fas fa-users text-etbuy-red-darken animate-pulse"></i> Your Community
          </h1>
          <p class="text-lg text-etbuy-red-darken max-w-xl mx-auto tracking-wide font-medium">
            Manage and connect with your valuable followers.
          </p>
        </header>
  
        <!-- Followers List Section -->
        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-etbuy-black flex items-center gap-3">
            <i class="fas fa-user-friends text-etbuy-orange"></i> Followers ({{ filteredFollowers.length }})
            <span class="text-sm text-etbuy-red-darken ml-auto flex items-center gap-2">
              <i class="fas fa-sort text-etbuy-red-dark"></i> Sort by:
              <select v-model="sortBy" class="bg-etbuy-white-transparent-light border border-etbuy-red-light rounded-md px-3 py-1 text-etbuy-black focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300">
                <option value="name">Name (A-Z)</option>
                <option value="recent">Most Recent</option>
                <option value="activity">Activity (High-Low)</option>
              </select>
            </span>
          </h2>
  
          <!-- Search Input -->
          <div class="relative flex items-center">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search followers by name or interest..."
              class="w-full pl-12 pr-4 py-3 rounded-full border border-etbuy-red-light bg-etbuy-white-transparent text-etbuy-black placeholder-etbuy-gray-placeholder focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark transition-all duration-300 shadow-sm"
            />
            <i class="fas fa-search absolute left-4 text-etbuy-red-darken text-lg"></i>
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 text-etbuy-red-darken hover:text-etbuy-red-dark transition-colors duration-200">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
  
          <div v-if="filteredFollowers.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article
              v-for="follower in filteredFollowers"
              :key="follower.id"
              class="follower-card relative p-6 rounded-2xl border border-etbuy-red-darken bg-etbuy-white-transparent shadow-md backdrop-blur-sm hover:shadow-etbuy-light-hover transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01]"
            >
              <!-- Decorative corner elements -->
              <span class="absolute top-0 left-0 w-3 h-3 bg-etbuy-orange rounded-br-lg opacity-70"></span>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-etbuy-red-dark rounded-tl-lg opacity-70"></span>
  
              <div class="flex items-start gap-4">
                <div class="relative flex-shrink-0">
                  <img
                    :src="follower.avatar"
                    :alt="follower.name"
                    class="w-20 h-20 rounded-full object-cover border-4 border-etbuy-red-light shadow-lg transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <span v-if="follower.isOnline" class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" title="Online"></span>
                </div>
  
                <div class="flex-1 space-y-1">
                  <h3 class="text-xl font-bold text-etbuy-black flex items-center">
                    {{ follower.name }}
                    <span class="text-sm text-etbuy-red-darken ml-2 italic" v-if="follower.isNew"><i class="fas fa-star text-etbuy-orange mr-1"></i>New!</span>
                  </h3>
                  <p class="text-sm text-etbuy-red-darken flex items-center gap-2">
                    <i class="fas fa-map-marker-alt text-etbuy-orange"></i>{{ follower.location }}
                  </p>
                  <p class="text-sm text-gray-700 leading-tight line-clamp-2">
                    <i class="fas fa-tag text-etbuy-red-dark mr-1"></i>{{ follower.bio }}
                  </p>
                  <div class="flex items-center gap-4 text-sm text-etbuy-black pt-2">
                    <span class="flex items-center gap-1">
                      <i class="fas fa-user-plus text-etbuy-red-dark"></i> {{ follower.followersCount }}
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="fas fa-heart text-etbuy-orange"></i> {{ follower.engagementScore }}
                    </span>
                  </div>
                </div>
              </div>
  
              <div class="mt-5 flex justify-end gap-3 border-t border-etbuy-red-light/30 pt-4">
                <button
                  @click="viewProfile(follower)"
                  class="px-5 py-2 rounded-full bg-etbuy-red-dark text-white font-semibold text-sm shadow-md hover:bg-etbuy-orange transition-all duration-300 transform hover:scale-105"
                >
                  <i class="fas fa-eye mr-2"></i>View Profile
                </button>
                <button
                  @click="messageFollower(follower)"
                  class="px-5 py-2 rounded-full border border-etbuy-red-dark text-etbuy-red-dark font-semibold text-sm hover:bg-etbuy-red-light hover:text-etbuy-black transition-all duration-300 transform hover:scale-105"
                >
                  <i class="fas fa-envelope mr-2"></i>Message
                </button>
              </div>
            </article>
          </div>
          <div v-else class="text-center py-10">
            <i class="fas fa-sad-tear text-6xl text-etbuy-red-darken mb-6 opacity-70"></i>
            <p class="text-xl font-medium text-etbuy-red-dark">No followers found matching your criteria.</p>
            <p class="text-md text-etbuy-red-darken mt-2">Try adjusting your search or sort options.</p>
          </div>
        </section>
  
        <!-- Engagement Insights (New Section) -->
        <section class="space-y-6 pt-6 border-t border-etbuy-red-light/30">
          <h2 class="text-2xl font-bold text-etbuy-black flex items-center gap-3">
            <i class="fas fa-chart-line text-etbuy-blue"></i> Engagement Insights
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-2xl border border-etbuy-blue/30 bg-etbuy-white-transparent shadow-md backdrop-blur-sm">
              <h3 class="font-semibold text-etbuy-blue text-lg mb-3 flex items-center gap-2">
                <i class="fas fa-users-cog"></i> Total Followers
              </h3>
              <p class="text-4xl font-extrabold text-etbuy-black">{{ totalFollowers }}</p>
              <p class="text-sm text-etbuy-blue/80 mt-2">Overall community size.</p>
            </div>
            <div class="p-6 rounded-2xl border border-etbuy-orange/30 bg-etbuy-white-transparent shadow-md backdrop-blur-sm">
              <h3 class="font-semibold text-etbuy-orange text-lg mb-3 flex items-center gap-2">
                <i class="fas fa-fire"></i> Monthly Growth
              </h3>
              <p class="text-4xl font-extrabold text-etbuy-black text-green-600">+{{ monthlyGrowth }}%</p>
              <p class="text-sm text-etbuy-orange/80 mt-2">Compared to previous month.</p>
            </div>
          </div>
        </section>
  
        <!-- Call to Action -->
        <section class="text-center pt-8 border-t border-etbuy-red-light/30">
          <button
            @click="shareProfile"
            class="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-gradient-to-r from-etbuy-red-dark to-etbuy-orange text-white font-semibold text-lg shadow-etbuy-button hover:shadow-etbuy-light-hover transition-all duration-500 transform hover:scale-105"
          >
            <i class="fas fa-share-alt"></i> Share Your Profile
          </button>
        </section>
  
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Follower', // Component name
    data() {
      return {
        followers: [
          {
            id: 1,
            name: 'Sarah Getachew',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            location: 'Addis Ababa',
            bio: 'Passionate about Ethiopian crafts and sustainable fashion. Entrepreneur.',
            followersCount: 1200,
            engagementScore: 85,
            isOnline: true,
            isNew: true,
            followedDate: new Date('2024-03-20T10:00:00Z'),
            interests: ['crafts', 'fashion', 'sustainability']
          },
          {
            id: 2,
            name: 'Daniel Kebede',
            avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
            location: 'Adama',
            bio: 'Tech enthusiast and supporter of local businesses. Freelance developer.',
            followersCount: 850,
            engagementScore: 78,
            isOnline: false,
            isNew: false,
            followedDate: new Date('2024-03-15T14:30:00Z'),
            interests: ['tech', 'local business', 'development']
          },
          {
            id: 3,
            name: 'Marta Alemayehu',
            avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
            location: 'Hawassa',
            bio: 'Food blogger exploring Ethiopian culinary traditions. Travel addict.',
            followersCount: 1500,
            engagementScore: 92,
            isOnline: true,
            isNew: false,
            followedDate: new Date('2024-03-10T08:15:00Z'),
            interests: ['food', 'travel', 'culture']
          },
          {
            id: 4,
            name: 'Fitsum Tekle',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            location: 'Gondar',
            bio: 'Historian by profession, advocating for cultural preservation.',
            followersCount: 980,
            engagementScore: 70,
            isOnline: false,
            isNew: false,
            followedDate: new Date('2024-02-28T11:00:00Z'),
            interests: ['history', 'culture', 'heritage']
          },
          {
            id: 5,
            name: 'Sofia Mohammed',
            avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
            location: 'Dire Dawa',
            bio: 'Artist and designer, sharing creative works inspired by Ethiopia.',
            followersCount: 2100,
            engagementScore: 95,
            isOnline: true,
            isNew: false,
            followedDate: new Date('2024-02-20T16:45:00Z'),
            interests: ['art', 'design', 'creativity']
          },
          {
            id: 6,
            name: 'Abebe Chala',
            avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
            location: 'Bahir Dar',
            bio: 'Student and aspiring entrepreneur, focused on local produce.',
            followersCount: 400,
            engagementScore: 60,
            isOnline: true,
            isNew: true,
            followedDate: new Date('2024-03-22T09:00:00Z'),
            interests: ['business', 'local products', 'education']
          }
        ],
        searchQuery: '',
        sortBy: 'name', // 'name', 'recent', 'activity'
        totalFollowers: 7000, // Example static data for insights
        monthlyGrowth: 12.5, // Example static data for insights
      };
    },
    computed: {
      filteredFollowers() {
        let tempFollowers = [...this.followers]; // Create a shallow copy to sort
  
        // Filter by search query
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          tempFollowers = tempFollowers.filter(follower =>
            follower.name.toLowerCase().includes(query) ||
            follower.location.toLowerCase().includes(query) ||
            follower.bio.toLowerCase().includes(query) ||
            follower.interests.some(interest => interest.toLowerCase().includes(query))
          );
        }
  
        // Sort
        if (this.sortBy === 'name') {
          tempFollowers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortBy === 'recent') {
          tempFollowers.sort((a, b) => b.followedDate.getTime() - a.followedDate.getTime());
        } else if (this.sortBy === 'activity') {
          tempFollowers.sort((a, b) => b.engagementScore - a.engagementScore);
        }
  
        return tempFollowers;
      }
    },
    methods: {
      viewProfile(follower) {
        alert(`Viewing profile of ${follower.name}`);
        // In a real app, this would navigate to the follower's profile page
      },
      messageFollower(follower) {
        alert(`Opening chat with ${follower.name}`);
        // In a real app, this would open a chat interface
      },
      shareProfile() {
        alert('Your profile link has been copied to clipboard!');
        // In a real app, this would copy a link or open a share dialog
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom Scrollbar for overall page if content overflows */
  body::-webkit-scrollbar {
    width: 8px;
  }
  body::-webkit-scrollbar-track {
    background: rgba(238, 88, 88, 0.05);
    border-radius: 4px;
  }
  body::-webkit-scrollbar-thumb {
    background-color: rgba(238, 88, 88, 0.6);
    border-radius: 4px;
    border: 1px solid rgba(238, 88, 88, 0.2);
  }
  body::-webkit-scrollbar-thumb:hover {
    background-color: rgba(238, 88, 88, 0.8);
  }
  
  /* Specific styling for ellipsis on bio for consistency */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* Custom shadow for buttons on hover */
  .shadow-etbuy-button:hover {
    box-shadow: 0 6px 16px rgba(238, 88, 88, 0.3);
  }
  
  /* Keyframe for pulse animation */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  
  .animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  </style>
  