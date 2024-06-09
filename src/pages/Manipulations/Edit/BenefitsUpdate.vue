<template>
  <div class="justify-space-evenly customa-portfolio">
    <br />
    <h3 class="head">{{ title.toUpperCase() }}</h3>
    <div v-if="payCheck">
      <v-card class="mx-auto justify-space-evenly customa-portfolio" color="#D7CCC8" theme="light" width="100vw"
        height="95vh" prepend-icon="mdi-rhombus-outline" title="Employee Paycheck and Medical Benefits | Updating">
        <v-form ref="form" class="mx-2" v-model="validfx" lazy-validation @submit.prevent="updateEmployeesBenefits">
          <v-alert v-if="!validfx" type="error">
            Period is out of range. Please correct the invalid input data.
          </v-alert>

          <v-row class="mx-auto justify-space-evenly">
            <v-col cols="5">
              <h4>EMPLOYEE RECORDS | ID : {{ payCheck.id }}</h4>
              <br />
              <v-text-field v-model="payCheck.namex" label="01 Customer name" bg-color="teal"
                variant="solo"></v-text-field>
              <v-text-field v-model="payCheck.emailx" label="02 Email" variant="outlined"></v-text-field>

              <v-select v-model="payCheck.periodMonth" label="04 Period Months" variant="outlined"
                :items="months"></v-select>
              <v-select v-model="payCheck.periodYear" label="04 Period Year" variant="outlined"
                :items="years"></v-select>
              <v-select v-model="payCheck.marriage" label="05 Marriage" variant="outlined" :items="marriage"></v-select>

              <v-text-field v-model="payCheck.grosspay" label="06 Gross Pay" prefix="K"
                variant="outlined"></v-text-field>
              <v-text-field v-model="payCheck.cbenefits" label="07 Benefits" prefix="K"
                variant="outlined"></v-text-field>
              <v-text-field v-model="payCheck.paycheck" label="08 Paycheck" prefix="K"
                variant="outlined"></v-text-field>
              <br />
            </v-col>

            <v-col cols="5" v-if="payCheck && payCheck.families">
              <h4>
                FAMILY SCREEN | {{ payCheck.families.length }} |
                {{ payCheck.children }}
              </h4>
              <br />
              <v-row>
                <v-col cols="6">
                  <v-select v-model="payCheck.children" label="01 Children" variant="outlined"
                    :items="childrenx"></v-select>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="payCheck.families.length" label="02 Family Size"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>

              <template v-for="(family, index) in payCheck.families" :key="index">
                <v-row v-if="index < payCheck.children">
                  <v-col cols="6">
                    <v-text-field v-model="family.namex" :label="`0${index + 1} Name of Child`"
                      variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="family.gender" :label="`0${index + 1} Gender of Child`" variant="outlined"
                      :items="genders"></v-select>
                  </v-col>
                </v-row>
              </template>

              <div v-if="payCheck.children">
                Approved Children: | {{ payCheck.families.length }} /
                {{ payCheck.children }} | Balance: | {{ balancex }} /
                {{ payCheck.children }}
                <br />
                <v-row v-if="balancex">
                  <br />
                  New Child
                  <br />
                </v-row>
                <v-row v-if="balancex">
                  <v-col cols="6">
                    <v-text-field v-model="name1" label="Name of Child" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="gender1" label="Gender of Child" variant="outlined" :items="genders"></v-select>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>

          <v-card-actions class="mx-auto justify-space-evenly">
            <v-btn color="#B3E5FC" variant="elevated" width="165" height="40" min-width="140" size="small"
              :disabled="loading" @click="updateEmployeesBenefits">
              Update Employees | {{ payCheck.id }} | {{ payCheck.grosspay }}
            </v-btn>

            <v-btn color="#E0F7FA" variant="elevated" width="165" height="40" min-width="140" size="small"
              :disabled="loading" @click="updateChildrenBenefits">
              Update Children | {{ payCheck.children }} |
              {{ payCheck.cbenefits }}
            </v-btn>
          </v-card-actions>
          <div class="centered-container">
            =======================================pppppppppppppp===pppppppp=====================
            <br />
            {{ computedData }}
            <br />
            {{ payCheck.grosspay }}
            <br />
            ===================================xxxxxxxxxxxxxxxxxxxx================================
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useEmployeeStore } from "../../../stores/DataEmployees";
import { Family, Salary } from "../../../types/InterfaceX";

