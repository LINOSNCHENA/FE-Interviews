<template>
  <div class="frontFont">
    <v-tabs
      v-model="tab"
      dark
      icons-and-text
      fixed-tabs
      background-color="deep-purple accent-4"
    >
   
      <v-tab value="rawdata">
        <v-icon>mdi-database</v-icon>
        Raw Data
      </v-tab>

      <v-tab value="gap">
        <v-icon>mdi-database</v-icon>
        Gap Data
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

          <v-window-item value="gap">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-calendar-month</v-icon>
                <span class="tab-label">Monthly data</span>
              </v-col>
              <v-col cols="12">
                <GapGraph></GapGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="maximum">
            <v-row>
              <v-col cols="12">
                <v-icon>mdi-chart-areaspline</v-icon>
                <span class="tab-label">Min-Max data</span>
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
                <span class="tab-label">Monthly Graph</span>
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
import { ref } from "vue";
import MonthlyGraph from "../../components/EnergyRecords/MonthlyGraph.vue";
import MaxMinGraph from "../../components/EnergyRecords/MaxMinGraph.vue";
import WeeklyGraph from "../../components/EnergyRecords/WeeklyGraph.vue";
const tab = ref("maximum");
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
