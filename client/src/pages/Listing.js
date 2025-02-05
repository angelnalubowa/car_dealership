import React, { useEffect, useState } from "react";
import { Button, Input, Table, Space, Spin, Modal, Form, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useListings } from "./ListingContext";
import "./ListingsPage.css";
import DynamicForm from "./DynamicForm";

const formSchema = {
  cars: [
    { key: "carId", placeholder: "Car ID" },
    { key: "make", placeholder: "Make" },
    { key: "model", placeholder: "Model" },
    { key: "year", placeholder: "Year", type: "number" }, // Added year field
    { key: "price", placeholder: "Price" },
    { key: "status", type: "select", options: ["Available", "Sold", "Reserved"] },
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
    { key: "paymentMethod", type: "select", options: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"] },
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
    { key: "accessoryName", placeholder: "Accessory Name" },
    { key: "price", placeholder: "Price" },
    { key: "salespersonId", placeholder: "Salesperson ID" },
    { key: "paymentMethod", type: "select", options: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"] },
    { key: "paymentStatus", type: "select", options: ["paid", "pending"] },
  ],
};

const ListingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { listings, setListings } = useListings();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const [cars, carSales, trips, accessories] = await Promise.all([
          fetch("http://localhost:5000/cars").then((res) => res.json()),
          fetch("http://localhost:5000/carSales").then((res) => res.json()),
          fetch("http://localhost:5000/trips").then((res) => res.json()),
          fetch("http://localhost:5000/accessories").then((res) => res.json()),
        ]);
        setListings({ cars, carSales, trips, accessories });
      } catch (error) {
        console.error("Error fetching listings:", error);
        message.error("Failed to fetch listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [setListings]);

  const handleDelete = async (category, id) => {
    try {
      const response = await fetch(`http://localhost:5000/${category}/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setListings((prev) => ({
          ...prev,
          [category]: prev[category].filter((item) => item._id !== id),
        }));
        message.success("Item deleted successfully!");
      } else {
        console.error("Failed to delete item:", await response.text());
        message.error("Failed to delete item. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Error deleting item. Please try again.");
    }
  };

  const columns = () => {
    const schemaKeys = formSchema[activeCategory].map((item) => item.key);

    return schemaKeys.map((key) => ({
      title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      dataIndex: key,
      key: key,
      render: (text) => (typeof text === "string" ? text : JSON.stringify(text)),
    })).concat({ //Concat appends actions at the end
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => console.log("Edit", record.id)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(activeCategory, record._id)}
          />
        </Space>
      ),
    });
  };

  const filteredListings = Array.isArray(listings[activeCategory])
    ? listings[activeCategory].filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : []; // Fallback to an empty array

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = async (values) => {
    try {
      const response = await fetch(`http://localhost:5000/${activeCategory}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newItem = await response.json();
        setListings((prev) => ({
          ...prev,
          [activeCategory]: [...(prev[activeCategory] || []), newItem],
        }));
        setIsModalVisible(false); // Close the modal
        message.success("Item added successfully!"); // Success message
      } else {
        console.error("Failed to add item:", await response.text());
        message.error("Failed to add item. Please try again."); // Error message
      }
    } catch (error) {
      console.error("Error adding item:", error);
      message.error("Error adding item. Please try again."); // Error message
    }
  };

  return (
    <div className="listings-page-container">
      <div className="listings-header">
        <div className="category-buttons">
          {["cars", "carSales", "trips", "accessories"].map((category) => (
            <Button
              key={category}
              className={`category-button ${activeCategory === category ? "category-button-active" : ""
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.replace(/([A-Z])/g, " $1").toUpperCase()}
            </Button>
          ))}
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="add-new-button"
          onClick={showModal}
        >
          Add New
        </Button>
      </div>
      <Input
        placeholder="Search by any field"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {loading ? (
        <div className="loader-container">
          <Spin size="large" />
        </div>
      ) : filteredListings.length > 0 ? (
        <Table
          dataSource={filteredListings}
          columns={columns()} //Call it as function
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="listings-table"
        />
      ) : (
        <div className="no-listings">
          <h2 className="no-listings-title">
            No listings available in this category.
          </h2>
          <p className="no-listings-message">
            Try adding new items or switching categories.
          </p>
        </div>
      )}
      <Modal
        title={`Add New ${activeCategory.replace(/([A-Z])/g, " $1").toUpperCase()}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add
          </Button>,
        ]}
      >
        <DynamicForm schema={formSchema[activeCategory]} form={form} onFinish={handleAdd} />
      </Modal>
    </div>
  );
};

export default ListingsPage;