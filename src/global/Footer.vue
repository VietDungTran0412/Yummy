<template>
  <v-footer padless>
    <v-card flat tile class="text-center">
      <v-card-text>
        <v-btn
          @click="redirect(contact?.link)"
          v-for="contact in contacts"
          :key="contact?.icon"
          class="mx-4 grey--text"
          icon
        >
          <v-icon size="24px">
            {{ contact?.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text pt-0 flex justify-center items-center">
        <p class="text-center">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="black--text">
        {{ new Date().getFullYear() }} —
        <strong>Swinburne University of Technology</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "app-footer",
  data: function () {
    // Return all the contact icons
    return {
      contacts: [
        { icon: "mdi-facebook", link: "https://www.facebook.com" },
        { icon: "mdi-twitter", link: "https://www.twitter.com" },
        { icon: "mdi-linkedin", link: "https://www.linkedin.com" },
        { icon: "mdi-instagram", link: "https://www.instagram.com" },
      ],
    };
  },
  methods: {
    redirect(link) {
      // Redirect to the other link
      window.location.href = link;
    },
  },
};
</script>