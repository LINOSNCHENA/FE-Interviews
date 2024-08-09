<template>
  <div class="frontFont">
    <v-tabs v-model="tab" background-color="deep-purple accent-4" dark icons-and-text>
      <v-spacer />

      <v-tab value="daily">
        1 Daily Data points <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />

      <v-tab value="maximum">
        2. Min-Max Area chart <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />

      <v-tab value="weekly">
        3 Weekly Avarage Graphs <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />

      <v-tab value="monthly">
        4 Month Average Graph <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />
      <v-tab value="rawdata">
        5 Raw Data <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />

    </v-tabs>

    <v-card class="mx-auto" color="#26c6da" theme="dark" width="95%" height="100%" min-height="100vh">
      <v-card-text>
        <v-window v-model="tab">

          <v-window-item value="daily">
            Daily Graph | {{ counted3 }}
            <DailyGraph></DailyGraph>
          </v-window-item>

          <v-window-item value="maximum">
            Maximum Table | {{ counted3 }}
            <DailyGraph></DailyGraph>
          </v-window-item>

          <v-window-item value="weekly">
            Weeekly Graph | {{ counted3 }}
            <DailyGraph></DailyGraph>
          </v-window-item>

          <v-window-item value="monthly">
            Monthly Table | {{ counted3 }}

            <DailyGraph></DailyGraph>
          </v-window-item>

          <v-window-item value="rawdata">
            Raw Data | {{ counted3 }}
            <RawData></RawData>
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../../stores/DataEmployees";

const store = useEmployeeStore();
const tab = ref("energy");
const salaries = ref<any[]>([]);
const families = ref<any[]>([]);
const discounted = ref<any[]>([]);
const permit = ref(false);
const counted1 = ref(0);
const counted2 = ref(0);
const counted3 = ref(0);
const emailx = ref("Administrator");

onMounted(async () => {
  store.fetchSalaries();
  store.fetchFamilies();
  store.fetchDiscounted();
  updatesFromAPI();
});

const updatesFromAPI = () => {
  salaries.value = store.loadedSalaries;
  families.value = store.loadedFamilies;
  discounted.value = store.loadedDiscounted;
  isAuthorizedAdmin(emailx.value);
  counted1.value = salaries.value.length;
  counted2.value = families.value.length;
  counted3.value = discounted.value.length;
};

async function isAuthorizedAdmin(userEmail: string | undefined) {
  const enforcer = String(userEmail);
  const authorizedEmails = ["test1@gmail.com", "test2@gmail.com"];
  const goodUser = authorizedEmails.includes(enforcer);
  permit.value = goodUser;
  return goodUser;
}
</script>

<style scoped>
.frontFont {
  margin: 10px;
  padding: 10px;
  height: 100vh;
  width: 100%;
  text-align: center;
}

.importx {
  padding: 0px;
  top: 0px;
  left: 100px;
}
</style>
