import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import Company from '../models/Company.js';

// Protect User Middleware
export const protectUser = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.json({ success: false, message: "User Not Found, Authorization Denied" });
            }
            return next();
        } catch (error) {
            return res.json({ success: false, message: "Invalid Token, Login Again" });
        }
    }
    return res.json({ success: false, message: "No Token Provided, Authorization Denied" });
};

// Protect Company Middleware
export const protectCompany = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.company = await Company.findById(decoded.id).select('-password');

            if (!req.company) {
                return res.json({ success: false, message: "Company Not Found, Authorization Denied" });
            }
            return next();
        } catch (error) {
            return res.json({ success: false, message: "Invalid Token, Login Again" });
        }
    }
    return res.json({ success: false, message: "No Token Provided, Authorization Denied" });
};
