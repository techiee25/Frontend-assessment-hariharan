import React, { useState } from "react";
import InputControls from "./InputControls";

const Row = ({ row, updateRowValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handlePercentageUpdate = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const newValue = row.value + (row.value * percentage) / 100;
      updateRowValue(row.id, newValue);
      setInputValue("");
    }
  };

  const handleValueUpdate = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      updateRowValue(row.id, value, !!row.children);
      setInputValue("");
    }
  };

  const variance =
    row.originalValue !== 0
      ? ((row.value - row.originalValue) / row.originalValue) * 100
      : 0;

  return (
    <>
      <tr className={row.children ? "parent-row" : ""}>
        <td style={{ paddingLeft: row.children ? "0px" : "20px" }}>
          {row.children ? "📁 " : "→ "} {row.label}
        </td>
        <td>{row.value.toFixed(2)}</td>
        <InputControls
          inputValue={inputValue}
          setInputValue={setInputValue}
          handlePercentageUpdate={handlePercentageUpdate}
          handleValueUpdate={handleValueUpdate}
        />
        <td>{variance.toFixed(2)}%</td>
      </tr>

      {row.children &&
        row.children.map((child) => (
          <Row key={child.id} row={child} updateRowValue={updateRowValue} />
        ))}
    </>
  );
};

export default Row;
