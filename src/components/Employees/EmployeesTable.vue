<template>
  <div v-if="salaries">
    <v-data-table :headers="headerWages" :items="salaries" :items-per-page="20" :search="search" color="lime-lighten-1"
      class="elevation-1">
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
           <td>{{ item.namex }}</td>
          <td>{{ item.emailx }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.costBenefits }}</td>
          <td>{{ item.paycheck }}</td>
          <td>{{ item.grosspay }}</td>
          <td>{{ item.periodYear }}</td>
          <td>{{ item.periodMonth }}</td>
          <td>{{ item.marriage }}</td>
          <td>{{ item.children }}</td>
          <td>{{ item.discounted }}</td>
          <td>
            <router-link :to="{ name: 'Edit-benefits', params: { id: item.id } }">
              <v-icon small>mdi-monitor-edit</v-icon>
            </router-link>
            | Edit
          </td>
          <td>{{ formatDate(item.updated) }}</td>
          <td>{{ formatDate(item.created) }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EmployeeServices from "../../services/EmployeeServices";
import { Salary } from "../../types/InterfaceX";
import { useTableStore } from "../../stores/DataTables";
const storeTable = useTableStore();
const headerWages = storeTable.headSalaries;
const search = ref("");
const salaries = ref<Salary[] | undefined>(undefined);
const counted = ref(0);
const error = ref<string | null>(null);

// Fetch data when component is mounted
onMounted(async () => {
  try {
    const result = await EmployeeServices.getBenefitsRecords();
    if (result) {
      salaries.value = result;
      counted.value = result.length;
      console.log(salaries.value);
    } else {
      error.value = "No salaries were found.";
    }
  } catch (e) {
    error.value = "An error occurred while fetching the salaries.";
    console.log(e);
  }
});

const formatDate = (value: any) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-ZM", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
/* Add your styles here */
</style>
