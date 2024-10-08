import React, { useState } from "react";

const formatNumber = (value) => {
  if (!value) return '';
  const number = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(number)) return '';
  return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

function FormattedNumberInput({ name, title, value, onChange }) {
  const [inputValue, setInputValue] = useState(formatNumber(value));

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(formatNumber(newValue));
    
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue.replace(/[^0-9.]/g, ''),
        },
      });
    }
  };

  return (
      <input
        type="text"
        id={name}
        name={name}
        value={inputValue}
        className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
        placeholder={title}
        onChange={handleChange}
        autoComplete="off"
      />
  );
}

export default FormattedNumberInput;
