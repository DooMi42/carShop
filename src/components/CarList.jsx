/**
 * CarList Component
 * 
 * Main component that handles all car-related operations:
 * - Displays a data grid of all cars
 * - Provides functionality to add, edit, and delete cars
 * - Handles API calls for CRUD operations
 * - Shows notifications for user actions
 */
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
    // State management
    const [cars, setCars] = useState([]); // Stores car data from API
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Controls notification visibility
    const [snackbarMsg, setSnackbarMsg] = useState(""); // Notification message content

    // Dialog control states
    const [openAdd, setOpenAdd] = useState(false); // Controls Add Car dialog
    const [openEdit, setOpenEdit] = useState(false); // Controls Edit Car dialog
    const [carToEdit, setCarToEdit] = useState(null); // Stores car data for editing

    // Load cars when component mounts
    useEffect(() => {
        getCars();
    }, []);

    /**
     * Fetches all cars from the API
     * Updates the cars state with fetched data
     */
    const getCars = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data._embedded.cars);
                setCars(data._embedded.cars);
            })
            .catch(err => console.error("Error fetching cars:", err));
    };

    /**
     * Adds a new car to the database
     * @param {Object} newCar - Car data object
     */
    const addCar = (newCar) => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar)
        })
            .then(response => {
                if (response.ok) {
                    getCars(); // Refresh car list
                    setSnackbarMsg("Car added successfully");
                    setSnackbarOpen(true);
                } else {
                    alert("Error adding car");
                }
            })
            .catch(err => console.error("Error adding car:", err));
    };

    /**
     * Deletes a car from the database
     * @param {string} url - API endpoint for specific car
     */
    const deleteCar = (url) => {
        // Confirmation before deletion
        if (!window.confirm("Are you sure you want to delete this car?")) {
            return;
        }

        fetch(url, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    getCars(); // Refresh car list
                    setSnackbarMsg("Car deleted successfully");
                    setSnackbarOpen(true);
                } else {
                    alert("Error deleting car");
                }
            })
            .catch(err => console.error("Error deleting car:", err));
    };

    /**
     * Updates an existing car in the database
     * @param {string} url - API endpoint for specific car
     * @param {Object} updatedCar - New car data
     */
    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCar)
        })
            .then(response => {
                if (response.ok) {
                    getCars(); // Refresh car list
                    setSnackbarMsg("Car updated successfully");
                    setSnackbarOpen(true);
                } else {
                    alert("Error updating car");
                }
            })
            .catch(err => console.error("Error updating car:", err));
    };

    /**
     * Opens the edit dialog with selected car data
     * @param {Object} carData - Car data to edit
     */
    const editCar = (carData) => {
        setCarToEdit(carData);
        setOpenEdit(true);
    };

    /**
     * Closes the notification snackbar
     */
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Column definitions for AG Grid
    const columns = [
        { headerName: "Brand", field: "brand", sortable: true, filter: true },
        { headerName: "Model", field: "model", sortable: true, filter: true },
        { headerName: "Color", field: "color", sortable: true, filter: true },
        { headerName: "Fuel", field: "fuel", sortable: true, filter: true },
        { headerName: "Year", field: "modelYear", sortable: true, filter: true, width: 100 },
        { headerName: "Price", field: "price", sortable: true, filter: true },
        {
            headerName: "Actions",
            width: 180,
            cellRenderer: (params) => {
                // Custom renderer for action buttons
                return (
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => editCar(params.data)}
                            style={{ marginRight: 5 }}
                            size="small"
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteCar(params.data._links.self.href)}
                            size="small"
                        >
                            Delete
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div style={{ backgroundColor: "#1e1e1e", minHeight: "100vh" }}>
            <div style={{ padding: 20 }}>
                {/* Add car button */}
                <Button
                    variant="contained"
                    onClick={() => setOpenAdd(true)}
                    style={{ marginBottom: 10 }}
                >
                    Add Car
                </Button>

                {/* AG Grid - displays car data */}
                <div
                    className="ag-theme-material"
                    style={{
                        height: "calc(100vh - 150px)",
                        width: "100%",
                        margin: "auto"
                    }}
                >
                    <AgGridReact
                        rowData={cars}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                        suppressCellFocus={true}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 100
                        }}
                    />
                </div>
            </div>

            {/* Add Car dialog */}
            <AddCar
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                addCar={addCar}
            />

            {/* Edit Car dialog */}
            <EditCar
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                car={carToEdit}
                updateCar={updateCar}
            />

            {/* Notification snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMsg}
            />
        </div>
    );
}

export default CarList;