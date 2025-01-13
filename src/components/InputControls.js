import React from "react";

const InputControls = ({
  inputValue,
  setInputValue,
  handlePercentageUpdate,
  handleValueUpdate,
}) => {
  return (
    <>
      <td>
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handlePercentageUpdate}>%</button>
      </td>
      <td>
        <button onClick={handleValueUpdate}>Val</button>
      </td>
    </>
  );
};

export default InputControls;
