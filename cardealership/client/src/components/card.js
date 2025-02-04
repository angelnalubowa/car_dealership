// src/components/ui/Card.js
import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`border rounded-lg shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
