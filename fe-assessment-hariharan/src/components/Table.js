import React, { useState, useEffect } from "react";
import Row from "./Row";

const calculateTotals = (rows) => {
  return rows.map((row) => {
    if (row.children) {
      const children = calculateTotals(row.children);
      const totalValue = children.reduce((sum, child) => sum + child.value, 0);
      return { ...row, value: totalValue, children };
    }
    return row;
  });
};

const Table = ({ rows }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(calculateTotals(rows));
  }, [rows]);

  const updateRowValue = (id, newValue, recalculateChildren = false) => {
    const updateValue = (rows) => {
      return rows.map((row) => {
        if (row.id === id) {
          if (recalculateChildren && row.children) {
            const totalValue = row.children.reduce(
              (sum, child) => sum + child.value,
              0
            );
            const multiplier = newValue / totalValue;
            const updatedChildren = row.children.map((child) => ({
              ...child,
              value: child.value * multiplier,
            }));
            return {
              ...row,
              value: newValue,
              children: updatedChildren,
            };
          }
          return { ...row, value: newValue };
        }
        if (row.children) {
          return { ...row, children: updateValue(row.children) };
        }
        return row;
      });
    };

    setData((prev) => calculateTotals(updateValue(prev)));
  };

  const grandTotal = data.reduce((sum, row) => sum + row.value, 0);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <Row
              key={row.id}
              row={row}
              updateRowValue={updateRowValue}
              originalValue={row.value}
            />
          ))}
          <tr>
            <td>
              <strong>Grand Total</strong>
            </td>
            <td>{grandTotal}</td>
            <td colSpan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
