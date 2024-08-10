<template>
  <div class="frontFont">
    <v-tabs
      v-model="tab"
      dark
      icons-and-text
      fixed-tabs
      background-color="deep-purple accent-4"
    >
      <v-tab value="daily">
        <v-icon>mdi-calendar</v-icon>
        Daily Data Points
      </v-tab>

      <v-tab value="maximum">
        <v-icon>mdi-chart-areaspline</v-icon>
        Min-Max Area Chart
      </v-tab>

      <v-tab value="weekly">
        <v-icon>mdi-calendar-week</v-icon>
        Weekly Average Graphs
      </v-tab>

      <v-tab value="monthly">
        <v-icon>mdi-calendar-month</v-icon>
        Monthly Average Graph
      </v-tab>

      <v-tab value="rawdata">
        <v-icon>mdi-database</v-icon>
        Raw Data
      </v-tab>
    </v-tabs>

    <v-card
      class="mx-auto"
      color="#26c6da"
      theme="dark"
      width="100vw"
      height="90vh"
      min-height="50vh"
    >
      <v-card-text>
        <v-window v-model="tab" class="window-content">
          <v-window-item value="daily">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-calendar-today</v-icon>
                <span class="tab-label">Daily Graph</span>
              </v-col>
              <v-col cols="12">
                <DailyGraph></DailyGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="maximum">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-chart-areaspline</v-icon>
                <span class="tab-label">Min-Max Table</span>
              </v-col>
              <v-col cols="12">              
                <MaxMinGraph></MaxMinGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="weekly">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-calendar-week</v-icon>
                <span class="tab-label">Weekly Graph</span>
              </v-col>
              <v-col cols="12">           
                <WeeklyGraph></WeeklyGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="monthly">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-calendar-month</v-icon>
                <span class="tab-label">Monthly Table</span>
              </v-col>
              <v-col cols="12">
                <MonthlyGraph></MonthlyGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="rawdata">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-database</v-icon>
                <span class="tab-label">Raw Data</span>
              </v-col>
              <v-col cols="12">
                <RawData></RawData>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../../stores/DataEmployees";
import MonthlyGraph from "../../components/EnergyRecords/MonthlyGraph.vue";
import MaxMinGraph from "../../components/EnergyRecords/MaxMinGraph.vue";
import WeeklyGraph from "../../components/EnergyRecords/WeeklyGraph.vue";

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
  margin: 0;
  padding: 0x;
  height: 90vh;
  width: 100%;
  width: 100vw;
  text-align: center;
  background: rgb(0, 119, 255);
}

.importx {
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  background: rebeccapurple;
}
</style>
