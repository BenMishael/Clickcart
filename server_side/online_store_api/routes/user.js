const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const User = require('../model/user');

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    console.log('GET /users - Request received');
    try {
        const users = await User.find();
        res.json({ success: true, message: "Users retrieved successfully.", data: users });
        console.log('GET /users - Response sent');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error('GET /users - Error:', error.message);
    }
}));

// login
router.post('/login', async (req, res) => {
    console.log('POST /users/login - Request received');
    const { name, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid name or password." });
        }
        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid name or password." });
        }

        // Authentication successful
        res.status(200).json({ success: true, message: "Login successful.", data: user });
        console.log('POST /users/login - Response sent');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error('POST /users/login - Error:', error.message);
    }
});

// Get a user by ID
router.get('/:id', asyncHandler(async (req, res) => {
    console.log(`GET /users/${req.params.id} - Request received`);
    try {
        const userID = req.params.id;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: "User retrieved successfully.", data: user });
        console.log(`GET /users/${req.params.id} - Response sent`);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error(`GET /users/${req.params.id} - Error:`, error.message);
    }
}));

// Create a new user
router.post('/register', asyncHandler(async (req, res) => {
    console.log('POST /users/register - Request received');
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ success: false, message: "Name, and password are required." });
    }

    try {
        const user = new User({ name, password });
        const newUser = await user.save();
        res.json({ success: true, message: "User created successfully.", data: null });
        console.log('POST /users/register - Response sent');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error('POST /users/register - Error:', error.message);
    }
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    console.log(`PUT /users/${req.params.id} - Request received`);
    try {
        const userID = req.params.id;
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ success: false, message: "Name, and password are required." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { name, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "User updated successfully.", data: updatedUser });
        console.log(`PUT /users/${req.params.id} - Response sent`);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error(`PUT /users/${req.params.id} - Error:`, error.message);
    }
}));

// Delete a user
router.delete('/:id', asyncHandler(async (req, res) => {
    console.log(`DELETE /users/${req.params.id} - Request received`);
    try {
        const userID = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userID);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: "User deleted successfully." });
        console.log(`DELETE /users/${req.params.id} - Response sent`);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error(`DELETE /users/${req.params.id} - Error:`, error.message);
    }
}));

module.exports = router;
