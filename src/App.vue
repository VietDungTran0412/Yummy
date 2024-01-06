<template>
  <v-app>
    <!-- Navigation bar -->
    <NavBar
      @authenticated="setAuthenticated"
      @alert="setAlert"
      :authenticated="authenticated"
    ></NavBar>
    <app-snackbar
      :color="alert?.type"
      :message="alert?.message"
      :open="alert?.display"
    ></app-snackbar>
    <!-- Router view start from here -->
    <router-view
      @authenticated="setAuthenticated"
      @alert="setAlert"
    ></router-view>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavBar from "./global/NavBar.vue";
import Footer from "./global/Footer.vue";
import router from "./router";
import AppSnackbar from "./components/snackbar/AppSnackbar.vue";
import { defaultTimeOut } from "./utils/constants";

export default {
  name: "App",
  router,
  data() {
    return {
      authenticated: !!localStorage.getItem("username"),
      activeLink: 0,
      alert: { type: "", display: false, message: "" },
    };
  },
  components: { NavBar, Footer, AppSnackbar },
  // Methods from the root component
  methods: {
    setAuthenticated(status) {
      // Check whether user has been authenticated
      this.authenticated = status;
    },
    setAlert(alert) {
      // Set the global alert event and timeout
      this.alert = alert;
      setTimeout(() => {
        this.alert.display = false;
      }, defaultTimeOut);
    },
  },
};
</script>
