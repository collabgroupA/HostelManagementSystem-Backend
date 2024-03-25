const express = require("express");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

router.post('/student/signup', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email){
        return res.status(StatusCodes.BAD_REQUEST).json({message:"username, email and password are required."})
    }
    const student = { username, password, email, verified: false };
    global.students.push(student);
    res.status(201).json({ message: 'Student signed up successfully. Wait for admin verification.' });
});

// Admin Signup
router.post('/admin/signup', (req, res) => {
    const { username, password, email } = req.body;
    const admin = { username, password, email };
    admins.push(admin);
    res.status(201).json({ message: 'Admin signed up successfully.' });
});

// Admin Login
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
        res.status(200).json({ message: 'Admin logged in successfully.' });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials.' });
    }
});

// Student Login
router.post('/student/login', (req, res) => {
    const { username, password } = req.body;
    const student = students.find(s => s.username === username && s.password === password);
    if (student) {
        res.status(200).json({ message: 'Student logged in successfully.', verified: student.verified });
    } else {
        res.status(401).json({ message: 'Invalid student credentials.' });
    }
});

// Admin Verify Student
router.put('/admin/verify/:username', (req, res) => {
    const { username } = req.params;
    const student = students.find(s => s.username === username);
    if (student) {
        student.verified = true;
        res.status(200).json({ message: 'Student verified successfully.' });
    } else {
        res.status(404).json({ message: 'Student not found.' });
    }
});


module.exports = router;