// src/components/ui/Select.js
import React from "react";

const Select = ({ options, className, ...props }) => {
  return (
    <select className={`border rounded px-4 py-2 ${className}`} {...props}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
