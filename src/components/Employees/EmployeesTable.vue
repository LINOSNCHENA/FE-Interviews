<template>
  <div v-if="salaries">
    <v-data-table :headers="headerWages" :items="salaries" :items-per-page="20" :search="search" 
    color="lime-lighten-1"
      class="elevation-1" :sort-by="[
        { key: 'cost', order: 'asc' },
        { key: 'balance', order: 'desc' },
      ]">
      <template v-slot:item="{ item, index }">
        <tr>
          <td class="text-start">{{ index + 1 }}</td>
          <td>{{ item.namex }}</td>
          <td>{{ item.emailx }}</td>
          <td>{{ formatCurrency(item.paycheck) }}</td>
          <td>{{ item.kids }}</td>
          <td>{{ item.discounted }}</td>
          <td>{{ formatCurrency(item.cbenefits) }}</td>
          <td>{{ formatCurrency(item.balance) }}</td>
          <td>{{ formatCurrency(item.cost) }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.periodYear }}</td>
          <td>{{ item.periodMonth }}</td>
          <td>{{ item.marriage }}</td>

          <td class="text-left">
            <router-link :to="{ name: 'Edit-benefits', params: { id: item.id } }">
              <v-icon small>mdi-monitor-edit</v-icon>
            </router-link>
            | Edit
          </td>
          <td class="text-left">{{ formatDate(item.updated) }}</td>
          <td class="text-left">{{ formatDate(item.created) }}</td>
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

onMounted(async () => {
  try {
    const result = await EmployeeServices.getBenefitsRecords();
    if (result) {
      salaries.value = result;
      counted.value = result.length;
    } else {
      error.value = "No salaries were found.";
    }
  } catch (e) {
    error.value = "An error occurred while fetching the salaries.";
    console.log(e);
  }
});


// Method to format currency
const formatCurrency = (value: number) =>
  value.toLocaleString("en-CZ", {
    style: "currency",
    currency: "CZM",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


  const formatDate = (value: any) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-CZ", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: 'h23'
  });
};

</script>

<style scoped>

.text-start {
  text-align: start;
}

.text-left {
  text-align: left;
}

</style>
