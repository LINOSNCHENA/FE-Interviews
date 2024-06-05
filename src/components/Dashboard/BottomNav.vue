<template>
  <div>
    {{ userEmails }} | {{ eUsers }}
    <v-bottom-navigation v-model="objNav" :bg-color="'green'">
      <v-spacer />

      <v-btn :to="{ name: 'Employees' }">
        <v-icon aria-hidden="true">mdi-account-supervisor</v-icon>
        <span>1Employees </span>
      </v-btn>

      <v-spacer />
      <v-btn
        value="employees"
        :to="{ name: 'Employees' }"
        v-cloak
        v-if="userEmails"
      >
        <v-icon aria-hidden="true">mdi-finance</v-icon>
        <span> 2Famiies | {{ loansNumber }}</span>
      </v-btn>

      <v-spacer />
      <v-btn
        value="add"
        :to="{ name: 'Add-benefits' }"
        v-cloak
        v-if="userEmails"
      >
        <v-icon aria-hidden="true">mdi-finance</v-icon>
        <span> 3AddData | {{ loansNumber }}</span>
      </v-btn>

      <v-spacer />

      <v-btn to="{ name: 'Login' }">
        <v-icon aria-hidden="true">mdi-logout</v-icon>
        <span>{{
          userEmails.toLowerCase()
        }}</span>
      </v-btn>

      <v-spacer />
    </v-bottom-navigation>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from "@/stores/DataEmployees";
import { ref, computed, onBeforeMount } from "vue";
const storePDF = useEmployeeStore();
const objNav = ref("main");
const email = ref("Marvin");
const salaries = ref<any[]>([]);

onBeforeMount(async () => {
  storePDF.fetchSalaries(), 
  loaded();
});

const userEmails = computed(() => email.value || "");
const eUsers= userEmails.value?.substring(0, userEmails.value?.length - 10).toLowerCase()
const loansNumber = computed(() => salaries.value?.length || "");

const loaded = () => {
  let x = storePDF.loadedSalaries;
  console.log(x);
  console.log(userEmails.value);
  return [userEmails.value];
};
</script>

<style scoped>
.div {
  background-color: mediumaquamarine;
  margin-left: 20%;
  font-family: arial;
  font-size: 20px;
  display: flex;
  justify-content: center;
  color: red;
}

.v-btn {
  letter-spacing: normal;
}

[v-cloak] {
  display: none;
}
</style>
