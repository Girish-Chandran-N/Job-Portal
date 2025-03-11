import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
    let token;

    console.log("Headers Received: ", req.headers); // Log headers

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];  // Extract token
            console.log("Extracted Token: ", token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token: ", decoded);

            req.company = await Company.findById(decoded.id).select('-password');
            if (!req.company) {
                return res.json({ success: false, message: "Company Not Found, Authorization Denied" });
            }

            console.log("Authenticated Company: ", req.company);
            return next();
        } catch (error) {
            console.error("JWT Verification Error: ", error.message);
            return res.json({ success: false, message: "Invalid Token, Login Again" });
        }
    }

    console.log("No Token Found");
    return res.json({ success: false, message: "No Token Provided, Authorization Denied" });
};
