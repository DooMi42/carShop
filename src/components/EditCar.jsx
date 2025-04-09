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
    const [updatedCar, setUpdatedCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: "",
        price: ""
    });

    // CSS to remove number input spinners
    const numberInputStyle = {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        },
        "& input[type=number]": {
            "-moz-appearance": "textfield" // Firefox
        }
    };

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

    const handleChange = (e) => {
        setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (car && car._links && car._links.self) {
            updateCar(car._links.self.href, updatedCar);
        }
        onClose();
    };

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