import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorHandlers.js";
import Jwt from "jsonwebtoken";
import User from "../model/user.js";


// check if user is authentication or not after showing data 
export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies
        //    console.log(token)
    if (!token) {
        return next(new ErrorHandler('Please login first to access this token.', 401))
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Authorize User Roles and Permissions 
export const authoriseRoles = (...roles) =>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}
