// src/components/CarList.jsx
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
    const [cars, setCars] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

    // Dialog-ohjaimet
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [carToEdit, setCarToEdit] = useState(null);

    useEffect(() => {
        getCars();
    }, []);

    // Haetaan kaikki autot
    const getCars = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data._embedded.cars);
                setCars(data._embedded.cars);
            })
            .catch(err => console.error(err));
    };

    // Lisätään uusi auto (POST)
    const addCar = (newCar) => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setSnackbarMsg("Car added");
                    setSnackbarOpen(true);
                } else {
                    alert("Error adding car");
                }
            })
            .catch(err => console.error(err));
    };

    // Poistetaan auto (DELETE)
    const deleteCar = (url) => {
        if (!window.confirm("Are you sure you want to delete this car?")) {
            return;
        }
        fetch(url, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setSnackbarMsg("Car deleted");
                    setSnackbarOpen(true);
                } else {
                    alert("Error deleting car");
                }
            })
            .catch(err => console.error(err));
    };

    // Muokataan autoa (PUT)
    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCar)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setSnackbarMsg("Car updated");
                    setSnackbarOpen(true);
                } else {
                    alert("Error updating car");
                }
            })
            .catch(err => console.error(err));
    };

    // Avaa EditCar-dialogi valitun auton datalla
    const editCar = (carData) => {
        setCarToEdit(carData);
        setOpenEdit(true);
    };

    // Suljetaan snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Edit button renderer
    const EditButtonRenderer = (params) => {
        return (
            <Button
                variant="contained"
                onClick={() => editCar(params.data)}
                style={{ marginRight: 5 }}
            >
                Edit
            </Button>
        );
    };

    // Delete button renderer
    const DeleteButtonRenderer = (params) => {
        return (
            <Button
                variant="contained"
                color="error"
                onClick={() => deleteCar(params.data._links.self.href)}
            >
                Delete
            </Button>
        );
    };

    // Sarakemääritykset - jokaisessa rivissä on Edit ja Delete
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
                <Button
                    variant="contained"
                    onClick={() => setOpenAdd(true)}
                    style={{ marginBottom: 10 }}
                >
                    Add Car
                </Button>

                {/* Ag-Grid - vie lähes koko sivun */}
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

            {/* Dialog-ikkunat */}
            <AddCar
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                addCar={addCar}
            />
            <EditCar
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                car={carToEdit}
                updateCar={updateCar}
            />

            {/* Snackbar-notifikaatio */}
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