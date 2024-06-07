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
        sortable: true,
        key: "index",
        width: "2px", align: "start",
      },
      { title: "Employee", key: "namex", width: "100px", align: "left", },
      { title: "Email", key: "emailx", width: "100px", align: "left", },
      { title: "Benefits", key: "costBenefits", width: "50px", align: "left", },
      { title: "Paycheck", key: "paycheck", width: "50px", align: "left", },
      { title: "Discount", key: "discounted", width: "50px", align: "left", },
      { title: "Gross", key: "grosspay", width: "50px", align: "left", },
      { title: "Index", key: "id", width: "5px", align: "left", },

      { title: "Year", key: "periodYear", width: "50px", align: "left", },
      { title: "Month", key: "periodMonth", width: "50px", align: "left", },
      { title: "Marriage", key: "marriage", width: "10px", align: "left", },
      { title: "Children", key: "children", width: "10px", align: "left", },
      
      { title: "Edit", key: "edit", width: "50px", align: "left", },//
      { title: "Updated", key: "updated", width: "150px", align: "left", },
      { title: "Created", key: "created", width: "150px", align: "left", },
    ],

    headFamilies: [
      {title: "No.", align: "start", sortable: true, key: "index", width: "2px"},
      {title: "Name", key: "namex", width: "150px", align: "left"},    
      { title: "Index", key: "id", width: "50px", align: "left", },
      {title: "Gender", key: "gender", width: "100px", align: "left"},
      {title: "Edit", key: "edit", width: "100px", align: "left"},
      {title: "Updated", key: "updated", width: "150px", align: "left"},
      { title: "Creation", key: "created", width: "150px", align: "left"},
    ],


    // =====================================================================================7==================
  }),
});