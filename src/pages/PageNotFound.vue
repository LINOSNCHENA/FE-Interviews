<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <h1>404 - Page Not Found</h1>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <p>
            This Health page no longer exists or was moved to another location.
          </p>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn @click="homepage" color="primary">GoTo Login Page</v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </div> </v-col></v-row
  ></v-container>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
async function homepage() {
  router.push({ name: "Login" });
}
</script>
