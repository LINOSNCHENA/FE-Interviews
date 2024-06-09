// Data-Tables

import { defineStore } from "pinia";

interface TableHeader {
  title: string;
  key: string;
  width: string;
  align: string;
  sortable?: boolean;
}

interface tableDataState {
  loading: boolean;
  headSalaries: TableHeader[];
  headFamilies: TableHeader[];
  error: string | null;
  search: string | undefined;
}

export const useTableStore = defineStore("tableStore", {
  state: (): tableDataState => ({
    loading: false,
    error: null as string | null,
    search: "",
    headSalaries: [
      {
        title: "No.",
        sortable: true,
        key: "index",
        width: "2px", align: "start"
      },
      { title: "Employee", key: "namex", width: "100px", align: "left" },
      { title: "Email", key: "emailx", width: "100px", align: "left" },
      { title: "Paycheck", key: "paycheck", width: "50px", align: "left" },
      { title: "kids", key: "kids", width: "10px", align: "left" },
      { title: "Discounted", key: "discounted", width: "50px", align: "left" },
      { title: "Benefits", key: "cbenefits", width: "50px", align: "left" },
      { title: "Balance", key: "balance", width: "50px", align: "left" },
      { title: "Month Cost", key: "costs", width: "75px", align: "left" },
      { title: "Index", key: "id", width: "50px", align: "left" },
      { title: "Year", key: "periodYear", width: "50px", align: "left" },
      { title: "Month", key: "periodMonth", width: "50px", align: "left" },
      { title: "Marriage", key: "marriage", width: "10px", align: "left" },
      { title: "Edit", key: "edit", width: "50px", align: "left" }, //
      { title: "Updated", key: "updated", width: "150px", align: "left" },
      { title: "Created", key: "created", width: "150px", align: "left" },
    ],

    headFamilies: [
      {
        title: "No.", sortable: true, key: "index", width: "2px", align: "start"
      },
      { title: "Name", key: "namex", width: "150px", align: "left" },
      { title: "Index", key: "id", width: "50px", align: "left" },
      { title: "Gender", key: "gender", width: "100px", align: "left" },
      { title: "Edit", key: "edit", width: "100px", align: "left" },
      { title: "Updated", key: "updated", width: "150px", align: "left" },
      { title: "Creation", key: "created", width: "150px", align: "left" },
    ],

    // =====================================================================================7==================
  }),
});