const storeAPI = useEmployeeStore();
const router = useRouter();
const loading = ref(false);
const validfx = ref(false);
const payCheck = ref<any>({});
const title = "Edit Medical Benefits records for Employee";
//const custom = ref(router.currentRoute.value.params.id);
const customId = ref<number>(parseInt(String(router.currentRoute.value.params.id)));
const childrenx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const genders = ["Male", "Female", "Others"];
const marriage = ["Yes", "No"];
const name1 = ref("NikolasXXX");
const gender1 = ref("Male");
const years = [2023, 2024, 2025];
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

const validateForm = () => {
  const isWorkedNumeric = !isNaN(parseFloat(payCheck.value.periodYear));
  const isWorkedValid =
    isWorkedNumeric &&
    parseFloat(payCheck.value.periodYear) >= 2001 &&
    parseFloat(payCheck.value.periodYear) <= 2025;
  validfx.value = isWorkedValid;
};

watchEffect(() => {
  validateForm();
});

onMounted(async () => {
  storeAPI.fetchSalaries();
  updatesFromAPI();
});

const updatesFromAPI = () => {
  payCheck.value =
    storeAPI.loadedSalaries.find(
      (x: { id: number }) => x.id == customId.value
    ) || {};
};

const balancex = computed(() => {
  return payCheck.value.children - payCheck.value.families.length;
});

const computedData = computed(() => {
  const married = payCheck.value.marriage === "Yes" ? 1 : 0;
  const numberOfChildren = payCheck.value.families?.length;
  const cheque = 2 * 1000;
  const AAs = payCheck.value.families?.filter((x: { namex: string }) =>
    x.namex.startsWith("A")
  );
  const discountedN = (AAs?.length * 500 * 10) / 100;
  const deducts = (1000 + 500 * numberOfChildren + married * 500) / 12;
  const net = cheque - deducts;

  return {
    marriage: married,
    children: numberOfChildren,
    payCheque: cheque,
    discounted: discountedN,
    deducted: deducts,
    cbenefits: deducts,
    grosspay: net,
  };
});

const updateEmployeesBenefits = async () => {
  if (computedData.value) {
    const monthlyBenefit: Salary = {
      id: customId.value,
      namex: payCheck.value.namex,
      periodMonth: payCheck.value.periodMonth,
      periodYear: payCheck.value.periodYear,
      marriage: payCheck.value.marriage,
      families: payCheck.value.families,
      updated: new Date(),
      created: payCheck.value.created,
      emailx: payCheck.value.emailx,
      paycheck: computedData.value.payCheque,
      cbenefits: computedData.value.children,
      children: computedData.value.children,
      discounted: computedData.value.discounted,
      grosspay: computedData.value.grosspay,
    };
    console.log(monthlyBenefit.paycheck);
    console.log(monthlyBenefit.grosspay);
    console.log(monthlyBenefit.id);
    payCheck.value = monthlyBenefit;
    storeAPI.updateOrAddBenefit(monthlyBenefit);
    console.log(monthlyBenefit);
    goBackPage();
  }
};

const updateChildrenBenefits = async () => {
  if (computedData.value) {
    const monthlyBenefit: Salary = {
      id: customId.value,
      namex: payCheck.value.namex,
      periodMonth: payCheck.value.periodMonth,
      periodYear: payCheck.value.periodYear,
      marriage: payCheck.value.marriage,
      families: payCheck.value.families,
      updated: new Date(),
      created: payCheck.value.created,
      emailx: payCheck.value.emailx,
      paycheck: computedData.value.payCheque,
      cbenefits: computedData.value.children,
      children: computedData.value.children,
      discounted: computedData.value.discounted,
      grosspay: computedData.value.grosspay,
    };

    const newFamilyMember: Family = {
      id: 1,
      created: new Date(),
      updated: new Date(),
      namex: name1.value,
      gender: gender1.value,
    };
    monthlyBenefit.families.push(newFamilyMember);
    console.log(monthlyBenefit.paycheck);
    console.log(monthlyBenefit.grosspay);
    console.log(monthlyBenefit.id);
    payCheck.value = monthlyBenefit;
    storeAPI.updateOrAddBenefit(monthlyBenefit);
    console.log(monthlyBenefit);
    console.log(payCheck.value);
    goBackPage();
  }
};

const goBackPage = () => {
  router.push({ name: "Employees" });
};
</script>

<style scoped>
.no-underline-link {
  text-decoration: none;
}

.head {
  color: teal;
  background-color: wheat;
  margin: 25px;
  text-align: center;
  width: 90vw;
  height: 2vh;
}

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
