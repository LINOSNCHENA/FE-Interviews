<template>
  <div class="frontFont">
    <v-tabs v-model="tab" dark icons-and-text fixed-tabs background-color="deep-purple accent-4">
      <v-tab value="daily">
        <v-icon>mdi-calendar</v-icon>
        Daily
      </v-tab>

      <v-tab value="weekly">
        <v-icon>mdi-calendar-week</v-icon>
        Weekly
      </v-tab>

      <v-tab value="monthly">
        <v-icon>mdi-calendar-month</v-icon>
        Monthly
      </v-tab>

      <v-tab value="maximum">
        <v-icon>mdi-chart-areaspline</v-icon>
        Min-Max
      </v-tab>
    </v-tabs>


      <v-card class="mx-auto responsive-card" color="#26c6da" theme="dark">
      <v-card-text>
        <v-window v-model="tab" class="window-content">
          <v-window-item value="daily">
            <v-row>
              <v-col cols="12">
          
              </v-col>
              <v-col cols="12">
                <DailyGraph></DailyGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="weekly">
            <v-row>
              <v-col cols="12">
         
              </v-col>
              <v-col cols="12">
                <WeeklyGraph></WeeklyGraph>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="monthly">
            <v-row>
              <v-col cols="12">           
              </v-col>
              <v-col cols="12">
                <MonthlyGraph></MonthlyGraph>
              </v-col>
            </v-row>
          </v-window-item>


          <v-window-item value="maximum">
            <v-row>
              <v-col cols="12">         
              </v-col>
              <v-col cols="12">
                <MaxMinGraph></MaxMinGraph>
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
import DailyGraph from "../../components/EnergyRecords/DailyGraph.vue";

const tab = ref("maximum");
</script>

<style scoped>
.frontFont {
  top:auto;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 90vh;
  min-width: 90vw;
  max-height: 100vh;
  max-width: 100vw;
  text-align: center;
  background: rgb(0, 119, 255);
}

.responsive-card {
  width: 100vw;
  height: 88vh;
  max-width: 95vw; 
  margin-top: 5px;
  min-height: 50vh;
}

.window-content {
  padding: 5px;
}

.tab-label {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .responsive-card {
    height: auto;
    min-height: 80vh;
  }

  .tab-label {
    font-size: 1rem;
  }
}
</style>
