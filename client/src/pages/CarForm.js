import React, { useState } from "react";
import { Card, Button, Input, Select, Form, message } from "antd";
import { useListings } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import "./CarManagementForms.css"; 

const { Option } = Select;

// Form schema for dynamic rendering
const formSchema = {
  cars: [
    { key: "carId", placeholder: "Car ID" },
    { key: "model", placeholder: "Model" },
    { key: "price", placeholder: "Price" },
    { key: "status", type: "select", options: ["available", "not-available"] },
  ],
  carSales: [
    { key: "customerName", placeholder: "Customer Name" },
    { key: "phoneNumber", placeholder: "Phone Number" },
    { key: "email", placeholder: "Email" },
    { key: "address", placeholder: "Address" },
    { key: "license", placeholder: "Driver's License" },
    { key: "carId", placeholder: "Car ID" },
    { key: "model", placeholder: "Model" },
    { key: "price", placeholder: "Price" },
    { key: "paymentMethod", type: "select", options: ["cash", "credit"] },
    { key: "paymentStatus", type: "select", options: ["paid", "pending"] },
    { key: "salespersonId", placeholder: "Salesperson ID" },
  ],
  trips: [
    { key: "carId", placeholder: "Car ID" },
    { key: "startDate", placeholder: "Start Date", type: "date" },
    { key: "finishDate", placeholder: "Finish Date", type: "date" },
    { key: "price", placeholder: "Price" },
    { key: "mileage", placeholder: "Mileage" },
    { key: "customerName", placeholder: "Customer Name" },
    { key: "license", placeholder: "Driver's License" },
    { key: "paymentStatus", type: "select", options: ["paid", "pending"] },
    { key: "tripStatus", type: "select", options: ["ongoing", "finished"] },
  ],
  accessories: [
    { key: "customerName", placeholder: "Customer Name" },
    { key: "price", placeholder: "Price" },
    { key: "accessoryName", placeholder: "Accessory Name" },
    { key: "salespersonId", placeholder: "Salesperson ID" },
    { key: "paymentStatus", type: "select", options: ["paid", "pending"] },
  ],
};

// Card container for consistent styling
const CardContainer = ({ children }) => {
  return <div className="card-container">{children}</div>;
};

const CarManagementForms = () => {
  const [activeForm, setActiveForm] = useState("cars");
  const { updateListings } = useListings(); // Access the context
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (endpoint, category) => {
    try {
      // Validation for required fields in formData
      for (let key in formData) {
        if (!formData[key]) {
          message.error(`${key} is required`);
          return;
        }
      }
  
      // Send form data to the server dynamically based on category
      const response = await fetch(`http://localhost:5000/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const newItem = await response.json();
        updateListings(category, newItem); // Update shared listings in context
        message.success("Data submitted successfully!");
  
        // Redirect to /listings after successful submission
        setTimeout(() => {
          navigate("/listings"); // Ensure navigate is called after the success message
        }, 1000); // Add a short delay to display success message
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed.");
      }
    } catch (error) {
      // Handle errors
      message.error(error.message || "An error occurred. Please try again.");
    }
  };

  const renderDynamicForm = () => {
      return formSchema[activeForm]?.map((field) => (
        <Form.Item
          key={field.key}
          name={field.key}
          rules={[
            { required: true, message: `${field.placeholder} is required` },
          ]}
          className="form-item"
        >
          {field.type === "select" ? (
            <Select
              placeholder={field.placeholder}
              onChange={(value) =>
                setFormData({ ...formData, [field.key]: value })
              }
              className="select-input"
            >
              {field.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              type={field.type || "text"}
              placeholder={field.placeholder}
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
                className="text-input"
            />
          )}
        </Form.Item>
      ));
  };
    

  return (
    <div className="forms-container p-4">
      {/* Form Selection Buttons */}
      <div className="form-selection-buttons">
        {Object.keys(formSchema).map((form) => (
          <Button
            key={form}
            className={`form-selection-button ${
              activeForm === form ? "form-selection-button-active" : ""
            }`}
            onClick={() => {
              setActiveForm(form);
              setFormData({}); // Reset form data when switching
            }}
          >
            {form.charAt(0).toUpperCase() + form.slice(1)}
          </Button>
        ))}
      </div>

      {/* Active Form */}
      <Card className="form-card">
        <CardContainer>
          <h2 className="form-title">
            {activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}
          </h2>
          <Form
            layout="horizontal"
             className="main-form"
            onFinish={() =>
              handleSubmit(`/${activeForm}`, activeForm)
            }
          >
            {renderDynamicForm()}
            <Form.Item className="form-button-item">
              <Button type="primary" htmlType="submit" className="submit-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </CardContainer>
      </Card>
    </div>
  );
};

export default CarManagementForms;