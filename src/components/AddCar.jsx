// src/components/AddCar.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@mui/material";

function AddCar({ open, onClose, addCar }) {
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        year: "",
        price: ""
    });

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        addCar(car);
        // Tyhjennetään kentät ja suljetaan
        setCar({
            brand: "",
            model: "",
            color: "",
            fuel: "",
            year: "",
            price: ""
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Car</DialogTitle>
            <DialogContent>
                <TextField
                    label="Brand"
                    name="brand"
                    value={car.brand}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Model"
                    name="model"
                    value={car.model}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Color"
                    name="color"
                    value={car.color}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Fuel"
                    name="fuel"
                    value={car.fuel}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Year"
                    name="year"
                    value={car.year}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Price"
                    name="price"
                    value={car.price}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCar;
