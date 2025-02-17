import express from 'express'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import User from '../models/users.js'


 import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({ name, email, password, role, verificationToken });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account',
      text: `Click this link to verify your account: ${process.env.CLIENT_URL}/verify/${verificationToken}`
    };
    transporter.sendMail(mailOptions);
    
    res.status(201).json({ message: 'Check your email for verification' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};












export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('authToken', token, { httpOnly: true }).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const logout = (req, res) => {
    res.clearCookie('authToken').json({ message: 'Logout successful' });
  };