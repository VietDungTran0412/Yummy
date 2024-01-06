<template>
  <v-card class="mx-auto my-12" max-width="374" height="690">
    <reservation
      v-if="openReservation"
      @open="setOpenReservation"
    ></reservation>
    <!-- Restaurant Item within -->
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="
        restaurant?.image_url !== ''
          ? restaurant?.image_url
          : require('@/assets/notfound.jpeg')
      "
      alt="asdasda"
    ></v-img>

    <v-card-title class="text-black flex justify-between items-center">
      <router-link
        class="text-black no-underline hover:underline"
        style="color: black"
        :to="`/restaurant/${this.restaurant?.alias}`"
      >
        {{ restaurant?.name }}
      </router-link>
      <v-btn
        @click="routeToDetail"
        small
        color="orange darken-2"
        class="text-white"
      >
        <div class="text-white">Visit</div>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0 flex justify-start items-center">
        <v-rating
          :value="restaurant?.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="18"
        ></v-rating>
        <div class="grey--text ms-4">
          {{ restaurant?.rating }} ({{ restaurant?.review_count }} Reviews)
        </div>
      </v-row>
      <div class="flex justify-start items-center mt-4">
        <v-chip
          v-for="category in restaurant?.categories"
          :key="category?.alias"
          class="mt-2 mr-2"
          small
        >
          {{ category?.title }}</v-chip
        >
      </div>

      <div class="mx-0 mt-4 h-32">
        <div class="flex justify-start items-center">
          <h4 class="w-28 text-md">Price Level:</h4>
          <div class="text-md">
            {{ restaurant?.price ? restaurant?.price : "No Information" }}
          </div>
        </div>
        <div class="flex justify-start items-start">
          <h4 class="w-28 text-md">Phone Number:</h4>
          <div class="text-md">{{ restaurant?.display_phone }}</div>
        </div>
        <div class="flex justify-start items-start">
          <h4 class="w-28 text-md">Address:</h4>
          <div class="text-md">{{ restaurant?.location?.address1 }},</div>
        </div>
        <div class="flex justify-start items-start">
          <h4 class="w-28 text-md">City:</h4>
          <div class="text-md">
            {{ restaurant?.location?.city }}
          </div>
        </div>
        <div class="flex justify-start items-start">
          <h4 class="w-28 text-md">Zip Code:</h4>
          <div class="text-md">
            {{ restaurant?.location?.zip_code }}
          </div>
        </div>
        <div class="flex justify-start items-start">
          <h4 class="w-28 text-md">Country:</h4>
          <div class="text-md">
            {{ restaurant?.location?.display_address.slice(-1)[0] }}
          </div>
        </div>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Availability & Reservation</v-card-title>

    <v-card-text>
      <div class="flex justify-between items-center">
        <v-chip-group>
          <v-chip
            class="flex justify-center items-center"
            color="green"
            outlined
          >
            Open On Schedule
          </v-chip>
        </v-chip-group>
        <v-card-actions>
          <v-btn color="orange darken-2" text @click="setOpenReservation(true)">
            Reserve
          </v-btn>
        </v-card-actions>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
import { ref } from "vue";
import Reservation from "./Reservation.vue";

export default {
  components: { Reservation },
  name: "app-item",
  props: ["restaurant"],
  setup() {
    const openReservation = ref(false);
    return { openReservation };
  },
  methods: {
    routeToDetail() {
      this.$router.push(`/restaurant/${this.restaurant?.alias}`);
    },
    setOpenReservation(value) {
      this.openReservation = value;
    },
  },
};
</script>