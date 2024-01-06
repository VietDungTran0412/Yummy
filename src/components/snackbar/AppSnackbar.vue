<template>
  <v-snackbar
    :top="true"
    :right="true"
    :timeout="timeout ? timeout : 3000"
    :color="color"
    :value="open"
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "app-snackbar",
  props: ["open", "color", "timeout", "message"],
};
</script>