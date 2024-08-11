<template>
  <div>
    <v-bottom-navigation v-model="startedNav" :bg-color="'green'">
      <v-spacer />
      <v-btn :to="{ name: 'Json' }">
        <v-icon aria-hidden="true">mdi-account-supervisor</v-icon>
        <span>Data JSON </span>
      </v-btn>
      <v-spacer />
      <v-btn :to="{ name: 'Commodities' }">
        <v-icon aria-hidden="true">mdi-account-supervisor</v-icon>
        <span> Commodities </span>
      </v-btn>

      <v-btn value="user" :to="{ name: 'Json' }" v-cloak v-if="userX">
        <v-icon aria-hidden="true">mdi-finance</v-icon>
        <span> Data Gaps </span>
      </v-btn>
      <v-spacer />

      <v-btn :to="{ name: 'Login' }">
        <v-icon aria-hidden="true">mdi-logout</v-icon>
        <span>Admin: {{ storeAUT.user?.substring(0, userX?.length - 10).toLowerCase() }}</span>
      </v-btn>
      <v-spacer />
    </v-bottom-navigation>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/AppsAuth";
const storeAUT = useAuthStore();
const startedNav = ref(true);
const route = useRoute();
const userX = ref();

watch(route, () => {
  userX.value = storeAUT.user;
  console.log("1. Route BottomNav changed to:", route.name);
});

onBeforeMount(() => {
  userX.value = storeAUT.user;
});

</script>

<style lang="scss" scoped>
.container {
  background-color: mediumaquamarine;
  margin-left: 20%;
  font-family: Arial, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: center;
  color: red;

  .v-btn {
    letter-spacing: normal;

    &:hover {
      color: darkblue;
    }
  }

  [v-cloak] {
    display: none;
  }
}
</style>
