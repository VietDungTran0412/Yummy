<template>
  <!-- 
    The Result not found is a screen that display in the "Restaurant Search View".
    It displays the CORS error and the pottential solution to fix it
    It also displays if the location or restaurant could not be found
   -->

  <v-container :class="`mt-24 ${visible ? '' : 'hidden'}`">
    <h3 class="text-2xl text-center">Sorry! We could not find any Result!</h3>
    <div
      :class="`flex justify-start flex-col ${
        $vuetify.breakpoint.smAndDown ? 'w-4/5' : 'w-3/5'
      } mx-auto mt-8 mb-32`"
    >
      <v-list-item v-if="!isCors">
        <v-list-item-content>
          <h4 class="font-bold text-lg">Possible errors might include:</h4>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="!isCors">
        <v-list-item-content>
          <v-list-item-title>Location was not found!</v-list-item-title>
          <div class="text-sm text-stone-500">
            Please check your location gain!
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line v-if="!isCors">
        <v-list-item-content>
          <v-list-item-title>Restaurant was not found!</v-list-item-title>
          <div class="text-sm text-stone-500">
            Your restaurant might not exist or it has not been updated in our
            database
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line v-if="!isCors">
        <v-list-item-content>
          <v-list-item-title>Too many requests!</v-list-item-title>
          <div class="text-sm text-stone-500">
            You reached the maximum number of requests
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-list-item three-line v-else>
        <v-list-item-content>
          <v-list-item-title class="mb-2 font-bold"
            >CORS policy errors in your browser</v-list-item-title
          >

          <v-list-item-subtitle>
            To grant temporary access to your browser, please follow the below
            steps:
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-1">
            <ul>
              <li class="font-bold mb-1">
                Visiting
                <a
                  target="_blank"
                  href="https://cors-anywhere.herokuapp.com/corsdemo"
                  >https://cors-anywhere.herokuapp.com/corsdemo</a
                >
              </li>
              <li>Click on "Request temporary access to the demo server"</li>
            </ul>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-1">
            Once you completed return to your web page and refresh!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ["visible", "isCors"],
};
</script>