<template>
  <v-form ref="form" class="mx-2 body" v-model="validfx" lazy-validation @submit.prevent="createEmployeesBenefits">
    <br />
    <h3 class="head">
      {{ title.toUpperCase() }}
    </h3>

    <v-row>
      <v-col cols="6">
        <v-text-field v-model="namex" label="01 Name" required variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="emailx" label="02 Email" required variant="outlined"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field v-model="numberx" label="03 Identity Number" required variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="paycheck" label="04 Paycheck amount" required variant="outlined"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-select v-model="periodMonth" label="05 Period-Month" :items="months" variant="outlined"></v-select>
      </v-col>
      <v-col cols="6">
        <v-select v-model="periodYear" label="06 Period Year" :items="years" variant="outlined"></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field v-model="children" label="07 Total Children" required variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select v-model="marriage" label="08 Marriage Status" :items="marriad" variant="outlined"></v-select>
      </v-col>
    </v-row>

    <v-card-actions class="mx-auto justify-space-evenly">
      <v-btn @click="createEmployeesBenefits" color="green" width="164" variant="elevated" height="42" min-width="164"
        size="small">
        Save salary
      </v-btn>

      <v-btn :disabled="loading" color="yellow" width="164" variant="elevated" height="42" min-width="164" size="small"
        @click="goBackPage">
        Employees
      </v-btn>
    </v-card-actions>

    <br />
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useEmployeeStore } from "@/stores/DataEmployees";

const storeAPI = useEmployeeStore();
const router = useRouter();

const loading = ref(false);
const validfx = ref(false);
const periodMonth = ref("");
const namex = ref("");
const periodYear = ref(0);
const employeeTotal = ref(0);
const tabToOpen = ref("salaries");
const title = " Add Salary new records";
const benefits = ref(0);
const children = ref(0);
const emailx = ref("salaries");
const numberx = ref(0);
const marriage = ref("yes");
const achildren = ref(0);

const months = [
  "01-January",
  "02-February",
  "03-March",
  "04-April",
  "05-May",
  "06-June",
  "07-July",
  "08-August",
  "09-September",
  "10-October",
  "11-November",
  "12-December",
];
const years = [2023, 2024, 2025];
const marriad = ["yes", "no"];

onMounted(async () => {
  await storeAPI.fetchSalaries();
  getCustomers();
});

async function getCustomers() {
  try {
    loading.value = true;
    let data = storeAPI.loadedSalaries;
    if (data) {
      employeeTotal.value = 1 + data.length;
    }
  } catch (error) {
    console.error("Error in record entry :", error);
  } finally {
    loading.value = false;
  }
}

async function createEmployeesBenefits() {
  if (namex.value) {
    const W1: any = {
      namex: namex.value,
      numberx: numberx.value,
      emailx: emailx.value,
      periodMonth: periodMonth.value,
      periodYear: periodYear.value,
      updated: new Date(),
      created: new Date(),
      paycheck: 2000,
      benefits: benefits.value,
      children: children.value,
      marriage: marriage.value,
      achildren: achildren.value,
    };
    console.log(W1);
    storeAPI.updateOrAddBenefits(W1);
    goBackPage();
  }
}

async function goBackPage() {
  tabToOpen.value = String(namex.value).split(" ")[0].toLowerCase();
  router.push({ name: "Employees", query: { tab: tabToOpen.value } });
}
</script>

<style scoped>
.body {
  cursor: pointer;
  padding: 2px;
  margin: 0;
  top: 22%;
  background-color: burlywood;
  left: 1%;
  width: 98%;
  height: 60px;
}

.head {
  color: teal;
  background-color: wheat;
  margin: 25px;
  text-align: center;
  width: calc(100% - 50px);
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  font-size: 24px;
  font-style: italic;
}
</style>
