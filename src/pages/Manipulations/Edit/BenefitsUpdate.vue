<template>
  <div class="justify-space-evenly customa-portfolio">
    <br />
    <h3 class="head">{{ title.toUpperCase() }}</h3>

    <div v-if="payCheck">
      <v-card class="mx-auto justify-space-evenly customa-portfolio" 
      color="#D7CCC8" theme="light" width="100vw"
        height="95vh" prepend-icon="mdi-rhombus-outline" title="Employee Paycheck and Medical Benefits | Updating">
        <v-form ref="form" class="mx-2" v-model="validfx" lazy-validation @submit.prevent="updateEmployeesBenefits">
          <v-alert v-if="!validfx" type="error">
            Period is out of range. Please correct the invalid input data.
          </v-alert>


          <v-row class="mx-auto justify-space-evenly">
            <v-col cols="5">
              <h4>EMPLOYEE RECORDS</h4>
              <v-text-field v-model="payCheck.namex" label="01 Customer name" bg-color="teal"
                variant="outlined"></v-text-field>
              <v-text-field v-model="payCheck.emailx" label="02 Email" variant="outlined"></v-text-field>
              <v-select v-model="payCheck.marriage" label="03 Marriage" variant="outlined" :items="marriage"></v-select>
              <v-text-field v-model="payCheck.grosspay" label="04 Gross Pay" prefix="K"
                variant="outlined"></v-text-field>
              <v-text-field type="text" label="05 Period Month" v-model="payCheck.periodMonth"
                variant="outlined"></v-text-field>
              <v-select v-model="payCheck.periodYear" label="06 Period year" variant="outlined"
                :items="years"></v-select>
            </v-col>

            <v-col cols="5" v-if="payCheck && payCheck.families">
              <h4>FAMILY SCREEN | {{ payCheck.families.length}} | {{ payCheck.children }}</h4>
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

 
              <v-row v-if="payCheck.families[0]">
                <v-col cols="6" v-if="payCheck.children > 0">
                  <v-text-field v-model="payCheck.families[0].namex" label="01 Name oF Child One"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" v-if="payCheck.children > 0">
                  <v-select v-model="payCheck.families[0].gender" label="01  Gender of Child" 
                  variant="outlined"
                    :items="genders"></v-select>
                </v-col>
              </v-row>
              
              <v-row v-if="payCheck.families[1]">
                <v-col cols="6" v-if="payCheck.children > 1">
                  <v-text-field v-model="payCheck.families[1].namex" label="01 Name oF Child One"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" v-if="payCheck.children > 1">
                  <v-select v-model="payCheck.families[1].gender" label="01  Gender of Child" 
                  variant="outlined"
                    :items="genders"></v-select>
                </v-col>
              </v-row>
              
              <v-row v-if="payCheck.families[2]">
                <v-col cols="6" v-if="payCheck.children > 2">
                  <v-text-field v-model="payCheck.families[2].namex" label="01 Name oF Child One"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" v-if="payCheck.children > 2">
                  <v-select                              
                  v-model="payCheck.families[2].gender" 
                  label="01  Gender of Child" 
                  variant="outlined"
                    :items="genders"></v-select>
                </v-col>
              </v-row>
             
              <div v-if="payCheck.children">   
             Approved Children : | {{ payCheck.families.length }} / {{ payCheck.children }}
            </div>

            </v-col>
          </v-row>

          <v-card-actions class="mx-auto justify-space-evenly">
            <v-btn color="#B3E5FC" variant="elevated" width="165" height="40" min-width="140" size="small"
              @click="updateEmployeesBenefits" :disabled="!validfx">
              Update Benefits | {{ payCheck.fotoz }}
            </v-btn>

            <v-btn color="#E0F7FA" variant="elevated" width="165" height="40" min-width="140" size="small"
              :disabled="loading" :to="{ name: 'Employees', query: { tab: tabX } }">
              Benefits listed
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useEmployeeStore } from "../../../stores/DataEmployees";
import { Salary } from "../../../types/InterfaceX";

const storeAPI = useEmployeeStore();
const router = useRouter();
const loading = ref(false);
const validfx = ref(false);
const payCheck = ref<any>({});
const title = " Edit Medical Benefits records for Employee";
const customId = ref(router.currentRoute.value.params.id);
const tabX = ref("health");
const years = [2023, 2024, 2025];
const genders = ["Male", "Female", "Others"];
const marriage = ["Yes", "No"];
const childrenx = [1,2,3,4,5,6,7,8,9,10,11,12];

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
      (x: { id: string | undefined }) => x.id == customId.value
    ) || {};
};

const updateEmployeesBenefits = async () => {
  if (payCheck.value.namex) {
    const married = payCheck.value.marriage === "Yes" ? 1 : 0;
    const numberOfChildren = payCheck.value.families.length;
    const filteredAANames = payCheck.value.families.filter(
      (x: { namex: string }) => x.namex.startsWith("A")
    );
    const discountedA = (filteredAANames.length * 500 * 10) / 100;
    const deducts = (1000 + 500 * numberOfChildren + married * 500) / 12;
    const monthlyBenefit: Salary = {
      id: customId.value,
      namex: payCheck.value.namex,
      numberx: payCheck.value.numberx,
      periodMonth: payCheck.value.periodMonth,
      periodYear: payCheck.value.periodYear,
      created: payCheck.value.created,
      paycheck: 2000 * 2,
      updated: new Date(),
      emailx: payCheck.value.emailx,
      costBenefits: deducts,
      children: numberOfChildren,
      discounted: discountedA,
      grosspay: 2000 * 2 - deducts,
      marriage: payCheck.value.marriage,
      families: payCheck.value.families.length,
    };

    console.log(monthlyBenefit);
    storeAPI.updateOrAddBenefits(monthlyBenefit);
    goBackPage();
  }
};

const goBackPage = () => {
  router.push({ name: "Employees"});
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

</style>
