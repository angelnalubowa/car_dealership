// src/components/ui/Button.js
import React from "react";

const Button = ({ children, className, onClick, variant = "primary" }) => {
  const baseStyle = "px-4 py-2 rounded focus:outline-none";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
