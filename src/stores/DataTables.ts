// Data-Tables

import { defineStore } from "pinia";
import { VDataTable } from "vuetify/labs/VDataTable";
import "jspdf-autotable";

interface AnalyticsState {
  loading: boolean;
  headSalaries: InstanceType<typeof VDataTable>["headers"];
  headFamilies: InstanceType<typeof VDataTable>["headers"];
  error: string | null;
  search: string | undefined;
}

export const useTableStore = defineStore("tableStore", {
  state: (): AnalyticsState => ({
    loading: false,
    error: null as string | null,
    search: "",

    headSalaries: [
      {
        title: "No.",
        align: "start",
        sortable: true,
        key: "id",
      },
      { title: "Employee", key: "namex" },
      { title: "Email", key: "emailx" },
      { title: "Benefits", key: "costBenefits" },
      { title: "Paycheck", key: "paycheck" },
      { title: "Discount", key: "discounted" },
      { title: "Gross", key: "grosspay" },

      { title: "Year", key: "periodYear" },
      { title: "Month", key: "periodMonth" },
      { title: "Marriage", key: "marriage" },
      { title: "Children", key: "children" },


      { title: "Edit", key: "edit" },//
      { title: "Update", key: "updated" },
      { title: "Dated11", key: "created" },
    ],

    headFamilies: [
      {
        title: "No.",
        align: "start",
        sortable: true,
        key: "id",
      },
      { title: "Name", key: "namex" },
      { title: "Gender", key: "gender" },
      { title: "Edit", key: "edit" },//
      { title: "Updated", key: "updated" },
      { title: "Creatiom", key: "created" },
    ],

    // =====================================================================================7==================
  }),
});