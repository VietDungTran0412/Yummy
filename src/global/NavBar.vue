<template>
  <div class="w-full">
    <v-app-bar>
      <v-toolbar-title>
        <Logo />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      :class="`${drawer ? '' : 'hidden'}`"
    >
      <v-list nav dense>
        <v-list-item-group
          :value="getPathIndex()"
          active-class="orange--text text--accent-4"
        >
          <v-list-item @click="$router.push('/')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <!-- The default query parameter showcased the location of Melbourne Victoria -->
          <v-list-item
            @click="
              $router.push({
                path: '/search',
                query: { location: 'Melbourne, Victoria' },
              })
            "
          >
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item>
          <!-- Account settings -->
          <v-divider></v-divider>

          <v-list-item
            :disabled="authenticated"
            class="mt-1"
            @click="$router.push('/log-in')"
          >
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>
          <v-list-item
            :disabled="authenticated"
            class="mt-1"
            @click="$router.push('/register')"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
          <v-list-item
            :disabled="!authenticated"
            class="mt-1"
            @click="signOut()"
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Logo from "../components/utils/Logo.vue";

export default {
  data: function () {
    return { drawer: false, group: 0 };
  },
  components: { Logo },
  props: ["authenticated"],
  methods: {
    signOut() {
      // Sign out by removing the username from local storage
      localStorage.removeItem("username");
      this.$emit("authenticated", false);
      this.$emit("alert", {
        type: "success",
        display: true,
        message: "Successfully loged out!",
      });
    },
    getPathIndex() {
      switch (this.$route.path) {
        case "/":
          return 0;
        case "/search":
          return 1;
        case "/log-in":
          return 2;
        case "/register":
          return 3;
        default:
          return 1; // All the other route is based on search option from the navigation bar
      }
    },
  },
};
</script>


<style scoped>
.no-active-highlight .v-list-item--active {
  background-color: transparent; /* Set the background color to transparent */
  color: inherit; /* Inherit the text color from the parent */
}
</style>