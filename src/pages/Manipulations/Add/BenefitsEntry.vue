<template>
  <v-form ref="form" class="mx-2 body" v-model="validfx" lazy-validation @submit.prevent="createEmployeesBenefits">
    <br />
    <h3 class="head">
      {{ title.toUpperCase() }}
    </h3>

    <v-row>
      <v-col cols="6">
        <v-select v-model="namex" label="01 Names" :items="staffNames" variant="outlined"></v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="emailx" label="02 Email" required variant="outlined"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-select v-model="periodMonth" label="03 Period-Month" :items="months" variant="outlined"></v-select>
      </v-col>
      <v-col cols="6">
        <v-select v-model="periodYear" label="04 Period Year" :items="years" variant="outlined"></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-select v-model="children" label="05 Family Size" :items="familyMembers" variant="outlined"></v-select>
      </v-col>
      <v-col cols="6">
        <v-select v-model="marriage" label="06 Marriage Status" :items="marriad" variant="outlined"></v-select>
      </v-col>
    </v-row>

    <v-card class="green">
      <v-row>
        <v-col cols="6" v-if="children > 0">
          <v-text-field v-model="families[0].namex" label="01 Name of Child one" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" v-if="children > 0">
          <v-select v-model="families[0].gender" label="01  Child's Gender" variant="outlined"
            :items="gender"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" v-if="children > 1">
          <v-text-field v-model="families[1].namex" label="02 Name of Child two" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" v-if="children > 1">
          <v-select v-model="families[1].gender" label="02  Gender of child" variant="outlined"
            :items="gender"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" v-if="children > 2">
          <v-text-field v-model="families[2].namex" label="03 Name of Child Three" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" v-if="children > 2">
          <v-select v-model="families[2].gender" label="03  Gender of Child" variant="outlined"
            :items="gender"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" v-if="children > 3">
          <v-text-field v-model="families[3].namex" label="04 Name of Child four" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" v-if="children > 3">
          <v-select v-model="families[3].gender" label="04  Gender of Child" variant="outlined"
            :items="gender"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" v-if="children > 4">
          <v-text-field v-model="families[4].namex" label="05 Name of Child five" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" v-if="children > 4">
          <v-select v-model="families[4].gender" label="05  Gender of Child" variant="outlined"
            :items="gender"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" v-if="children > 5">
          <v-text-field v-model="families[5].namex" label="06 Name of Child six" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" v-if="children > 5">
          <v-select v-model="families[5].gender" label="06  Gender of Child" variant="outlined"
            :items="gender"></v-select>
        </v-col>
      </v-row>
    </v-card>

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
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useEmployeeStore } from "../../../stores/DataEmployees";

const storeAPI = useEmployeeStore();
const router = useRouter();
const loading = ref(false);
const validfx = ref(false);
const periodMonth = ref("");
const namex = ref("");
const periodYear = ref(0);
const benefits = ref(1984);
const children = ref(0);
const title = " Add Employee Records";
const emailx = ref("salaries");
const marriage = ref("yes");
const families = ref<any[]>([]);
const salaries = ref<any[]>([]);

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

const years = [2024, 2025];
const familyMembers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const marriad = ["Yes", "No"];
const gender = ["Male", "Female", "Other"];
const staffNames = ["Besa", "James", "Malawo", "Inonge", "Kelvin"];

watch(children, (newValue) => {
  while (families.value.length < newValue) {
    families.value.push({
      id: families.value.length,
      namex: "",
      gender: "",
      created: new Date(),
      updated: new Date(),
    });
    console.log(families);
  }
  while (families.value.length > newValue) {
    families.value.pop();
  }
});

onMounted(async () => {
  storeAPI.fetchSalaries();
  salaries.value = storeAPI.loadedSalaries;
});

const computedData = computed(() => {
  const married = marriage.value === "Yes" ? 1 : 0;
  const numberOfChildren = families.value?.length;
  const cheque = 1000 * 2;
  const AAs = families.value?.filter((x: { namex: string }) =>
    x.namex.startsWith("A")
  );
  const discountedN = AAs?.length;
  const fullpay = numberOfChildren - AAs?.length; ///
  const deducts = (1000 + 500 * numberOfChildren + married * 500) / 12;
  const monthlyCost =
    (1000 + fullpay * 500 + (discountedN * 500 * 10) / 100) / 12;
  const balance = cheque - monthlyCost;
  return {
    marriage: married,
    payCheque: cheque,
    deducted: deducts,
    cbenefits: deducts,
    cost: monthlyCost,
    balance: balance,
    kids: numberOfChildren,
    fullpay: fullpay,
    discounted: discountedN,
  };
});

async function createEmployeesBenefits() {
  if (namex.value) {
    const W1: any = {
      namex: namex.value,
      emailx: emailx.value,
      periodMonth: periodMonth.value,
      periodYear: periodYear.value,
      updated: new Date(),
      created: new Date(),
      cost: computedData.value.cost,
      cbenefits: benefits.value,
      kids: computedData.value.kids,
      marriage: marriage.value,
      families: families.value,
      paycheck: computedData.value.payCheque,
      balance: computedData.value.balance,
      discounted: computedData.value.discounted,
    };
    console.log(W1);
    console.log(W1.cbenefits);
    storeAPI.updateOrAddBenefit(W1);
    goBackPage();
  }
}

async function goBackPage() {
  router.push({ name: "Employees" });
}
</script>
