interface CornType {
  id: number;
  name: string;
  greenhouseid: number;
}

export interface GreenDataType {
  id: number;
  userid: number;
  crops: CornType[];
  area: number;
  collection: string;
  state: number;
  name: string;
  maxsoiltem: number;
  minsoiltem: number;
  maxsoilhum: number;
  minsoilhum: number;
  maxsoilph: number;
  minsoilph: number;
  minairtem: number;
  maxairtem: number;
  maxairhum: number;
  minairhum: number;
  minairsun: number;
  maxairsun: number;
  maxairco2: number;
  minairco2: number;
}

export interface GreenhouseName {
  id: number;
  name: string;
}

export interface TaskDataType {
  conditional: string;
  conditionaldata: number;
  conditionalobject: string;
  date: number[];
  delay: number;
  deviceid: number;
  devicestate: number;
  greenhouseid: GreenhouseName[];
  isonce: number;
  state: number;
  userid: number;
}
