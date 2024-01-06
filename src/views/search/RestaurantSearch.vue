<template>
  <div>
    <form
      @submit.prevent="handleSearch"
      class="search-box rounded pl-2 mx-auto my-4 w-3/4 mt-12 mb-8"
    >
      <input
        ref="restaurantInput"
        type="text"
        class="search-input"
        placeholder="Restaurant"
      />
      <v-divider vertical class="my-2"></v-divider>
      <input
        ref="locationInput"
        type="text"
        required
        class="search-input"
        placeholder="Location"
        :value="$route.query.location"
      />
      <button
        type="submit"
        class="search-button bg-orange-400 active:bg-orange-300"
      >
        <v-icon color="white">mdi-magnify</v-icon>
      </button>
    </form>
    <v-divider horizontal></v-divider>
    <!-- Loading Screen -->
    <loading-screen :loading="loading"></loading-screen>

    <!-- Rendering the restaurants -->
    <v-row v-if="!error && !loading && !isCors" class="px-4 w-full mx-auto">
      <v-col v-for="res in restaurants" :key="res.id" cols="12" sm="6" md="6" lg="3">
        <!-- Restaurant -->
        <restaurant-card :restaurant="res"></restaurant-card>
      </v-col>
    </v-row>

    <!-- Set up pagination. If error hide the pagination -->
    <v-container v-if="!error && !loading && !isCors" class="text-center mb-12">
      <v-pagination
        color="orange darken-2"
        @input="onPageChange"
        v-model="page"
        :length="getTotalPages(totalResults)"
        :total-visible="6"
        circle
      ></v-pagination>
    </v-container>
    <!-- Result not found error -->
    <result-not-found
      :visible="error || isCors"
      :isCors="isCors"
    ></result-not-found>
  </div>
</template>

<script>
import { ref } from "vue";
import RestaurantCard from "../../components/restaurant/RestaurantCard.vue";
import ResultNotFound from "../../components/utils/ResultNotFound.vue";
import LoadingScreen from "../../components/utils/LoadingScreen.vue";
import { options, pageLimit } from "@/utils/constants.js";
import { scrollToTop } from "@/utils/scrollToTop";

export default {
  components: { RestaurantCard, ResultNotFound, LoadingScreen },
  setup() {
    // Retrieval restaurant
    const restaurants = ref([]);
    // Loading the data until retrieving
    const loading = ref(true);
    // Check whether an error occur
    const error = ref(false);
    // The current page
    const page = ref(1);

    const totalResults = ref(0);

    // CORS checked
    const isCors = ref(false);

    return {
      restaurants,
      loading,
      error,
      isCors,
      page,
      totalResults,
    };
  },
  methods: {
    onPageChange() {
      // Fetch API again on page change
      this.search(this.page);
      // Scroll to top whenever pagination is clicked
    },
    search(page = 1) {
      this.loading = true;
      this.isCors = false;
      this.error = false;
      this.totalResults = 0;
      fetch(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${
          this.$route.query.location
        }&term=${
          this.$route.query.term ? this.$route.query.term : ""
        }&sort_by=best_match&limit=${pageLimit}&offset=${
          (page - 1) * pageLimit
        }`,
        options
      )
        .then((response) => {
          if (response.status == 403) {
            // Response status = 403 --> CORS is enabled
            this.isCors = true;
            this.error = true;
            return null;
          }
          return response.json();
        })
        .then((res) => {
          // Assign this.restaurants by the businesses returned from YelpAPI
          this.restaurants = res.businesses;
          this.totalResults = res.total;
          if (this.restaurants.length === 0) {
            // Length = 0 --> No result found
            this.error = true;
          }
          // Loading is completed
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
      scrollToTop();
    },
    getTotalPages(totalItems) {
      // Get total pages if it is larger than 10 pages then return 10 pages
      return Math.floor(totalItems / pageLimit) + 1 <= 10
        ? Math.floor(totalItems / pageLimit) + 1
        : 10;
    },
    handleSearch() {
      // Avoid redundant routing
      const term = this.$route.query.term ? this.$route.query.term : ''
      if(this.$refs.locationInput.value === this.$route.query.location && this.$refs.restaurantInput.value === term) {
        this.search(1);
        return;
      }
      // Handle search form submit
      // Update the search parameter
      let query = { location: this.$refs.locationInput.value };
      if (this.$refs.restaurantInput.value) {
        query = { ...query, term: this.$refs.restaurantInput.value };
      }
      this.$router.push({ query: query, params: { key: Math.random() }});
      this.search(1);
      
    },
  },
  mounted() {
    this.search(1);
  },
};
</script>


<style scoped src="./css/index.css">
</style>