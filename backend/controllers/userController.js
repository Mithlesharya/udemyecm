import User from "../model/user.js";
import { catchAsyncError } from '../Handlers/catchAsyncError.js';
import errorHandlers from '../Handlers/errorHandlers.js';



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

  res.status(201).json({
    success: true,
    user
  })
})