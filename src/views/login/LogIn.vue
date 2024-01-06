<template>
  <v-container class="my-32">
    <loading-screen :height="'h-fit'" :loading="loading"></loading-screen>
    <v-row
      :class="`justify-center ${
        $vuetify.breakpoint.smAndDown ? 'w-full' : 'w-3/4'
      } mx-auto`"
    >
      <v-col cols="12" md="8">
        <h2 class="text-center text-orange-500 text-3xl mb-8">
          Welcome to Yummy!
        </h2>
        <v-form ref="registerForm" @submit="signIn()">
          <v-text-field
            color="orange darken-1"
            v-model="formData.username"
            label="Username"
            type="text"
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
          <div class="flex justify-center items-center w-full mt-4">
            <v-btn type="submit" color="orange lighten-1">
              <div class="text-white">Log In</div>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoadingScreen from "@/components/utils/LoadingScreen.vue";
import { defaultTimeOut } from "@/utils/constants";

export default {
  name: "log-in",
  components: { LoadingScreen },
  data() {
    return {
      loading: false,
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      // Handle registration logic here
      // You can send a request to your server to register the user
      if (this.$refs.registerForm.validate()) {
        localStorage.setItem("username", this.formData.username);
        this.loading = true;
        setTimeout(() => {
          this.$emit("authenticated", true);
          // Set up the global alert
          this.$emit("alert", {
            type: "success",
            display: true,
            message: `Welcome back ${this.formData.username}`,
          });
          this.loading = false;
          this.$router.push("/");
        }, defaultTimeOut);
      }
    },
  },
};
</script>