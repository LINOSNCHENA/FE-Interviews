
// interfaces.ts


export interface Salary {
  [key: string]: any;
  id: any;
  namex: string;
  emailx: string;
  periodMonth: string;
  periodYear: number;
  costBenefits: number;    
  paycheck: number; 
  grosspay: number; 
  created: Date; 
  updated: Date;
  marriage?: string;
  children?: number;
  discounted?: number;
  families: Family[]; // Array of Family objects
}


export interface Family {
  [key: string]: any;
  id: any;
  namex: string;
  gender: string;
  created: Date;
  updated: Date;
}
