/**
 * EditCar Component
 * 
 * Provides a dialog form for editing existing cars.
 * Pre-populates form data with selected car properties,
 * and handles updating the car via API when submitted.
 */
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@mui/material";

function EditCar({ open, onClose, car, updateCar }) {
    // State to track edited car data
    const [updatedCar, setUpdatedCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: "",
        price: ""
    });

    // CSS to remove number input spinners for a cleaner UI
    const numberInputStyle = {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        },
        "& input[type=number]": {
            "-moz-appearance": "textfield" // Firefox
        }
    };

    // Initialize form with car data when opened or when car changes
    useEffect(() => {
        if (car) {
            console.log("Car data for editing:", car);

            setUpdatedCar({
                brand: car.brand || "",
                model: car.model || "",
                color: car.color || "",
                fuel: car.fuel || "",
                modelYear: car.modelYear || "",
                price: car.price || ""
            });
        }
    }, [car]);

    /**
     * Updates form state when input values change
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value });
    };

    /**
     * Submits updated car data to the API
     * Calls the updateCar function passed from parent component
     */
    const handleSave = () => {
        if (car && car._links && car._links.self) {
            updateCar(car._links.self.href, updatedCar);
        }
        onClose();
    };

    // Return null if no car is selected to avoid errors
    if (!car) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
                <TextField
                    label="Brand"
                    name="brand"
                    value={updatedCar.brand}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Model"
                    name="model"
                    value={updatedCar.model}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Color"
                    name="color"
                    value={updatedCar.color}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Fuel"
                    name="fuel"
                    value={updatedCar.fuel}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Year"
                    name="modelYear"
                    value={updatedCar.modelYear}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    type="number"
                    sx={numberInputStyle}
                />
                <TextField
                    label="Price"
                    name="price"
                    value={updatedCar.price}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    type="number"
                    sx={numberInputStyle}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditCar;