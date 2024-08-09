<template>
  <div class="frontFont">
    <v-tabs v-model="tab" background-color="deep-purple accent-4" dark icons-and-text>
      <v-spacer />
      <v-tab value="health">
        Employees <v-icon>mdi-account-group</v-icon>
      </v-tab>
      <v-spacer />
      <v-tab value="family">
       Families <v-icon>mdi-family-tree</v-icon> </v-tab>
      <v-spacer />

      <v-tab value="dated">
        Dated  <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />

      <v-tab value="benefits">
        Benefited <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />


      <v-tab value="graphs">
        Graphs <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />

      <v-tab value="energy">
        Energy <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />


    </v-tabs>

    <v-card class="mx-auto" color="#26c6da" theme="dark" width="95%" height="100%" min-height="100vh">
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="health">
            Employees data | {{ counted1 }}
            <employees-tabel></employees-tabel>
          </v-window-item>
          <v-window-item value="family">
            Family members | {{ counted2 }}
            <families-table></families-table>
          </v-window-item>

          <v-window-item value="dated">
            Family members | {{ counted2 }} 
            <DatedData></DatedData>
          </v-window-item>

          <v-window-item value="benefits">
            Discount Benefitiaries | {{ counted3 }}
            <discounted-children></discounted-children>
          </v-window-item>

          <v-window-item value="graphs">            
            Energy Graph | {{ counted3 }}   
            <EnergyGraph></EnergyGraph>            
          </v-window-item>

          <v-window-item value="energy">            
            Energy Table | {{ counted3 }}   
            <EnergyTable></EnergyTable>
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import DatedData from "../../components/Employees/ExtractDates.vue";
import EmployeesTabel from "../../components/Employees/EmployeesTable.vue";
import FamiliesTable from "../../components/Employees/FamiliesTable.vue";
import DiscountedChildren from "../../components/Employees/DiscountedChildren.vue";
import { useEmployeeStore } from "../../stores/DataEmployees";
import EnergyTable from "../../components/Employees/EnergyTable.vue";

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
