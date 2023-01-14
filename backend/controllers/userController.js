import User from "../model/user.js";
import { catchAsyncError } from '../Handlers/catchAsyncError.js';
import ErrorHandler from "../Handlers/errorHandlers.js";
import { sendToken } from "../utils/jwtToken.js";




// Register a user  => api/register

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/themscool-avtar_v6x8ag',
      url: 'https://res.cloudinary.com/mithlesharya/image/upload/v1673600403/avatars/themscool-avtar_v6x8ag.png'
    }
  })

  sendToken(user, 200, res)

})

//login user =>api/login

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is entered by user 
  if (!email || !password) {
    return next(new ErrorHandler('please enter email and password', 400))
  }
  // finding user in database
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorHandler('Invalid Email and password', 401))
  }

  // checking password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email and password', 401))
  }

  sendToken(user, 200, res)

})


// logout user => api/logout

export const logoutUser = catchAsyncError(async (req, res, next) => {

  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: 'logged out successfully'
  })
})