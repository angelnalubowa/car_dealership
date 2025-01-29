import React, { useEffect, useState } from "react";
import { Card, Button, Input, Table, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useListings } from "./ListingContext";

const ListingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const { listings, setListings } = useListings(); // Use global listings state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch listings only if they are empty
    if (!listings.cars.length && !listings.carSales.length && !listings.trips.length && !listings.accessories.length) {
      const fetchListings = async () => {
        try {
          const [cars, carSales, trips, accessories] = await Promise.all([
            fetch("http://localhost:5000/cars").then((res) => res.json()),
            fetch("http://localhost:5000/car-sales").then((res) => res.json()),
            fetch("http://localhost:5000/trips").then((res) => res.json()),
            fetch("http://localhost:5000/accessories").then((res) => res.json()),
          ]);
          // Update state with fetched data
          setListings({ cars, carSales, trips, accessories });
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      };
  
      fetchListings();
    }
  }, [setListings]); // Only include setListings in the dependency array
  

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

  // Dynamically generate columns based on data keys
  const columns = Object.keys(listings[activeCategory]?.[0] || {}).map((key) => ({
    title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
    dataIndex: key,
    key,
    render: (text) => (typeof text === "string" ? text : JSON.stringify(text)),
  }));

  // Add actions column for Edit/Delete
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

  // Filter listings based on search query
  const filteredListings = listings[activeCategory]?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Category buttons */}
        <div className="flex space-x-4">
          {["cars", "carSales", "trips", "accessories"].map((category) => (
            <Button
              key={category}
              type={activeCategory === category ? "primary" : "default"}
              onClick={() => setActiveCategory(category)}
            >
              {category.replace(/([A-Z])/g, " $1").toUpperCase()}
            </Button>
          ))}
        </div>
        {/* Add New Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/add-car")}
        >
          Add New
        </Button>
      </div>
      {/* Search Input */}
      <Input
        placeholder="Search by any field"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      {/* Listings Table */}
      {filteredListings?.length > 0 ? (
        <Table
          dataSource={filteredListings}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      ) : (
        <div className="text-center py-4">
          <h2>No listings available in this category.</h2>
          <p>Try adding new items or switching categories.</p>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
