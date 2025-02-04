import React from "react";
import './DynamicForm.css';

const DynamicForm = ({ schema, onFinish }) => {
  // Handle form submission by converting FormData into an object
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {};
    for (let [key, value] of formData.entries()) {
      values[key] = value;
    }
    onFinish(values);
  };

  // Render each form field based on the schema
  const renderField = (item) => {
    const { key, placeholder, type, options } = item;
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    switch (type) {
      case "select":
        return (
          <div className="form-item" key={key}>
            <label htmlFor={key}>{label}</label>
            <select id={key} name={key} required>
              <option value="">Select {key.toLowerCase()}</option>
              {options &&
                options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>
          </div>
        );
      case "date":
        return (
          <div className="form-item" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              type="date"
              id={key}
              name={key}
              placeholder={`Select ${key.toLowerCase()}`}
              required
            />
          </div>
        );
      default:
        return (
          <div className="form-item" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              type="text"
              id={key}
              name={key}
              placeholder={placeholder || `Enter ${key.toLowerCase()}`}
              required
            />
          </div>
        );
    }
  };

  return (
    <form className="dynamic-form-container" onSubmit={handleSubmit}>
      {schema.map(renderField)}
      <div className="form-item">
        {/* <button type="submit">Submit</button> */}
      </div>
    </form>
  );
};

export default DynamicForm;
