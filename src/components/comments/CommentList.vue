<template>
  <div class="w-full flex flex-col">
    <app-snackbar
      :color="snackbar.type"
      :message="snackbar.message"
      :open="snackbar.display"
    ></app-snackbar>
    <!-- Review Highlight start from here -->
    <div class="w-full flex justify-between flex-row">
      <h3>Reviews Highlight</h3>
      <v-btn small color="orange darken-2" @click="openReview">
        <div class="text-white">Leave a review</div>
      </v-btn>
    </div>
    <v-divider class="mt-1 mb-4"></v-divider>
    <loading-screen :loading="loading" :height="'h-32'"></loading-screen>
    <comment-card
      v-for="feedback in feedbacks"
      :key="feedback.id"
      :review="feedback"
    ></comment-card>
    <comment-card
      v-for="(userReview, i) in getReviewByAlias($route.params.alias)"
      :key="i"
      :review="userReview"
    ></comment-card>
  </div>
</template>

<script>
import { ref } from "vue";
import CommentCard from "./CommentCard.vue";
import LoadingScreen from "../utils/LoadingScreen.vue";
import AppSnackbar from "../snackbar/AppSnackbar.vue";
import { defaultTimeOut, options } from "@/utils/constants.js";
import { mapGetters } from "vuex";

export default {
  props: ["alias"],
  components: { CommentCard, LoadingScreen, AppSnackbar },
  setup() {
    const feedbacks = ref([]);
    const loading = ref(true);
    // Snackbar parameters for open review page
    const snackbar = ref({
      display: false,
      message: "You must log-in to leave a review!",
      type: "warn",
    });
    return { feedbacks, loading, snackbar };
  },
  mounted() {
    // Set loading = true to make the website in loading phase
    this.loading = true;
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.$route.params.alias}/reviews?limit=20&sort_by=yelp_sort`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        this.feedbacks = response?.reviews;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
  methods: {
    openReview() {
      // Open the reservation modal
      if (localStorage.getItem("username")) {
        this.$router.push(`/restaurant/${this.$route.params.alias}/review`);
      } else {
        // If user is not authorized then display the warning
        this.snackbar = { ...this.snackbar, display: true };
        setTimeout(() => {
          this.snackbar = { ...this.snackbar, display: false };
        }, defaultTimeOut);
      }
    },
  },
  computed: {
    ...mapGetters(["getReviewByAlias"]),
  },
};
</script>