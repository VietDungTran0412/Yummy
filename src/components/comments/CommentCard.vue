<template>
  <v-card class="w-full mb-4" color="white">
    <v-card-title>
      <Logo :fontSize="'text-md'" />
      <span class="text-sm">{{ review?.time_created }}</span>
    </v-card-title>

    <v-card-text class="text-md font-weight-bold">
      "{{ review?.text }}"
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            :alt="review?.user?.name"
            :src="
              review?.user?.image_url
                ? review?.user?.image_url
                : require('@/assets/anonymous.webp')
            "
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ review?.user?.name }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon class="mr-1" color="orange darken-2"> mdi-star </v-icon>
          <span class="subheading mr-2">{{ review?.rating }}</span>
          <span class="mr-1">·</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>


<script>
import Logo from "../utils/Logo.vue";

export default {
  name: "RestaurantComment",
  components: { Logo },
  props: ["review"],
};
</script>