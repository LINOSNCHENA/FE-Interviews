
// interfaces.ts

export interface Salary {
  [key: string]: any;
  id: number; 
  namex: string;
  emailx: string;
  periodMonth: string;
  periodYear: number;
  paycheck: number;
  cost: number;
  cbenefits: number;
  balance: number

  created: Date;
  updated: Date;
  marriage?: string;
  kids?: number;
  discounted?: number;
  families: Family[]; 
}


export interface Family {
  [key: string]: any;
  id?: number; // Optional id field
  namex: string;
  gender: string;
  created: Date;
  updated: Date;
}
