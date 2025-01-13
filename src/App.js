import React from "react";
import Table from "./components/Table";
import "./styles.css";

const initialData = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    originalValue: 1500,
    children: [
      {
        id: "phones",
        label: "Phones",
        value: 800,
        originalValue: 800,
      },
      {
        id: "laptops",
        label: "Laptops",
        value: 700,
        originalValue: 700,
      },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    originalValue: 1000,
    children: [
      {
        id: "tables",
        label: "Tables",
        value: 300,
        originalValue: 300,
      },
      {
        id: "chairs",
        label: "Chairs",
        value: 700,
        originalValue: 700,
      },
    ],
  },
];

const App = () => {
  return (
    <div className="App">
      <h1>Hierarchical Table</h1>
      <Table rows={initialData} />
    </div>
  );
};

export default App;
