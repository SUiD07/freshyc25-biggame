// ./constants/node.ts
export type NodeType = {
  id: string;
  value: string;
  selectedCar: string;
  top: string;
  left: string;
  tower: boolean;
  ship: string[];
  fight: { house: string; count: number }[];
};

export const initialNodes: NodeType[] = [
  {
    id: "Node 1",
    value: "",
    selectedCar: "",
    top: "45%",
    left: "30%",
    tower: false,
    ship: [],
    fight: [],
  },
  {
    id: "Node 2",
    value: "",
    selectedCar: "",
    top: "60%",
    left: "50%",
    tower: false,
    ship: [],
    fight: [],
  },
  {
    id: "Node 3",
    value: "",
    selectedCar: "",
    top: "20%",
    left: "70%",
    tower: false,
    ship: [],
    fight: [],
  },
];
