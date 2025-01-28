import React, { useState } from "react";
import { Card, Button, Input, Select } from "antd";

const CardContainer = ({ children }) => {
  return <div className="p-4 bg-gray-100 rounded-lg shadow">{children}</div>;
};

const CarManagementForms = () => {
  const [activeForm, setActiveForm] = useState("cars");

  const renderForm = () => {
    switch (activeForm) {
      case "cars":
        return (
          <Card>
            <CardContainer>
              <h2 className="text-xl font-bold mb-4">Cars Available</h2>
              <form>
                <Input placeholder="Car ID" className="mb-2" />
                <Input placeholder="Model" className="mb-2" />
                <Input placeholder="Price" className="mb-2" />
                <Select className="mb-2">
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
              <form>
                <Input placeholder="Customer Name" className="mb-2" />
                <Input placeholder="Phone Number" className="mb-2" />
                <Input placeholder="Email" className="mb-2" />
                <Input placeholder="Address" className="mb-2" />
                <Input placeholder="Driver's License" className="mb-2" />
                <Input placeholder="Car ID" className="mb-2" />
                <Input placeholder="Model" className="mb-2" />
                <Input placeholder="Price" className="mb-2" />
                <Select className="mb-2">
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="credit">Credit</Select.Option>
                </Select>
                <Select className="mb-2">
                  <Select.Option value="paid">Paid</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                </Select>
                <Input placeholder="Salesperson ID" className="mb-2" />
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
              <form>
                <Input placeholder="Car ID" className="mb-2" />
                <Input placeholder="Start Date" type="date" className="mb-2" />
                <Input placeholder="Finish Date" type="date" className="mb-2" />
                <Input placeholder="Price" className="mb-2" />
                <Input placeholder="Mileage" className="mb-2" />
                <Input placeholder="Customer Name" className="mb-2" />
                <Input placeholder="Driver's License" className="mb-2" />
                <Select className="mb-2">
                  <Select.Option value="paid">Paid</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                </Select>
                <Select className="mb-2">
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
              <form>
                <Input placeholder="Customer Name" className="mb-2" />
                <Input placeholder="Price" className="mb-2" />
                <Input placeholder="Accessory Name" className="mb-2" />
                <Input placeholder="Salesperson ID" className="mb-2" />
                <Select className="mb-2">
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
