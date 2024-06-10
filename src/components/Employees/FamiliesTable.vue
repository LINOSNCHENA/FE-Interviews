<template>
  <div v-if="families">
    <v-data-table :headers="headerFamilies" :items="families" :items-per-page="20" 
    :search="search"  color="lime-lighten-1" class="elevation-1">
      <template v-slot:item="{ item, index }">
        <tr>
          <td class="text-start">{{ index + 1 }}</td>
          <td class="text-left">{{ item.namex }}</td>
          <td class="text-left">{{ item.id }}</td>
          <td class="text-left">{{ item.gender }}</td>
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
import FamiliesServices from "../../services/FamiliesServices";
import { Family } from "../../types/InterfaceX";
import { useTableStore } from "../../stores/DataTables";
const storeTable = useTableStore();
const headerFamilies = storeTable.headFamilies;
const search = ref("");
const families = ref<Family[] | undefined>(undefined);
const counted = ref(0);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const result = await FamiliesServices.getFamilyRecords();
    if (result) {
      families.value = result;
      counted.value = result.length;
    } else {
      error.value = "No salaries were found.";
    }
  } catch (e) {
    error.value = "An error occurred while fetching the salaries.";
    console.error(e);
  }
});

// const formatDate = (value: any) => {
//   const date = new Date(value);
//   return date.toLocaleDateString("en-CZ", {
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

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
