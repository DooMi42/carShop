/**
 * AddCar Component
 * 
 * Provides a dialog form for adding new cars to the system.
 * Handles form state and submits data to the parent component.
 */
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
    // Form state for new car data
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        year: "",
        price: ""
    });

    /**
     * Updates form state when input values change
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    /**
     * Submits form data and resets form
     * Calls the addCar function passed from parent component
     */
    const handleSave = () => {
        addCar(car);
        // Reset form fields and close dialog
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