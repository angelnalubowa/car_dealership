// src/components/ui/Input.js
import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border rounded px-4 py-2 focus:outline-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
