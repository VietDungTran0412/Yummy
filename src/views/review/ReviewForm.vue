<template>
  <v-container
    fluid
    :class="`${$vuetify.breakpoint.mdAndDown ? 'w-full' : 'w-3/5'} my-16`"
  >
    <loading-screen :loading="loading" height="h-fit"></loading-screen>
    <app-snackbar
      message="Thank you for your feedback"
      :open="snackbar"
      :timeout="timeout"
      color="success"
    ></app-snackbar>
    <result-not-found
      :visible="error.display"
      :isCors="error.status == 403"
    ></result-not-found>

    <!-- Form start from here -->
    <v-card v-if="!error.display" class="p-4">
      <v-card-title>{{ this.name }}</v-card-title>
      <v-form ref="reviewForm" @submit="submit">
        <v-card-text class="flex justify-start items-center">
          <v-rating v-model="reviewData.rating">
            <template v-slot:item="props">
              <v-icon
                :color="`${props.isFilled ? 'orange' : 'grey'} darken-2`"
                :large="!$vuetify.breakpoint.mdAndDown"
                @click="props.click"
              >
                {{
                  props.isFilled ? "mdi-star-circle" : "mdi-star-circle-outline"
                }}
              </v-icon>
            </template>
          </v-rating>
          <span class="text-black text-lg">{{
            reviewData.rating | ratingDescription
          }}</span>
        </v-card-text>
        <v-card-text>
          <v-file-input
            :disabled="loading"
            color="orange darken-2"
            accept="image/*"
            label="Experienced image!"
          ></v-file-input>
        </v-card-text>
        <v-card-text class="mt-0">
          <v-textarea
            :disabled="loading"
            v-model="reviewData.description"
            :rules="[(v) => !!v || 'You must enter your review to submit']"
            name="input-7-1"
            :height="$vuetify.breakpoint.mdAndDown ? 200 : 300"
            outlined
            color="orange darken-2"
            label="Leave your comment about food, service and more"
            clearable
          ></v-textarea>
        </v-card-text>
        <v-card-text>
          <v-btn
            :loading="loading"
            type="submit"
            color="orange darken-2"
            style="color: white"
          >
            Submit
          </v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>


<script>
import { ref } from "vue";
import AppSnackbar from "@/components/snackbar/AppSnackbar.vue";
import { defaultTimeOut, options } from "@/utils/constants";
import LoadingScreen from "@/components/utils/LoadingScreen.vue";
import ResultNotFound from "@/components/utils/ResultNotFound.vue";
import { formatDate } from "@/utils/formatDate.js";

export default {
  name: "restaurant-review",
  components: { AppSnackbar, LoadingScreen, ResultNotFound },
  setup() {
    // Rating score default is 3
    const reviewData = ref({
      rating: 3,
      description: "",
    });
    // Value of snackbar
    const snackbar = ref(false);
    // Default timeout
    const timeout = ref(defaultTimeOut);
    // Loading
    const loading = ref(false);
    // Restaurant name
    const name = ref("");
    // Error checked
    const error = ref({
      status: 200, // Default 200  means success
      display: false,
    });
    // Check cors error
    return {
      reviewData,
      snackbar,
      timeout,
      loading,
      name,
      error,
    };
  },
  mounted() {
    // Fetch the API on mounted
    this.loading = true;
    this.error.display = false;
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.$route.params.alias}`,
      options
    )
      .then((response) => {
        if (response.status == 404 || response.status == 403) {
          // 404 Not found error while 403 means CORS
          this.error.display = true;
          this.error.status = response.status;
          this.loading = false;
          return null;
        }
        return response.json();
      })
      .then((res) => {
        this.name = res.name;
        this.loading = false;
      })
      .catch(() => {
        this.error.display = true;
        this.loading = false;
      });
  },
  filters: {
    ratingDescription(value) {
      // Filter the rating and translate it into appropriate description
      switch (value) {
        case 1:
          return "Not Good";
        case 2:
          return "Could be better";
        case 3:
          return "Good";
        case 4:
          return "Exceptional";
        default:
          return "YUMMY!!!";
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.reviewForm.validate()) {
        this.snackbar = true;
        this.loading = true;
        // Add the comment of user into vuex
        const review = {
          alias: this.$route.params.alias,
          user: {
            name: localStorage.getItem("username"),
          },
          time_created: formatDate(new Date()),
          text: this.reviewData.description,
          rating: this.reviewData.rating,
        };
        // Add review into store
        this.$store.dispatch("addReview", review);

        // Set a timeout to wait before routing to the next page
        setTimeout(() => {
          this.$router.push(`/restaurant/${this.$route.params.alias}`);
          this.snackbar = false;
        }, this.timeout);
      }
    },
  },
};
</script>