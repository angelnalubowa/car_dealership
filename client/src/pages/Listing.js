import React, { useEffect, useState } from "react";
import { Button, Input, Table, Space, Spin, Modal, Form, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useListings } from "./ListingContext";
import "./ListingsPage.css";
import DynamicForm from "./DynamicForm";
import moment from 'moment';
import jsPDF from "jspdf";
import "jspdf-autotable";

const formSchema = {
  cars: [
    { key: "carId", placeholder: "Car ID" },
    { key: "make", placeholder: "Make" },
    { key: "model", placeholder: "Model" },
    { key: "year", placeholder: "Year", type: "number" },
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
const formatPrice = (price) => {
  if (typeof price === "number") {
    return price.toLocaleString();
  } else if (typeof price === "string") {
    const numericPrice = parseFloat(price.replace(/,/g, ""));
    return numericPrice.toLocaleString();
  }
  return price;
};
const generatePDF = (listings, activeCategory) => {
  if (!listings || !listings[activeCategory]?.length) {
    message.warning("No data available to export.");
    return;
  }

  const doc = new jsPDF();
  doc.text(`${activeCategory.toUpperCase()} Listings`, 14, 10);

  const schema = formSchema[activeCategory];
  const tableHeaders = schema.map((field) => field.placeholder || field.key);
  const tableData = listings[activeCategory].map((item) =>
    schema.map((field) => item[field.key] || "-")
  );

  doc.autoTable({
    head: [tableHeaders],
    body: tableData,
    startY: 20,
  });

  doc.save(`${activeCategory}-listings.pdf`);
};

const ListingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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
      render: (text) => {
        if (key === "price") {
          return formatPrice(text);
        }

        if (key === "startDate" || key === "finishDate") {
          if (text) {
            const date = new Date(text);
            return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getFullYear()}`;
          }
          return "-";
        }
        return typeof text === "string" ? text : JSON.stringify(text);
      },
    })).concat({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingItem(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
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
    : [];

  const showModal = () => {
    setEditingItem(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = async (values) => {
    if (values.price) {
      values.price = parseFloat(values.price.replace(/,/g, ''));
    }

    if (values.startDate) {
      values.startDate = moment(values.startDate).isValid()
        ? moment(values.startDate).format("DD-MM-YYYY")
        : null;
    }
    if (values.finishDate) {
      values.finishDate = moment(values.finishDate).isValid()
        ? moment(values.finishDate).format("DD-MM-YYYY")
        : null;
    }
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
        setIsModalVisible(false);
        message.success("Item added successfully!");
      } else {
        console.error("Failed to add item:", await response.text());
        message.error("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      message.error("Error adding item. Please try again.");
    }
  };

  const handleEdit = async (values) => {
    if (values.startDate) {
      values.startDate = moment(values.startDate).isValid()
        ? moment(values.startDate).format("DD-MM-YYYY")
        : null;
    }
    if (values.finishDate) {
      values.finishDate = moment(values.finishDate).isValid()
        ? moment(values.finishDate).format("DD-MM-YYYY")
        : null;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/${activeCategory}/${editingItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setListings((prev) => ({
          ...prev,
          [activeCategory]: prev[activeCategory].map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          ),
        }));
        setIsModalVisible(false);
        message.success("Item updated successfully!");
      } else {
        console.error("Failed to update item:", await response.text());
        message.error("Failed to update item. Please try again.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      message.error("Error updating item. Please try again.");
    }
  };

  return (
    <div className="listings-page-container">
      <div className="listings-header">
        <div className="category-buttons">
          {["cars", "carSales", "trips", "accessories"].map((category) => (
            <Button
              key={category}
              className={`category-button ${activeCategory === category ? "category-button-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.replace(/([A-Z])/g, " $1").toUpperCase()}
            </Button>
          ))}
        </div>
        <Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="add-new-button"
          onClick={showModal}
        >
          Add New
        </Button>
        <Button
        type="default"
        icon={<ShareAltOutlined />}
        className="share-button"
        onClick={() => generatePDF(listings, activeCategory)}      >
        Share
      </Button>
      </Space>
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
          columns={columns()}
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
        title={editingItem ? `Edit ${activeCategory.replace(/([A-Z])/g, " $1").toUpperCase()}` : `Add New ${activeCategory.replace(/([A-Z])/g, " $1").toUpperCase()}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {editingItem ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <DynamicForm schema={formSchema[activeCategory]} form={form} onFinish={editingItem ? handleEdit : handleAdd} />
      </Modal>
    </div>
  );
};

export default ListingsPage;
