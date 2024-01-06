<template>
  <div
    v-if="loading"
    :class="`flex justify-center inset-0 items-center ${
      !height ? 'h-screen' : height
    } h-screen`"
  >
    <v-overlay>
      <v-progress-circular
        :size="70"
        :width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: ["loading", "height"],
};
</script>