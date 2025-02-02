import React, { useEffect, useState } from "react";
import { Button, Input, Table, Space, Spin } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useListings } from "./ListingContext";
import "./ListingsPage.css"; // Import the CSS file

const ListingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const { listings, setListings } = useListings();
  const navigate = useNavigate();

  useEffect(() => {
      // Fetch listings only if they are empty
    if (!listings.cars.length && !listings.carSales.length && !listings.trips.length && !listings.accessories.length) {
          const fetchListings = async () => {
               setLoading(true)
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
             }finally {
                 setLoading(false)
             }
          };
          fetchListings();
    }
  }, [setListings]);


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
        <div className="listings-page-container">
            <div className="listings-header">
                {/* Category buttons */}
                <div className="category-buttons">
                    {["cars", "carSales", "trips", "accessories"].map((category) => (
                        <Button
                            key={category}
                            className={`category-button ${
                                activeCategory === category ? "category-button-active" : ""
                            }`}
                            onClick={() => {
                                setLoading(true)
                                setActiveCategory(category)
                                setTimeout(() => {setLoading(false)}, 1500)

                            }}
                        >
                            {category.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </Button>
                    ))}
                </div>
                {/* Add New Button */}
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="add-new-button"
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
                className="search-input"
            />
            {/* Listings Table or Loader */}
            {loading ? (
                <div className="loader-container">
                    <Spin size="large" />
                </div>
            ) : filteredListings?.length > 0 ? (
                <Table
                    dataSource={filteredListings}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    className="listings-table"
                />
            ) : (
                <div className="no-listings">
                    <h2 className="no-listings-title">No listings available in this category.</h2>
                    <p className="no-listings-message">Try adding new items or switching categories.</p>
                </div>
            )}
        </div>
    );
};

export default ListingsPage;