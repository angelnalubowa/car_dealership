import React, { useEffect, useState } from "react";
import { Button, Input, Table, Space, Spin, Modal, Form } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useListings } from "./ListingContext";
import "./ListingsPage.css";
import DynamicForm from "./DynamicForm"; // Import the new component

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

const ListingsPage = () => {
    const [activeCategory, setActiveCategory] = useState("cars");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { listings, setListings } = useListings();
    const navigate = useNavigate();

    useEffect(() => {
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
                    setListings({ cars, carSales, trips, accessories });
                } catch (error) {
                    console.error("Error fetching listings:", error);
                } finally {
                    setLoading(false)
                }
            };
            fetchListings();
        }
    }, [setListings]);


    const handleDelete = async (category, id) => {
        try {
            await fetch(`http://localhost:5000/${category}/${id}`, { method: "DELETE" });
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


    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields(); // Clear form fields when modal opens

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
                    [activeCategory]: [...prev[activeCategory], newItem],
                }));
                setIsModalVisible(false); // Close the modal after successful submission
            } else {
                console.error("Failed to add item:", await response.text());
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };


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
                    onClick={showModal}
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


            {/* Modal for adding new items */}
            <Modal
                title={`Add New ${activeCategory.replace(/([A-Z])/g, " $1").toUpperCase()}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <div style={{textAlign:'left',marginInline:'15px'}} >
                    {/* <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>, */}
                    <Button key="submit" type="primary" onClick={() => form.submit()}style={{width:'100px'}}>
                        Add
                    </Button>,
                    </div>
                    
                ]}
            >
                <DynamicForm
                    schema={formSchema[activeCategory]}
                    form={form}
                    onFinish={handleAdd}
                />
            </Modal>
        </div>
    );
};

export default ListingsPage;