<template>
  <v-container class="my-32">
    <loading-screen :height="'h-fit'" :loading="loading"></loading-screen>
    <!-- Using Vuetify breakpoint for better responsive website -->
    <v-row
      :class="`justify-center ${
        $vuetify.breakpoint.smAndDown ? 'w-full' : 'w-3/4'
      } mx-auto`"
    >
      <v-col cols="12" md="8">
        <h2 class="text-center text-orange-500 text-3xl mb-8">Register</h2>
        <v-form ref="registerForm" @submit="register">
          <v-text-field
            color="orange darken-1"
            v-model="formData.username"
            label="Username"
            :counter="20"
            :rules="[
              (v) => !!v || 'Username is required!',
              (v) =>
                v.length <= 20 ||
                'Username must contain no more than 20 characters!',
            ]"
            required
          ></v-text-field>
          <v-text-field
            color="orange darken-1"
            v-model="formData.email"
            label="Email"
            type="email"
            :rules="[
              (v) => !!v || 'E-mail is required',
              (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]"
            required
          ></v-text-field>

          <v-text-field
            color="orange darken-1"
            v-model="formData.password"
            label="Password"
            type="password"
            :rules="[
              (v) => !!v || 'Password is required!',
              (v) =>
                v.length >= 8 || 'Password must contain at least 8 characters!',
            ]"
            required
          ></v-text-field>
          <v-text-field
            color="orange darken-1"
            v-model="formData.confirmPassword"
            label="Confirm Password"
            type="password"
            required
            :rules="[
              (v) => !!v || 'Password is required!',
              (v) => v == formData.password || 'Confirm Password is not valid!',
            ]"
          ></v-text-field>
          <div class="flex justify-center items-center w-full mt-4">
            <v-btn type="submit" color="orange lighten-1">
              <div class="text-white">Register</div>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defaultTimeOut } from "@/utils/constants";
import LoadingScreen from "@/components/utils/LoadingScreen.vue";

export default {
  name: "app-register",
  components: { LoadingScreen },
  data() {
    return {
      loading: false,
      formData: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      // Handle registration logic here
      // You can send a request to your server to register the user
      if (this.$refs.registerForm.validate()) {
        localStorage.setItem("username", this.formData.username);
        // Process the event for authentication and alert
        this.loading = true;
        setTimeout(() => {
          // Process the authentication
          this.$emit("authenticated", true);
          this.$emit("alert", {
            type: "success",
            display: true,
            message: `Welcome to our website ${this.formData.username}!`,
          });
          this.loading = false;
          this.$router.push("/");
        }, defaultTimeOut);
      }
    },
  },
};
</script>