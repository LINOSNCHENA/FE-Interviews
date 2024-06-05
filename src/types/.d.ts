declare module "html2pdf.js";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}
