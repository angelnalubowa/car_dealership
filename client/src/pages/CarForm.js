import React, { useState } from "react";
import { Card, Button, Input, Select, message } from "antd";
import { useListings } from "./ListingContext";

const CardContainer = ({ children }) => {
  return <div className="p-4 bg-gray-100 rounded-lg shadow">{children}</div>;
};

const CarManagementForms = () => {
  const [activeForm, setActiveForm] = useState("cars");
  const { updateListings } = useListings(); // Access the context
  const [formData, setFormData] = useState({}); // Manage form data locally

  const handleSubmit = async (endpoint, category) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newItem = await response.json();
        updateListings(category, newItem); // Update shared listings
        message.success("Data submitted successfully!");
        setFormData({}); // Clear form data
      } else {
        throw new Error("Submission failed.");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case "cars":
        return (
          <Card>
            <CardContainer>
              <h2 className="text-xl font-bold mb-4">Cars Available</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("/cars", "cars");
                }}
              >
                <Input
                  placeholder="Car ID"
                  className="mb-2"
                  value={formData.carId || ""}
                  onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                />
                <Input
                  placeholder="Model"
                  className="mb-2"
                  value={formData.model || ""}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
                <Input
                  placeholder="Price"
                  className="mb-2"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <Select
                  placeholder="Status"
                  className="mb-2"
                  value={formData.status || ""}
                  onChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <Select.Option value="available">Available</Select.Option>
                  <Select.Option value="not-available">Not Available</Select.Option>
                </Select>
                <Button type="submit">Submit</Button>
              </form>
            </CardContainer>
          </Card>
        );
      case "carSales":
        return (
          <Card>
            <CardContainer>
              <h2 className="text-xl font-bold mb-4">Car Sales</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("/car-sales", "carSales");
                }}
              >
                <Input
                  placeholder="Customer Name"
                  className="mb-2"
                  value={formData.customerName || ""}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
                <Input
                  placeholder="Phone Number"
                  className="mb-2"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  className="mb-2"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  placeholder="Address"
                  className="mb-2"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <Input
                  placeholder="Driver's License"
                  className="mb-2"
                  value={formData.license || ""}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                />
                <Input
                  placeholder="Car ID"
                  className="mb-2"
                  value={formData.carId || ""}
                  onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                />
                <Input
                  placeholder="Model"
                  className="mb-2"
                  value={formData.model || ""}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
                <Input
                  placeholder="Price"
                  className="mb-2"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <Select
                  placeholder="Payment Method"
                  className="mb-2"
                  value={formData.paymentMethod || ""}
                  onChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="credit">Credit</Select.Option>
                </Select>
                <Select
                  placeholder="Payment Status"
                  className="mb-2"
                  value={formData.paymentStatus || ""}
                  onChange={(value) => setFormData({ ...formData, paymentStatus: value })}
                >
                  <Select.Option value="paid">Paid</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                </Select>
                <Input
                  placeholder="Salesperson ID"
                  className="mb-2"
                  value={formData.salespersonId || ""}
                  onChange={(e) => setFormData({ ...formData, salespersonId: e.target.value })}
                />
                <Button type="submit">Submit</Button>
              </form>
            </CardContainer>
          </Card>
        );
      case "trips":
        return (
          <Card>
            <CardContainer>
              <h2 className="text-xl font-bold mb-4">Trips</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("/trips", "trips");
                }}
              >
                <Input
                  placeholder="Car ID"
                  className="mb-2"
                  value={formData.carId || ""}
                  onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                />
                <Input
                  placeholder="Start Date"
                  type="date"
                  className="mb-2"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
                <Input
                  placeholder="Finish Date"
                  type="date"
                  className="mb-2"
                  value={formData.finishDate || ""}
                  onChange={(e) => setFormData({ ...formData, finishDate: e.target.value })}
                />
                <Input
                  placeholder="Price"
                  className="mb-2"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <Input
                  placeholder="Mileage"
                  className="mb-2"
                  value={formData.mileage || ""}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                />
                <Input
                  placeholder="Customer Name"
                  className="mb-2"
                  value={formData.customerName || ""}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
                <Input
                  placeholder="Driver's License"
                  className="mb-2"
                  value={formData.license || ""}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                />
                <Select
                  placeholder="Payment Status"
                  className="mb-2"
                  value={formData.paymentStatus || ""}
                  onChange={(value) => setFormData({ ...formData, paymentStatus: value })}
                >
                  <Select.Option value="paid">Paid</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                </Select>
                <Select
                  placeholder="Trip Status"
                  className="mb-2"
                  value={formData.tripStatus || ""}
                  onChange={(value) => setFormData({ ...formData, tripStatus: value })}
                >
                  <Select.Option value="ongoing">Ongoing</Select.Option>
                  <Select.Option value="finished">Finished</Select.Option>
                </Select>
                <Button type="submit">Submit</Button>
              </form>
            </CardContainer>
          </Card>
        );
      case "accessories":
        return (
          <Card>
            <CardContainer>
              <h2 className="text-xl font-bold mb-4">Accessory Sales</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("/accessories", "accessories");
                }}
              >
                <Input
                  placeholder="Customer Name"
                  className="mb-2"
                  value={formData.customerName || ""}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
                <Input
                  placeholder="Price"
                  className="mb-2"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <Input
                  placeholder="Accessory Name"
                  className="mb-2"
                  value={formData.accessoryName || ""}
                  onChange={(e) => setFormData({ ...formData, accessoryName: e.target.value })}
                />
                <Input
                  placeholder="Salesperson ID"
                  className="mb-2"
                  value={formData.salespersonId || ""}
                  onChange={(e) => setFormData({ ...formData, salespersonId: e.target.value })}
                />
                <Select
                  placeholder="Payment Status"
                  className="mb-2"
                  value={formData.paymentStatus || ""}
                  onChange={(value) => setFormData({ ...formData, paymentStatus: value })}
                >
                  <Select.Option value="paid">Paid</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                </Select>
                <Button type="submit">Submit</Button>
              </form>
            </CardContainer>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => setActiveForm("cars")}>Cars Available</Button>
        <Button onClick={() => setActiveForm("carSales")}>Car Sales</Button>
        <Button onClick={() => setActiveForm("trips")}>Trips</Button>
        <Button onClick={() => setActiveForm("accessories")}>Accessory Sales</Button>
      </div>
      {renderForm()}
    </div>
  );
};

export default CarManagementForms;
