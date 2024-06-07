<template>
  <div class="frontFont">
    <v-tabs v-model="tab" background-color="deep-purple accent-4" dark icons-and-text>
      <v-spacer />
      <v-tab value="health">
        Employees <v-icon>mdi-account-group</v-icon>
      </v-tab>
      <v-spacer />
      <v-tab value="family">
        <v-icon>mdi-family-tree</v-icon> Family record
      </v-tab>
      <v-spacer />
      <v-tab value="benefits">
        Healthcare Benefits <v-icon>mdi-stethoscope</v-icon>
      </v-tab>
      <v-spacer />
    </v-tabs>

    <v-card class="mx-auto" color="#26c6da" theme="dark" width="95%" height="100%" min-height="100vh">
      <v-card-text>
        <!-- ==============================================|3-Evaluations|=================================== -->
        <v-window v-model="tab">
          <v-window-item value="health">
            Employees data | {{ counted }}
            <employees-tabel></employees-tabel>
          </v-window-item>

          <v-window-item value="family">
            Family members | {{ counted }}
            <families-table></families-table>
          </v-window-item>

          <v-window-item value="benefits">
            Medical Benefits | {{ counted }}
            <medical-benefits></medical-benefits>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import EmployeesTabel from "@/components/Employees/EmployeesTable.vue";
import FamiliesTable from "@/components/Employees/FamiliesTable.vue";
import MedicalBenefits from "@/components/Employees/MedicalsBenefits.vue";
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "@/stores/DataEmployees";

const store = useEmployeeStore();
const tab = ref("health");
const salaries = ref<any[]>([]);
const permit = ref(false);
const emailx = ref("marvin");
const counted = ref(0);

onMounted(async () => {
  store.fetchSalaries();
  updatesFromAPI();
});

const updatesFromAPI = () => {
  salaries.value = store.loadedSalaries;
  emailx.value = String("zambia");
  isAuthorizedAdmin(emailx.value);
  counted.value = salaries.value.length;
};

async function isAuthorizedAdmin(user: string | undefined) {
  const enforcer = String(user);
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
