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
  balance: number;
  created: Date;
  updated: Date;
  marriage?: string;
  kids?: number;
  discounted?: number;
  families: Family[];
}

export interface Family {
  [key: string]: any;
  id?: number;
  namex: string;
  gender: string;
  created: Date;
  updated: Date;
}

export interface Commodity {
  [key: string]: any;
  id?: number; 
  open: string;
  hight: string;
  low: string;
  close: string;
  volume: string;
}
export interface CloseData {
  date: string;
  close: number;
}
