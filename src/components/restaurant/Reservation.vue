<template>
  <!-- The Modal of the reservation -->
  <v-dialog v-model="open" width="600px" class="p-8">
    <app-snackbar
      color="success"
      :message="msg"
      :open="!!msg"
      :timeout="4000"
    ></app-snackbar>
    <!-- Reservation Form starts from here -->
    <v-form ref="reserveForm" @submit="reserve()">
      <v-card class="p-8 w-full">
        <v-card-title class="text-h5"> Your reservation </v-card-title>

        <v-card-text>
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
            v-model="formData.phoneNumber"
            color="orange darken-1"
            label="Phone Number"
            type="number"
            :rules="[(v) => !!v || 'Phone number is required']"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange darken-1" @click="close" text> Cancel </v-btn>

          <v-btn type="submit" color="orange darken-1" text> Reserve </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import AppSnackbar from "../snackbar/AppSnackbar.vue";

export default {
  name: "app-reservation",
  components: { AppSnackbar },
  data() {
    return {
      formData: {
        email: "",
        phoneNumber: "",
      },
      msg: "",
      open: true,
    };
  },
  methods: {
    reserve() {
      // Validate the reservation
      if (this.$refs.reserveForm.validate()) {
        this.$emit("open", true);
        this.msg = "Sucessfully reserved your table!";
        setTimeout(() => {
          this.$emit("open", false);
          this.msg = "";
        }, 4000);
      }
    },
    close() {
      this.$emit("open", false);
    },
  },
};
</script>

