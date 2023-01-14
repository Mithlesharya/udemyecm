// create and send token, save in the cookie

export const sendToken = (user, statusCode, res, message) => {

    // create jwt token

    const token = user.getJwtToken();
    const options = {
        expires: new Date((
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // set expires cookies time 24hrs, 60min, 60sec, 1000ms
        )),
        httpOnly: true
    }
    
    res.status(statusCode).cookie('token', token, options ).json({
        success: true,
        message,
        token,
        user
    })

}

