// Styles

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import enUS from "date-fns/locale/en-US";
import svSE from "date-fns/locale/sv";
import * as directives from "vuetify/directives";
import DateFnsAdapter from "@date-io/date-fns";

// Composables
import { createVuetify } from "vuetify";
import * as labs from 'vuetify/labs/components'

export default createVuetify({
  components: {
    ...labs,
  },
  directives,
  date: {
    adapter: DateFnsAdapter,
    locale: {
      en: enUS,
      sv: svSE,
    },
  },
  defaults: {
    VDataTable: {
      fixedHeader: true,
      noDataText: "Results not found",
    },
    VBtn: {
      rounded: true,
      height: "32", 
      width: "120", 
      textSize: "12px",
      color: "primary",
      variant: "outlined",
      disabled: false,
      icon: "mdi-check", 
      fontWeight: "bold", 
      hoverColor: "accent", 
      clickHandler: () => { },   
    },

    VTextField: {
      outlined: true,
      dense: true,
      clearable: true,
      maxLength: 10,
      counter: true,
      solo: true,
      soloInverted: true,
    },

    VSelect: {
      outlined: true,
      dense: true,
      clearable: true,
      variant: "outlined",
    },
    date: {
      adapter: DateFnsAdapter,
      locale: {
        en: enUS,
        sv: svSE,
      },
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});

