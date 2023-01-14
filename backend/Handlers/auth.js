import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorHandlers.js";
import Jwt from "jsonwebtoken";
import User from "../model/user.js";


// check if user is authentication or not after showing data 
export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    //    console.log(token)

    if (!token) {
        return next(new ErrorHandler('login first to access this token.', 401))
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next()
})