import User from "../models/user.model.js";
import bcrypt from "bcrypt"; 
import jwt from 'jsonwebtoken';
import transporter from "../config/nodeMailerComponent.js";

export const userRegister = async (req, res) => {
    const { name, email, password } = req.body; 
    console.log(req.body); 

    try {
        let user = await User.findOne({ email }); 
        if (user) {
            return res.status(400).json({
                message: "User already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        user = await User.create({ name, email, password: hashedPassword });
        
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email } 
        });

    } catch (err) {
        console.error(err); 
        res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: "Password not matched." });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '5d' });

        return res.json({
            message: "User logged in successfully",
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const sendMailToResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

      
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '5m' });
        const link = `http://localhost:3000/resetPassword/${user._id}/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Your Password - Java Gaming Studio LLP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                    <h1 style="color: #333;">Hello!</h1>
                    <p style="color: #555;">We received a request to reset your password for your account.</p>
                    <p style="color: #555;">Please click the button below to reset your password:</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <img src="URL_TO_YOUR_ANIMATED_GIF" alt="Animated Character" style="max-width: 100%; height: auto;" />
                    </div>
                    
                    <p style="color: #555; margin-top: 20px;">If you didn’t request a password reset, please ignore this email.</p>
                    <footer style="margin-top: 30px; text-align: center; color: #777;">
                        <p>&copy; ${new Date().getFullYear()} Java Gaming Studio LLP</p>
                    </footer>
                </div>
            `,
        };
        
        
       
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ 
            message: "Password reset link sent to your email." ,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};


export const resetPassword = async (req, res) => {
    const { password, confirm_password } = req.body;
    const { id, token } = req.query;

    console.log('Query Parameters:', req.query); // Log the entire query object

    try {
        if (!token) {
            return res.status(400).json({ message: "Token must be provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.id !== id) {
            return res.status(400).json({ message: "Invalid token." });
        }

        // Additional logic...
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

