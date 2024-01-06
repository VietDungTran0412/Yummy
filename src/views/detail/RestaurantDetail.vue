<template>
  <div>
    <!-- Loading Screen -->
    <loading-screen :loading="loading"></loading-screen>
    <!-- Reservation Modal -->
    <reservation
      v-if="openReservation"
      @open="setOpenReservation"
    ></reservation>

    <result-not-found
      :visible="error || isCors"
      :isCors="isCors"
    ></result-not-found>

    <!-- Restaurant Detail started from here -->
    <v-container v-if="!loading && !error && !isCors" class="mt-24">
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-img
            :src="
              detail.image_url
                ? detail.image_url
                : require('@/assets/notfound.jpeg')
            "
            max-height="520"
            height="550"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-row>
            <v-col
              cols="12"
              md="12"
              class="flex flex-row justify-start items-center pb-0"
            >
              <h2 class="text-orange-600 text-3xl">{{ detail?.name }}</h2>
            </v-col>
            <v-col cols="12" md="12">
              <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row justify-start items-center">
                  <v-icon color="orange lighten-2">mdi-check-circle</v-icon>
                  <div>Claimed</div>
                </div>
                <div>
                  <v-btn small color="orange darken-2">
                    <div class="text-white" @click="openReservation = true">
                      Reserve
                    </div>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-divider horizontal></v-divider>
          <v-row class="mt-2">
            <v-col cols="12" xs="12">
              <div class="flex justify-between items-start">
                <div class="text-neutral-500 font-bold">Address:</div>
                <div class="text-end">{{ displayAddress }}</div>
              </div>
            </v-col>
            <v-col cols="12" xs="12">
              <div class="flex justify-between items-start">
                <div class="text-neutral-500 font-bold">Phone Number:</div>
                <div>{{ detail.display_phone }}</div>
              </div>
            </v-col>
            <v-col cols="12" xs="12">
              <div class="flex justify-between items-start">
                <div class="text-neutral-500 font-bold">Price:</div>
                <div class="text-orange-600 font-bold">
                  {{ detail.price }} - {{ convertPrice }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" xs="12">
              <div class="flex justify-between items-start">
                <div class="text-neutral-500 font-bold">Categories:</div>
                <div class="flex justify-end flex-row">
                  <v-chip
                    small
                    v-for="category in detail.categories"
                    :key="category.alias"
                    >{{ category?.title }}</v-chip
                  >
                </div>
              </div>
            </v-col>
            <v-col cols="12" xs="12">
              <div class="text-neutral-500 font-bold mb-1">Calendar:</div>
              <v-divider class="mb-2"></v-divider>
              <div
                v-for="(day, i) in mapWeekDay"
                :key="i"
                class="flex justify-between items-center mb-1"
              >
                <div
                  :class="`text-sm ${
                    isWeekdayOpen(i) && detail?.hours[0]?.is_open_now
                      ? 'text-sky-700 font-bold'
                      : ''
                  }`"
                >
                  {{ i | toWeekday }}:
                </div>
                <div>
                  <v-chip
                    small
                    v-for="(opening, j) in day"
                    :key="j"
                    :color="
                      isShiftOpen(opening?.start, opening?.end) &&
                      isWeekdayOpen(i) &&
                      detail?.hours[0]?.is_open_now
                        ? 'blue lighten-2'
                        : 'default'
                    "
                  >
                    {{ opening?.start }} - {{ opening?.end }}
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="w-full mt-8">
        <h3>Rating</h3>
        <v-divider></v-divider>
        <div class="mt-4 mb-8 flex justify-start items-center">
          <div class="text-neutral-500">Rating:</div>
          <v-rating
            color="orange"
            hover
            length="5"
            size="32"
            half-increments
            readonly
            :value="detail.rating"
          ></v-rating>
          <div class="text-orange-400 font-bold">
            {{ detail.rating }} ({{ detail.review_count }} Votes)
          </div>
        </div>
      </div>
      <!-- All the comment started from here -->
      <comment-list></comment-list>

      <!-- Showcased the carousels to display photos -->
      <h3 class="mt-8">Highlight Photos</h3>
      <v-carousel hide-delimiters height="200" class="bg-stone-100 w-full mt-8">
        <v-carousel-item
          v-for="(image, i) in detail?.photos"
          :key="i"
          :src="image"
          contain
          max-height="400"
          aspect-ratio="2"
        >
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
import { ref } from "vue";
import LoadingScreen from "@/components/utils/LoadingScreen.vue";
import CommentList from "@/components/comments/CommentList.vue";
import { options } from "@/utils/constants";
import Reservation from "@/components/restaurant/Reservation.vue";
import ResultNotFound from "@/components/utils/ResultNotFound.vue";

export default {
  components: { LoadingScreen, CommentList, Reservation, ResultNotFound },
  setup() {
    const detail = ref(null);
    const loading = ref(true);
    const today = ref(new Date());
    const openReservation = ref(false);
    const error = ref(false);
    const isCors = ref(false);
    return {
      detail,
      loading,
      today,
      error,
      isCors,
      openReservation,
    };
  },
  mounted() {
    // Fetch the APi on mounted
    this.loading = true;
    this.isCors = false;
    this.error = false;
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.$route.params.alias}`,
      options
    )
      .then((response) => {
        if (response.status == 403) {
          // Response status = 403 --> CORS is enabled
          this.isCors = true;
          this.loading = false;
          return null;
        } else if (response.status == 404) {
          // 404 Not found error
          this.error = true;
          this.loading = false;
          return null;
        }
        return response.json();
      })
      .then((res) => {
        this.detail = res;
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
      });
  },
  methods: {
    isWeekdayOpen(weekday) {
      return Number(weekday) === new Date().getDay();
    },
    isShiftOpen(start, end) {
      // Check if the time and hour matched to highlight if it is opening
      const now = new Date();
      const startDate = new Date(now);
      const endDate = new Date(now);
      // The start and end hour is represented as  '18:00' or '19:35'
      const [startHours, startMinutes] = start.split(":");
      const [endHours, endMinutes] = end.split(":");

      startDate.setHours(parseInt(startHours, 10));
      startDate.setMinutes(parseInt(startMinutes, 10));
      endDate.setHours(parseInt(endHours, 10));
      endDate.setMinutes(parseInt(endMinutes, 10));
      // Check if the it is opened
      return startDate <= now && endDate >= now;
    },
    setOpenReservation(value) {
      this.openReservation = value;
    },
  },

  filters: {
    // Convert from weekday idx to weekday title
    toWeekday(weekdayIdx) {
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return weekdays[weekdayIdx];
    },
  },
  computed: {
    displayAddress() {
      // Display the display_address properties of the API
      // The display_address is represented as ['Restaurant A', 'Hawthorn', 'Australia']
      let res = "";
      this.detail?.location?.display_address?.map((item, i) => {
        if (i !== this.detail?.display_address?.length - 1) {
          res += item + ", ";
        } else {
          res += item;
        }
      });
      return res;
    },
    convertPrice() {
      // Convert price from $$$ format to level
      const map = {
        $$$: "Luxury",
        $$: "Normal",
        $: "Reasonable",
        "": "No Defined",
      };
      return map[this.detail?.price];
    },
    mapWeekDay() {
      // Map weekday index to weekday title
      let res = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      this.detail?.hours[0]?.open?.map((item) => {
        let openingHours = {
          start: item.start.substring(0, 2) + ":" + item.start.substring(2),
          end: item.end.substring(0, 2) + ":" + item.end.substring(2),
        };
        // Check if the weekday match today --> Make it highlighted if it is opening
        res[item.day].push(openingHours);
      });
      return res;
    },
  },
};
</script>