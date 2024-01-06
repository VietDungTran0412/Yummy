<template>
  <div
    @click="$router.push('/')"
    :class="`font-bold ${
      fontSize ? fontSize : 'text-4xl'
    } cursor-pointer text-orange-600 flex justify-start items-center`"
  >
    <v-icon md color="#dd6b20">mdi-silverware</v-icon>
    <div class="ml-1">Yummy</div>
  </div>
</template>

<script>
// Logo of the application
export default {
  name: "AppLogo",
  props: ["fontSize"],
};
</script>