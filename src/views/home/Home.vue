<template>
  <div>
    <div :style="backgroundStyle">
      <div class="flex flex-col justify-center items-center py-32">
        <div class="flex justify-center items-start flex-col w-3/4">
          <h4 class="font-bold text-5xl text-orange-600">Yummy</h4>
          <p class="mt-8 text-white text-md-xl text-lg-xl text-xs-md w-3/5">
            The ultimate restaurant reservation platform that empowers you to
            effortlessly search and discover a diverse range of dining
            experiences, conveniently book tables, and savor culinary delights
            with confidence.
          </p>
          <div class="flex w-1/3 justify-between items-center">
            <v-btn @click="routeToSearch" class="w-36" dark small color="orange"
              >Getting Started</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-center items-center w-4/5 mx-auto mt-16 mb-24"
    >
      <h2 class="text-4xl mb-8 font-semibold">Our Features</h2>
      <v-row class="w-full">
        <v-col
          class="flex flex-col justify-start items-center"
          cols="12"
          md="4"
          xs="12"
        >
          <v-icon
            color="orange"
            :style="{
              fontSize: '5em',
            }"
            x-large
            >mdi-table-check</v-icon
          >
          <h4 class="text-2xl">Reservation</h4>
          <p class="text-center text-sm mt-1 w-64">
            Enables your to rapidly reserve table in any restaurants around the
            world
          </p>
        </v-col>
        <v-col
          class="flex flex-col justify-start items-center"
          cols="12"
          md="4"
          xs="12"
        >
          <v-icon
            color="orange"
            :style="{
              fontSize: '5em',
            }"
            x-large
            >mdi-magnify</v-icon
          >
          <h4 class="text-2xl">Searching</h4>
          <p class="text-center text-sm mt-1 w-64">
            Quickly access and search your favourite restaurant anywhere
          </p>
        </v-col>
        <v-col
          class="flex flex-col justify-start items-center"
          cols="12"
          md="4"
          xs="12"
        >
          <v-icon
            color="orange"
            :style="{
              fontSize: '5em',
            }"
            x-large
            >mdi-star</v-icon
          >

          <h4 class="text-2xl">Rating</h4>
          <p class="text-center text-sm mt-1 w-64">
            Tracking feedbacks and leave a review to foods or restaurants
          </p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-home",
  data: function () {
    // Import background image from the assets folder
    return { background: require("@/assets/background.png") };
  },
  methods: {
    routeToSearch() {
      // this.$emit('authenticated', true);
      // The default query parameter showcased the location of Melbourne Victoria
      this.$router.push({
        path: "/search",
        query: { location: "Melbourne, Victoria" },
      });
    },
  },
  computed: {
    backgroundStyle() {
      // Return the background style of the home page
      return {
        backgroundImage: `url(${this.background})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      };
    },
  },
};
</script>