import React, { useEffect, useState } from "react";
import { Card, Button, Input, Table, Space, Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const ListingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState({ cars: [], carSales: [], trips: [], accessories: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [cars, carSales, trips, accessories] = await Promise.all([
          fetch("/cars").then((res) => res.json()),
          fetch("/car-sales").then((res) => res.json()),
          fetch("/trips").then((res) => res.json()),
          fetch("/accessories").then((res) => res.json()),
        ]);
        setListings({ cars, carSales, trips, accessories });
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
  
    fetchListings();
  }, []); // This ensures listings are fetched on component mount.
  

  const handleDelete = async (category, id) => {
    try {
      await fetch(`/${category}/${id}`, { method: "DELETE" });
      setListings((prev) => ({
        ...prev,
        [category]: prev[category].filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columns = Object.keys(listings[activeCategory]?.[0] || {}).map((key) => ({
    title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
    dataIndex: key,
    key,
    render: (text) => (typeof text === "string" ? text : JSON.stringify(text)),
  }));

  columns.push({
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />} onClick={() => console.log("Edit", record.id)} />
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(activeCategory, record.id)}
        />
      </Space>
    ),
  });

  const filteredListings = listings[activeCategory]?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Button
            type={activeCategory === "cars" ? "primary" : "default"}
            onClick={() => setActiveCategory("cars")}
          >
            Cars
          </Button>
          <Button
            type={activeCategory === "carSales" ? "primary" : "default"}
            onClick={() => setActiveCategory("carSales")}
          >
            Car Sales
          </Button>
          <Button
            type={activeCategory === "trips" ? "primary" : "default"}
            onClick={() => setActiveCategory("trips")}
          >
            Trips
          </Button>
          <Button
            type={activeCategory === "accessories" ? "primary" : "default"}
            onClick={() => setActiveCategory("accessories")}
          >
            Accessories
          </Button>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/add-car")}
        className="mb-4"
        >
          Add New
        </Button>
      </div>
      <Input
        placeholder="Search by name or other fields"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <Table
        dataSource={filteredListings}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ListingsPage;
